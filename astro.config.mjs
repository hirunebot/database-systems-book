// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

export default defineConfig({
  integrations: [
    mermaid({ autoTheme: true }),
    starlight({
      title: 'Database Systems Book',
      description:
        'Webアプリケーション開発者のための、仕組みから学ぶデータベースシステム入門',
      defaultLocale: 'root',
      locales: {
        root: { label: '日本語', lang: 'ja' },
      },
      customCss: ['./src/styles/custom.css'],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      sidebar: [
        { label: 'はじめに', link: '/' },
        {
          label: 'Part I — データベースを捉える',
          items: [{ autogenerate: { directory: '01-foundations' } }],
        },
        {
          label: 'Part II — ストレージとインデックス',
          items: [{ autogenerate: { directory: '02-storage' } }],
        },
        {
          label: 'Part III — クエリ処理',
          items: [{ autogenerate: { directory: '03-query-processing' } }],
        },
      ],
    }),
  ],
});
