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
3. [04. B-tree、B+tree、インデックス設計](/02-storage/04-btree-indexes/)
4. [06. SQLから論理実行計画へ](/03-query-processing/06-sql-logical-plans/)
5. [07. 物理実行と演算子](/03-query-processing/07-physical-execution/)
6. [10. ACIDと分離レベル](/04-transactions/10-acid-isolation/)
7. [11. 並行性制御](/04-transactions/11-concurrency-control/)
8. [12. WALとクラッシュリカバリ](/04-transactions/12-wal-recovery/)

まず単一node DBのquery、memory、transaction、recoveryを一つの流れとして理解してから分散DBへ進みます。

## 遅いqueryを診断したい

1. [04. インデックス設計](/02-storage/04-btree-indexes/)
2. [07. 物理実行と演算子](/03-query-processing/07-physical-execution/)
3. [08. 結合アルゴリズム](/03-query-processing/08-join-algorithms/)
4. [09. コストベース最適化](/03-query-processing/09-cost-based-optimizer/)
5. [17. アプリケーションからのDB利用と運用](/06-operations/17-application-operations/)

EXPLAIN ANALYZEでは、最上位の時間ではなく、推定rowと実rowが最初にずれたoperator、過剰なloops、spill、page accessを探します。

## transactionの競合を診断したい

1. [10. ACIDと分離レベル](/04-transactions/10-acid-isolation/)
2. [11. 並行性制御](/04-transactions/11-concurrency-control/)
3. [17. アプリケーションからのDB利用と運用](/06-operations/17-application-operations/)

業務上の不変条件を先に文章化し、どのscheduleで壊れるかを書きます。その後にisolation level、atomic UPDATE、lock、OCC、Serializableを選びます。

## replication lagとfailoverを理解したい

1. [12. WALとクラッシュリカバリ](/04-transactions/12-wal-recovery/)
2. [13. レプリケーションと整合性](/05-distributed-db/13-replication-consistency/)
3. [14. 合意形成とRaft](/05-distributed-db/14-consensus-raft/)
4. [17. アプリケーションからのDB利用と運用](/06-operations/17-application-operations/)

Receive、flush、replayのどこまで進んだか、commit時にどのackを待つか、old primaryをどうfenceするかを確認します。

## shardingを検討している

1. [09. コストベース最適化](/03-query-processing/09-cost-based-optimizer/)
2. [13. レプリケーションと整合性](/05-distributed-db/13-replication-consistency/)
3. [14. 合意形成とRaft](/05-distributed-db/14-consensus-raft/)
4. [15. パーティショニングとシャーディング](/05-distributed-db/15-partitioning-sharding/)
5. [16. 分散トランザクション](/05-distributed-db/16-distributed-transactions/)

Sharding前に、single-node vertical scaling、index、cache、read replica、archive、partitioned tableで解決できないbottleneckか測定します。

## microservicesの整合性を設計したい

1. [10. ACIDと分離レベル](/04-transactions/10-acid-isolation/)
2. [13. レプリケーションと整合性](/05-distributed-db/13-replication-consistency/)
3. [16. 分散トランザクション](/05-distributed-db/16-distributed-transactions/)
4. [18. 総合演習](/06-operations/18-capstone/)

「eventual consistency」で済ませず、各state、visible intermediate state、timeout、retry、compensation、manual recoveryをfailure matrixへ書きます。

## 製品共通原理と実装差

本書は共通原理を中心にし、製品固有の例を区別しています。特に次は同じ語でも構造が異なります。

| Topic | PostgreSQL | MySQL/InnoDB | LSM系DB |
| --- | --- | --- | --- |
| Table layout | Heap + separate indexes | Primary key clustered leafにrow | Memtable + SSTables |
| Secondary locator | Heap TID | Primary key value | Key/version/LSM内位置 |
| MVCC old version | Heap tuple version | Undo chain | Sequence/version + tombstone等 |
| Maintenance | VACUUM、checkpoint | Purge、checkpoint | Compaction |
| Replication base | WAL streaming/logical | Binlog/redo系 | Replicated log/engine固有 |
| Serializable | SSI等 | Lock/MVCC、設定依存 | Product protocol依存 |

