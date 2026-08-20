---
title: 付録C. トピック対応表
description: 当初の学習項目と、本書で扱う章・節の対応を一覧にする。
sidebar:
  order: 92
  label: 付録C. トピック対応表
---

この付録は、学習したい用語から本文を逆引きするための対応表です。同じ概念を複数の章で使う場合は、仕組みを主に説明する章を先に示しています。

## ストレージとインデックス

| 項目 | 主な章 | 接続する内容 |
| --- | --- | --- |
| ページ／ブロック | [03章](/02-storage/03-pages-records-buffer-pool/) | レコード配置、スロットページ、I/O単位 |
| B-木 / B+木 | [04章](/02-storage/04-btree-indexes/) | ノード構造、探索、分割、範囲走査 |
| ハッシュインデックス | [05章](/02-storage/05-hash-and-lsm/) | 等値参照、バケット、拡張可能ハッシュ法 |
| クラスタ化 / セカンダリインデックス | [04章](/02-storage/04-btree-indexes/) | 行位置情報、カバリングインデックス、ヒープとの関係 |
| バッファプール | [03章](/02-storage/03-pages-records-buffer-pool/) | ページキャッシュ、固定、未書き出しページ、置換 |
| WAL | [12章](/04-transactions/12-wal-recovery/) | 先行書き込み規則、LSN、コミットレコード |
| LSM-木 | [05章](/02-storage/05-hash-and-lsm/) | Memtable、SSTable、コンパクション、増幅 |

## クエリ処理

| 項目 | 主な章 | 接続する内容 |
| --- | --- | --- |
| SQL → 関係代数 | [06章](/03-query-processing/06-sql-logical-plans/) | 解析、名前解決、選択、射影、結合 |
| 論理計画 | [06章](/03-query-processing/06-sql-logical-plans/) | 書き換え、述語のプッシュダウン、結合並べ替え |
| 物理計画 | [07章](/03-query-processing/07-physical-execution/) | 演算子、イテレーター、パイプライン、実体化 |
| 表走査 / インデックス走査 | [07章](/03-query-processing/07-physical-execution/) | アクセス経路、選択率、ランダムI/O |
| 入れ子ループ / ハッシュ結合 / ソートマージ結合 | [08章](/03-query-processing/08-join-algorithms/) | 前提、コスト、メモリ、ディスク退避 |
| コストベース最適化器 | [09章](/03-query-processing/09-cost-based-optimizer/) | 行数推定、統計情報、探索空間 |
| ソート / 集約 / ディスク退避 | [07章](/03-query-processing/07-physical-execution/) | 外部ソート、ハッシュ集約、メモリ上限 |

## トランザクションと障害回復

| 項目 | 主な章 | 接続する内容 |
| --- | --- | --- |
| ACID | [10章](/04-transactions/10-acid-isolation/) | 不変条件、原子性、分離性、永続性 |
| 分離レベル | [10章](/04-transactions/10-acid-isolation/) | コミット済み読み取り、スナップショット分離、Serializable |
| MVCC | [11章](/04-transactions/11-concurrency-control/) | バージョン可視性、スナップショット、不要版の回収 |
| ロック | [11章](/04-transactions/11-concurrency-control/) | S/Xロック、2PL、述語保護 |
| デッドロック | [11章](/04-transactions/11-concurrency-control/) | 待機グラフ、検出、回避、再試行 |
| 楽観的 / 悲観的並行性制御 | [11章](/04-transactions/11-concurrency-control/) | 検証、バージョン列、競合率とのトレードオフ |
| チェックポイント | [12章](/04-transactions/12-wal-recovery/) | 復旧開始点、未書き出しページ、ファジーチェックポイント |
| クラッシュ復旧 | [12章](/04-transactions/12-wal-recovery/) | 分析、再実行、取り消し、ARIES |
| 再実行 / 取り消し | [12章](/04-transactions/12-wal-recovery/) | 完了/未完了トランザクション、CLR、冪等性 |
| バックアップ / PITR | [12章](/04-transactions/12-wal-recovery/) | 媒体障害、ベースバックアップ、ログアーカイブ |

## 分散データベース

| 項目 | 主な章 | 接続する内容 |
| --- | --- | --- |
| レプリケーション | [13章](/05-distributed-db/13-replication-consistency/) | ログ転送、読み取りレプリカ、フェイルオーバー |
| リーダー / フォロワー | [13章](/05-distributed-db/13-replication-consistency/) | 書き込み権限、遅延、自分の書き込みの読み取り保証 |
| 同期／非同期レプリケーション | [13章](/05-distributed-db/13-replication-consistency/) | コミット遅延時間、RPO、確認応答条件 |
| クォーラム | [13章](/05-distributed-db/13-replication-consistency/) | N・W・R、共通部分、バージョン競合 |
| 合意 | [14章](/05-distributed-db/14-consensus-raft/) | 安全性、活性、任期、過半数 |
| Raft | [14章](/05-distributed-db/14-consensus-raft/) | 選挙、ログレプリケーション、コミット規則、スナップショット |
| 分割 / シャーディング | [15章](/05-distributed-db/15-partitioning-sharding/) | 範囲/ハッシュ、振り分け、再均衡化、集中箇所 |
| 分散トランザクション | [16章](/05-distributed-db/16-distributed-transactions/) | 2PC、Saga、アウトボックス、冪等性 |
| 整合性モデル / CAP | [13章](/05-distributed-db/13-replication-consistency/) | 線形化可能性、結果整合性、パーティション時の選択 |

## アプリケーションと運用

| 項目 | 主な章 | 接続する内容 |
| --- | --- | --- |
| 接続プール / 逆圧 | [17章](/06-operations/17-application-operations/) | 待ち行列、タイムアウト、接続プールの大きさの決定 |
| 移行 | [17章](/06-operations/17-application-operations/) | 拡張／縮約、既存データの補完、オンラインインデックス |
| 可観測性 | [17章](/06-operations/17-application-operations/) | SLI、低速クエリ、ロック、レプリケーション遅延 |
| セキュリティ | [17章](/06-operations/17-application-operations/) | 最小権限、インジェクション、暗号化、監査 |
| 全レイヤーの統合 | [18章](/06-operations/18-capstone/) | 注文をページからSagaまで追跡 |

## 読み方

最初から通読する場合は[ホーム](/)の順序に従ってください。特定の障害や性能問題から学ぶ場合は、[付録Bの目的別ガイド](/07-appendix/02-reading-guide/)とこの表を組み合わせます。

用語の短い定義は[付録Aの用語集](/07-appendix/01-glossary/)から参照できます。
