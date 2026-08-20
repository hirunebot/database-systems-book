---
title: 付録B. 目的別の読み方と参考資料
description: 学習目的別の章ルート、実装差の確認方法、一次資料と実験の進め方をまとめる。
sidebar:
  order: 91
  label: 付録B. 目的別の読み方と参考資料
---

本書は01章から順に読めますが、実務上の課題から逆引きすることもできます。

## 初めてDB内部を学ぶ

推奨順：

1. [01. データベースシステムの全体像](/01-foundations/01-overview/)
2. [03. ページ、レコード、バッファプール](/02-storage/03-pages-records-buffer-pool/)
3. [04. B-木、B+木、インデックス設計](/02-storage/04-btree-indexes/)
4. [06. SQLから論理実行計画へ](/03-query-processing/06-sql-logical-plans/)
5. [07. 物理実行と演算子](/03-query-processing/07-physical-execution/)
6. [10. ACIDと分離レベル](/04-transactions/10-acid-isolation/)
7. [11. 並行性制御](/04-transactions/11-concurrency-control/)
8. [12. WALとクラッシュリカバリ](/04-transactions/12-wal-recovery/)

まず単一ノードDBのクエリ、メモリ、トランザクション、復旧を一つの流れとして理解してから分散DBへ進みます。

## 遅いクエリを診断したい

1. [04. インデックス設計](/02-storage/04-btree-indexes/)
2. [07. 物理実行と演算子](/03-query-processing/07-physical-execution/)
3. [08. 結合アルゴリズム](/03-query-processing/08-join-algorithms/)
4. [09. コストベース最適化](/03-query-processing/09-cost-based-optimizer/)
5. [17. アプリケーションからのDB利用と運用](/06-operations/17-application-operations/)

EXPLAIN解析では、最上位の時間ではなく、推定行と実行が最初にずれた演算子、過剰なループ数、ディスク退避、ページアクセスを探します。

## トランザクションの競合を診断したい

1. [10. ACIDと分離レベル](/04-transactions/10-acid-isolation/)
2. [11. 並行性制御](/04-transactions/11-concurrency-control/)
3. [17. アプリケーションからのDB利用と運用](/06-operations/17-application-operations/)

業務上の不変条件を先に文章化し、どのスケジュールで壊れるかを書きます。その後に分離レベル、原子的なUPDATE、ロック、OCC、Serializableを選びます。

## レプリケーション遅延とフェイルオーバーを理解したい

1. [12. WALとクラッシュリカバリ](/04-transactions/12-wal-recovery/)
2. [13. レプリケーションと整合性](/05-distributed-db/13-replication-consistency/)
3. [14. 合意形成とRaft](/05-distributed-db/14-consensus-raft/)
4. [17. アプリケーションからのDB利用と運用](/06-operations/17-application-operations/)

受信、書き出し、再生のどこまで進んだか、コミット時にどの確認応答を待つか、古い主系をどうフェンシングするかを確認します。

## シャーディングを検討している

1. [09. コストベース最適化](/03-query-processing/09-cost-based-optimizer/)
2. [13. レプリケーションと整合性](/05-distributed-db/13-replication-consistency/)
3. [14. 合意形成とRaft](/05-distributed-db/14-consensus-raft/)
4. [15. パーティショニングとシャーディング](/05-distributed-db/15-partitioning-sharding/)
5. [16. 分散トランザクション](/05-distributed-db/16-distributed-transactions/)

シャーディング前に、単一ノード垂直拡張、インデックス、キャッシュ、読み取りレプリカ、アーカイブ、パーティション表で解決できないボトルネックか測定します。

## マイクロサービスの整合性を設計したい

1. [10. ACIDと分離レベル](/04-transactions/10-acid-isolation/)
2. [13. レプリケーションと整合性](/05-distributed-db/13-replication-consistency/)
3. [16. 分散トランザクション](/05-distributed-db/16-distributed-transactions/)
4. [18. 総合演習](/06-operations/18-capstone/)

「結果整合性」で済ませず、各状態、外部から見える中間状態、タイムアウト、再試行、補償、手動復旧を障害マトリクスへ書きます。

## 製品共通原理と実装差

本書は共通原理を中心にし、製品固有の例を区別しています。特に次は同じ語でも構造が異なります。