Versionによって挙動は変わります。実運用では必ず使用versionの公式documentと実行計画を確認します。

## 実験環境

本文の概念を観察する最小環境として、containerまたはlocal PostgreSQLを利用できます。

試す項目：

- EXPLAIN (ANALYZE, BUFFERS)
- Composite index追加前後
- work_memを変えたsort spill
- 二sessionでlost update/deadlock
- pg_locks、pg_stat_activity
- Long transactionとVACUUM
- WAL/checkpoint統計
- Streaming replica lag
- Backup + PITR

実験値はhardware、cache、data distributionで変わります。結果だけでなく、data量、version、設定、cache state、実行回数を記録します。

## 読むべき一次資料

### Relationとquery

- [E. F. Codd, “A Relational Model of Data for Large Shared Data Banks”](https://doi.org/10.1145/362384.362685)
- [Goetz Graefe, “Query Evaluation Techniques for Large Databases”](https://doi.org/10.1145/152610.152611)
- [Surajit Chaudhuri, “An Overview of Query Optimization in Relational Systems”](https://doi.org/10.1145/275487.275492)

### Storage

- [Patrick O’Neil et al., “The Log-Structured Merge-Tree”](https://doi.org/10.1007/s002360050048)
- [PostgreSQL: Database Page Layout](https://www.postgresql.org/docs/current/storage-page-layout.html)
- [RocksDB Wiki](https://github.com/facebook/rocksdb/wiki)

### Transactionとrecovery

- [Hal Berenson et al., “A Critique of ANSI SQL Isolation Levels”](https://doi.org/10.1145/223784.223785)
- [Michael J. Cahill et al., “Serializable Isolation for Snapshot Databases”](https://doi.org/10.1145/1376616.1376690)
- [C. Mohan et al., “ARIES”](https://doi.org/10.1145/128765.128770)

### 分散system

- [Raft Paper](https://raft.github.io/raft.pdf)
- [Dynamo Paper](https://doi.org/10.1145/1294261.1294281)
- [Spanner Paper](https://doi.org/10.1145/2491245)
- [Gilbert and Lynch, CAP proof](https://doi.org/10.1145/564585.564601)
- [Gray and Lamport, Consensus on Transaction Commit](https://doi.org/10.1145/2890785)
- [Garcia-Molina and Salem, Sagas](https://doi.org/10.1145/38713.38742)

## 公式documentationを読むとき

次を分けます。

1. **保証**：何をcommit、visible、durableと定義するか
2. **default**：初期設定でどの保証が有効か
3. **mechanism**：lock、version、log、quorumなどの実装
4. **failure**：node/network/storage failure時の挙動
5. **operation**：backup、upgrade、failover、monitoring

Feature listだけでなくfailure semanticsを読みます。

## benchmarkの注意

- Datasetがmemoryへ収まるか
- Warm/cold cache
- Read/write ratio
- Key/data skew
- Transaction size
- Concurrency
- Durability設定
- Replica/ack条件
- Compaction/checkpoint中か
- Tail latency

Durabilityを無効化したbenchmarkとproduction設定を比較しません。平均throughputだけでなくp95/p99、resource、background workを記録します。

## 学習の完成条件

次を一つのrequestについて説明できれば、本書の概念が接続されています。

1. Logical schemaとconstraint
2. Record/page/index配置
3. SQLからlogical/physical plan
4. Scan/join/aggregateのdata flow
5. Concurrent transactionとの競合
6. COMMITとWAL flush
7. Crash後のredo/undo
8. Replicaへのcommit/apply
9. Shard routing
10. Cross-service failureとidempotent recovery

[18章の総合演習](/06-operations/18-capstone/)を、自分のserviceのrequestへ置き換えて図にしてください。
