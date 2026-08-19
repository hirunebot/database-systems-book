# 00. Database Systems Book 執筆計画

> 執筆状況：全18章と付録の本文を作成済み。公開用本文は `src/content/docs/` に配置している。

## このドキュメントの目的

本書は、Webアプリケーション開発者がデータベースを単なる保存先としてではなく、内部の仕組みとトレードオフから説明できるようになるための入門書とする。単語の定義を並べるのではなく、1件のSQLがストレージへ届き、並行実行され、障害から復旧し、複数ノードへ複製されるまでを段階的につなげる。

## 想定読者

- Webアプリケーションの実装経験があり、SQLの基本構文を知っている
- 実行計画、ロック、レプリカ遅延などを断片的には知っているが、全体像を整理したい
- 特定製品の操作方法だけでなく、異なるDBにも応用できる原理を学びたい

## 到達目標

読了後、次の問いに仕組みから答えられる状態を目指す。

1. DBはテーブルとインデックスをディスク上へどのように配置するのか
2. SQLはどのように実行計画へ変換され、なぜ速い計画・遅い計画が生まれるのか
3. 複数トランザクションの競合と障害から、整合性と永続性をどう守るのか
4. レプリケーション、合意形成、シャーディングはそれぞれ何を解決するのか
5. アプリケーション側はDBの性質を踏まえて、どのように安全かつ効率的に利用するのか

## 全体構成

### Part I: データベースを捉える

| 章 | 執筆計画 | 主題 |
| --- | --- | --- |
| 01 | [データベースシステムの全体像](./01-database-systems-overview.md) | SQLからストレージまでの構成要素と本書の地図 |
| 02 | [リレーショナルモデルとスキーマ](./02-relational-model-and-schema.md) | 関係、キー、制約、正規化と物理設計の境界 |

### Part II: ストレージとインデックス

| 章 | 執筆計画 | 主題 |
| --- | --- | --- |
| 03 | [ページ、レコード、バッファプール](./03-pages-records-and-buffer-pool.md) | page/block、heap file、slotted page、メモリ階層 |
| 04 | [B-tree、B+tree、インデックス設計](./04-btree-and-index-design.md) | 木構造、clustered/secondary、複合・covering index |
| 05 | [ハッシュインデックスとLSM-tree](./05-hash-index-and-lsm-tree.md) | hash index、SSTable、compaction、Bloom filter |

### Part III: クエリ処理

| 章 | 執筆計画 | 主題 |
| --- | --- | --- |
| 06 | [SQLから論理実行計画へ](./06-sql-and-logical-plans.md) | relational algebra、解析、書き換え、logical plan |
| 07 | [物理実行と演算子](./07-physical-execution.md) | scan、sort、aggregation、materialization、pipelining |
| 08 | [結合アルゴリズム](./08-join-algorithms.md) | nested loop、hash join、sort-merge join |
| 09 | [コストベース最適化](./09-cost-based-optimizer.md) | 統計、cardinality、コスト、join order、EXPLAIN |

### Part IV: トランザクションと障害回復

| 章 | 執筆計画 | 主題 |
| --- | --- | --- |
| 10 | [ACIDと分離レベル](./10-transactions-and-isolation.md) | ACID、isolation level、直列化可能性、異常現象 |
| 11 | [並行性制御](./11-concurrency-control.md) | MVCC、lock、deadlock、楽観・悲観、2PL、SSI |
| 12 | [WALとクラッシュリカバリ](./12-wal-and-recovery.md) | WAL、checkpoint、redo/undo、ARIES、PITR |

### Part V: 分散データベース

| 章 | 執筆計画 | 主題 |
| --- | --- | --- |
| 13 | [レプリケーションと整合性](./13-replication-and-consistency.md) | leader/follower、同期・非同期、quorum、整合性モデル |
| 14 | [合意形成とRaft](./14-consensus-and-raft.md) | consensus、leader election、複製ログ、障害時の多数決 |
| 15 | [パーティショニングとシャーディング](./15-partitioning-and-sharding.md) | range/hash、rebalancing、hotspot、分散クエリ |
| 16 | [分散トランザクション](./16-distributed-transactions.md) | 2PC、Saga、outbox/inbox、CDC、冪等性 |

### Part VI: アプリケーションと実運用

| 章 | 執筆計画 | 主題 |
| --- | --- | --- |
| 17 | [アプリケーションからのDB利用と運用](./17-application-integration-and-operations.md) | 接続、クエリ、変更、監視、バックアップ、フェイルオーバー |
| 18 | [総合演習：1件の注文を追跡する](./18-capstone.md) | 書き込みと読み出しを全レイヤーで追うケーススタディ |

## 各章の共通フォーマット

本文を執筆するときは、原則として次の順序にそろえる。

1. この章で答える問い
2. 先に示す短い結論とメンタルモデル
3. 最小の具体例
4. 内部処理を段階的に示す図解
5. 設計上のトレードオフと失敗例
6. 実DBでの観察方法または再現可能な実験
7. よくある誤解
8. 要点と確認問題

## 執筆方針

- 製品共通の原理と、PostgreSQL・MySQL/InnoDB・LSM系DBなどの実装差を明確に分ける
- 図はMermaidを基本とし、ページレイアウトなど細部が重要な図だけSVGを検討する
- SQL、実行計画、ログなどはコピーして再現できる小さな例を使う
- 性能の断定には前提条件を添え、「インデックスがあれば速い」のような説明を避ける
- 用語は初出時に日本語と英語を併記し、章をまたいで表記を統一する
- WALのように複数領域にまたがる概念は主章で詳説し、他章からリンクする

## 執筆順序

まず01章と18章の骨格を作り、入口と到達点を固定する。その後は03〜12章の単一ノードDB、13〜16章の分散DB、02章と17章の利用側という順に執筆する。章番号は読書順を表し、執筆順とは一致しない。
