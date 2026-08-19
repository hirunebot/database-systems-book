import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const docsRoot = path.join(projectRoot, 'src/content/docs');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(absolutePath)));
    } else if (/\.mdx?$/.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

function routeFor(relativePath) {
  const withoutExtension = relativePath.replace(/\.mdx?$/, '');
  if (withoutExtension === 'index') return '/';
  if (withoutExtension === '404') return '/404';
  return `/${withoutExtension}/`;
}

const files = await walk(docsRoot);
const documents = await Promise.all(
  files.map(async (file) => {
    const relativePath = path.relative(docsRoot, file);
    return {
      file,
      relativePath,
      route: routeFor(relativePath),
      content: await readFile(file, 'utf8'),
    };
  }),
);

const errors = [];
const routes = new Set(documents.map((document) => document.route));
const chapters = new Map();

for (const document of documents) {
  const titleMatch = document.content.match(/^title:\s+['"]?(\d{2})\./m);
  if (titleMatch) {
    const number = Number(titleMatch[1]);
    if (chapters.has(number)) {
      errors.push(
        `chapter ${titleMatch[1]} is duplicated: ${chapters.get(number)} and ${document.relativePath}`,
      );
    }
    chapters.set(number, document.relativePath);

    const requiredHeadings = [
      '## この章で答える問い',
      '## まとめ',
      number === 18 ? '## 最終演習' : '## 確認問題',
      '## 参考資料',
    ];

    for (const heading of requiredHeadings) {
      if (!document.content.includes(heading)) {
        errors.push(`${document.relativePath}: missing heading "${heading}"`);
      }
    }

    const lineCount = document.content.split('\n').length;
    if (lineCount < 180) {
      errors.push(`${document.relativePath}: too short (${lineCount} lines, expected at least 180)`);
    }
  }

  if (/\b(?:TODO|FIXME|TBD)\b|準備中|未執筆/i.test(document.content)) {
    errors.push(`${document.relativePath}: contains an unfinished-work marker`);
  }

  const internalLinks = [
    ...document.content.matchAll(/\]\((\/[^)\s#]*)(?:#[^)]*)?\)/g),
    ...document.content.matchAll(/\bhref=["'](\/[^"'#]*)(?:#[^"']*)?["']/g),
  ];
  for (const match of internalLinks) {
    const target = match[1] || '/';
    const normalized = target === '/' || target === '/404' ? target : `${target.replace(/\/$/, '')}/`;
    if (!routes.has(normalized)) {
      errors.push(`${document.relativePath}: broken internal link ${target}`);
    }
  }
}

for (let number = 1; number <= 18; number += 1) {
  if (!chapters.has(number)) {
    errors.push(`chapter ${String(number).padStart(2, '0')} is missing`);
  }
}

if (chapters.size !== 18) {
  errors.push(`expected 18 numbered chapters, found ${chapters.size}`);
}

const plan = await readFile(path.join(projectRoot, 'index.md'), 'utf8');
for (const match of plan.matchAll(/\]\(\.\/([^)]+\.md)\)/g)) {
  const target = path.join(projectRoot, match[1]);
  try {
    await readFile(target, 'utf8');
  } catch {
    errors.push(`index.md: missing planning document ${match[1]}`);
  }
}

if (errors.length > 0) {
  console.error('Content validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Content validation passed: ${chapters.size} chapters, ${documents.length} pages, ${routes.size} routes.`,
);
