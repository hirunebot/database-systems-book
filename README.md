# Database Systems Book

Webアプリケーション開発者のための、仕組みから学ぶデータベースシステム入門です。

ストレージ、インデックス、クエリ処理、トランザクション、障害回復、分散DB、アプリケーション運用を、1件の注文を追跡する共通例でつなぎます。

## 構成

- Part I — データベースを捉える
- Part II — ストレージとインデックス
- Part III — クエリ処理
- Part IV — トランザクションと障害回復
- Part V — 分散データベース
- Part VI — アプリケーションと実運用
- 付録 — 用語集、目的別の読み方、参考資料、トピック対応表

全18章の執筆計画は [index.md](./index.md) にあります。完成した公開本文は [src/content/docs](./src/content/docs) にあります。

## ローカルで読む

```bash
bun install
bun run dev
```

表示されたURLをブラウザで開きます。

## 検証

```bash
bun run check
bun run preview
```

`bun run check`は章番号、共通節、内部リンク、未完了表記を検証してから静的siteをbuildします。Astro StarlightでMermaid図、code highlight、sidebar、ページ内目次、Pagefind全文検索を提供します。

## 編集方針

- 製品共通の原理と製品固有の実装を分ける
- 各章を「問い、メンタルモデル、具体例、trade-off、誤解、確認問題」で構成する
- SQLと図を再現可能な小さな例にする
- 性能や整合性を、前提条件なしに「速い」「強い」と断定しない
- 一次資料と公式documentationへの導線を置く

## License

Licenseは未指定です。利用条件を公開する場合は、LICENSEファイルを追加してください。
