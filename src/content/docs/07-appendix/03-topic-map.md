---
title: 付録C. トピック対応表
description: 当初の学習項目と、本書で扱う章・節の対応を一覧にする。
sidebar:
  order: 92
  label: 付録C. トピック対応表
---

この付録は、学習したい用語から本文を逆引きするための対応表です。同じ概念を複数の章で使う場合は、仕組みを主に説明する章を先に示しています。

## ストレージとインデックス

| Topic | 主な章 | 接続する内容 |
| --- | --- | --- |
| Page / block | [03章](/02-storage/03-pages-records-buffer-pool/) | Record配置、slotted page、I/O単位 |
| B-tree / B+tree | [04章](/02-storage/04-btree-indexes/) | Node構造、探索、split、range scan |
| Hash index | [05章](/02-storage/05-hash-and-lsm/) | Equality lookup、bucket、extendible hashing |
| Clustered / secondary index | [04章](/02-storage/04-btree-indexes/) | Row locator、covering index、heapとの関係 |
| Buffer pool | [03章](/02-storage/03-pages-records-buffer-pool/) | Page cache、pin、dirty page、replacement |
| WAL | [12章](/04-transactions/12-wal-recovery/) | Write-ahead rule、LSN、commit record |
| LSM-tree | [05章](/02-storage/05-hash-and-lsm/) | Memtable、SSTable、compaction、amplification |

## クエリ処理

| Topic | 主な章 | 接続する内容 |
| --- | --- | --- |
| SQL → relational algebra | [06章](/03-query-processing/06-sql-logical-plans/) | Parse、bind、selection、projection、join |
| Logical plan | [06章](/03-query-processing/06-sql-logical-plans/) | Rewrite、predicate pushdown、join reorder |
| Physical plan | [07章](/03-query-processing/07-physical-execution/) | Operator、iterator、pipeline、materialization |
| Table scan / index scan | [07章](/03-query-processing/07-physical-execution/) | Access path、selectivity、random I/O |
| Nested loop / hash join / sort-merge join | [08章](/03-query-processing/08-join-algorithms/) | 前提、cost、memory、spill |
| Cost-based optimizer | [09章](/03-query-processing/09-cost-based-optimizer/) | Cardinality推定、statistics、search space |
| Sort / aggregate / spill | [07章](/03-query-processing/07-physical-execution/) | External sort、hash aggregate、memory budget |

## トランザクションと障害回復

| Topic | 主な章 | 接続する内容 |
| --- | --- | --- |
| ACID | [10章](/04-transactions/10-acid-isolation/) | 不変条件、atomicity、isolation、durability |
| Isolation level | [10章](/04-transactions/10-acid-isolation/) | Read Committed、Snapshot Isolation、Serializable |
| MVCC | [11章](/04-transactions/11-concurrency-control/) | Version visibility、snapshot、vacuum |
| Lock | [11章](/04-transactions/11-concurrency-control/) | S/X lock、2PL、predicate protection |
| Deadlock | [11章](/04-transactions/11-concurrency-control/) | Wait-for graph、検出、回避、retry |
| Optimistic / pessimistic concurrency control | [11章](/04-transactions/11-concurrency-control/) | Validate、version column、競合率とのtrade-off |
| Checkpoint | [12章](/04-transactions/12-wal-recovery/) | Recovery開始点、dirty page、fuzzy checkpoint |
| Crash recovery | [12章](/04-transactions/12-wal-recovery/) | Analysis、redo、undo、ARIES |
| Redo / undo | [12章](/04-transactions/12-wal-recovery/) | Winner/loser transaction、CLR、idempotence |
| Backup / PITR | [12章](/04-transactions/12-wal-recovery/) | Media failure、base backup、log archive |

## 分散データベース

| Topic | 主な章 | 接続する内容 |
| --- | --- | --- |
| Replication | [13章](/05-distributed-db/13-replication-consistency/) | Log shipping、read replica、failover |
| Leader / follower | [13章](/05-distributed-db/13-replication-consistency/) | Write authority、lag、read-your-writes |
| Synchronous / asynchronous replication | [13章](/05-distributed-db/13-replication-consistency/) | Commit latency、RPO、ack point |
| Quorum | [13章](/05-distributed-db/13-replication-consistency/) | N・W・R、intersection、version conflict |
| Consensus | [14章](/05-distributed-db/14-consensus-raft/) | Safety、liveness、term、majority |
| Raft | [14章](/05-distributed-db/14-consensus-raft/) | Election、log replication、commit rule、snapshot |
| Partitioning / sharding | [15章](/05-distributed-db/15-partitioning-sharding/) | Range/hash、routing、rebalance、hotspot |
| Distributed transaction | [16章](/05-distributed-db/16-distributed-transactions/) | 2PC、Saga、outbox、idempotency |
| Consistency model / CAP | [13章](/05-distributed-db/13-replication-consistency/) | Linearizability、eventual consistency、partition時の選択 |

## アプリケーションと運用

| Topic | 主な章 | 接続する内容 |
| --- | --- | --- |
| Connection pool / backpressure | [17章](/06-operations/17-application-operations/) | Queueing、timeout、pool sizing |
| Migration | [17章](/06-operations/17-application-operations/) | Expand/contract、backfill、online index |
| Observability | [17章](/06-operations/17-application-operations/) | SLI、slow query、lock、replication lag |
| Security | [17章](/06-operations/17-application-operations/) | Least privilege、injection、encryption、audit |
| 全レイヤーの統合 | [18章](/06-operations/18-capstone/) | 注文をpageからSagaまで追跡 |

## 読み方

最初から通読する場合は[ホーム](/)の順序に従ってください。特定の障害や性能問題から学ぶ場合は、[付録Bの目的別ガイド](/07-appendix/02-reading-guide/)とこの表を組み合わせます。

用語の短い定義は[付録Aの用語集](/07-appendix/01-glossary/)から参照できます。
