# 13. レプリケーションと整合性

## この章の役割

データを複数ノードへ複製する目的と、その結果生じる遅延・整合性・可用性のトレードオフを整理する。

## この章で答える問い

- replicationは可用性、耐久性、読み取り性能をどこまで改善するのか
- synchronous/asynchronous replicationではcommitの意味がどう変わるのか
- replicaからの読み取りで古い値が返るのはなぜか

## 扱う内容

- physical/logical replication、statement/row/log shippingの概略
- leader/follower、multi-leader、leaderless
- synchronous、semi-synchronous、asynchronous replication
- replica lag、read scaling、failover時のデータ損失
- strong/eventual/causal consistency
- linearizabilityとserializabilityの違い
- read-your-writes、monotonic reads
- quorum read/writeと`R + W > N`の前提
- read repair、conflict resolutionへの入口
- network partition、CAP、PACELC

## 図解・具体例

注文確定直後にreplicaから注文を読むケースで、同期方式とread routingによる見え方を時系列で比較する。

## 演習・確認課題

決済、商品検索、アクセス解析の各用途に必要な整合性と許容遅延を定義する。

## 読了時の到達目標

replication方式をノード数だけでなく、commit条件、read semantics、障害時の損失から説明できる。