| 項目 | PostgreSQL | MySQL/InnoDB | LSM系DB |
| --- | --- | --- | --- |
| 表の配置 | ヒープ + 別インデックス | 主キー クラスタ化葉に行 | Memtable + SSTable群 |
| 副系位置情報 | ヒープTID | 主キー 値 | キー/バージョン/LSM内位置 |
| MVCC古いバージョン | ヒープタプルバージョン | 取り消し連鎖 | 連番/バージョン + 削除マーカー等 |
| 保守 | 不要版の回収、チェックポイント | 不要版の削除、チェックポイント | コンパクション |
| レプリケーション基底 | WALストリーミング/論理 | バイナリログ/再実行系 | 複製ログ/エンジン固有 |
| Serializable | SSI等 | ロック/MVCC、設定依存 | 製品固有のプロトコルに依存 |

バージョンによって挙動は変わります。実運用では必ず使用バージョンの公式文書と実行計画を確認します。

## 実験環境

本文の概念を観察する最小環境として、コンテナまたは局所PostgreSQLを利用できます。

試す項目：

- EXPLAIN (解析, BUFFERS)
- 複合インデックス追加前後
- work_memを変えたソートディスク退避
- 二セッションで更新消失/デッドロック
- pg_locks、pg_stat_activity
- 長時間トランザクションと不要版の回収
- WAL/チェックポイント統計
- ストリーミングレプリケーションの遅延
- バックアップ + PITR

実験値はハードウェア、キャッシュ、データ分布で変わります。結果だけでなく、データ量、バージョン、設定、キャッシュ状態、実行回数を記録します。

## 読むべき一次資料

### 関係とクエリ

- [E. F. Codd, “A Relational Model of Data for Large Shared Data Banks”](https://doi.org/10.1145/362384.362685)
- [Goetz Graefe, “Query Evaluation Techniques for Large Databases”](https://doi.org/10.1145/152610.152611)
- [Surajit Chaudhuri, “An Overview of Query Optimization in Relational Systems”](https://doi.org/10.1145/275487.275492)

### ストレージ

- [Patrick O’Neil et al., “The Log-Structured Merge-Tree”](https://doi.org/10.1007/s002360050048)
- [PostgreSQL: Database Page Layout](https://www.postgresql.org/docs/current/storage-page-layout.html)
- [RocksDB Wiki](https://github.com/facebook/rocksdb/wiki)

### トランザクションと復旧

- [Hal Berenson et al., “A Critique of ANSI SQL Isolation Levels”](https://doi.org/10.1145/223784.223785)
- [Michael J. Cahill et al., “Serializable Isolation for Snapshot Databases”](https://doi.org/10.1145/1376616.1376690)
- [C. Mohan et al., “ARIES”](https://doi.org/10.1145/128765.128770)

### 分散システム

- [Raft Paper](https://raft.github.io/raft.pdf)
- [Dynamo Paper](https://doi.org/10.1145/1294261.1294281)
- [Spanner Paper](https://doi.org/10.1145/2491245)
- [Gilbert and Lynch, CAP proof](https://doi.org/10.1145/564585.564601)
- [Gray and Lamport, Consensus on Transaction Commit](https://doi.org/10.1145/2890785)
- [Garcia-Molina and Salem, Sagas](https://doi.org/10.1145/38713.38742)

## 公式文書を読むとき

次を分けます。

1. **保証**：何をコミット済み、可視、永続化済みと定義するか
2. **既定値**：初期設定でどの保証が有効か
3. **仕組み**：ロック、バージョン、ログ、クォーラムなどの実装
4. **障害**：ノード/ネットワーク/ストレージ障害時の挙動
5. **操作**：バックアップ、更新、フェイルオーバー、監視

機能一覧だけでなく障害意味論を読みます。

## ベンチマークの注意

- データ集合がメモリへ収まるか
- 温／低温キャッシュ
- 読み取り/書き込み比率
- キー/データ偏り
- トランザクション大きさ
- 同時実行性
- 永続性設定
- レプリカ/確認応答条件
- コンパクション/チェックポイント中か
- 裾の遅延時間

永続性を無効化したベンチマークと本番環境設定を比較しません。平均処理量だけでなくp95/p99、資源、バックグラウンド処理を記録します。

## 学習の完成条件

次を一つのリクエストについて説明できれば、本書の概念が接続されています。

1. 論理スキーマと制約
2. レコード/ページ/インデックス配置
3. SQLから論理/物理計画
4. 走査/結合/集約のデータ流れ
5. 並行するトランザクションとの競合
6. コミットとWAL書き出し
7. クラッシュ後の再実行/取り消し
8. レプリカへのコミット/適用
9. シャード振り分け
10. サービス横断障害と冪等な復旧

[18章の総合演習](/06-operations/18-capstone/)を、自分のサービスのリクエストへ置き換えて図にしてください。
