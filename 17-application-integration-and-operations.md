# 17. アプリケーションからのDB利用と運用

## この章の役割

DB内部の性質を、Webアプリケーションの実装・リリース・監視・障害対応へ接続する。理論を実務上の判断へ変える章とする。

## この章で答える問い

- connection poolはなぜ必要で、大きくすれば速くなるわけではないのはなぜか
- N+1、深いOFFSET、長時間トランザクションはDB内部へ何を起こすのか
- schema migration、backup、failoverを安全に行うには何を確認すべきか

## 扱う内容

- connection確立コスト、pool sizing、backpressure
- prepared statement、bind parameter、SQL injection対策
- transaction boundaryと外部API呼び出し
- N+1 query、batching、eager/lazy loading
- offset paginationとkeyset pagination
- timeout、retry、deadlock retry、idempotency
- backward-compatible schema migrationとonline DDL
- index作成、vacuum、statistics更新などの保守
- slow query、lock wait、buffer hit ratio、replica lagの観測
- backup restore rehearsal、failover、switchover
- RPO、RTO、disaster recovery
- least privilege、監査ログ、機密データの扱い

## 図解・具体例

APIサーバ、connection pool、primary、replicaを結び、過負荷、migration、failover時の振る舞いを示す。

## 演習・確認課題

高負荷APIの症状から、アプリケーション、pool、query plan、lock、storageのどこを観測するか調査手順を作る。

## 読了時の到達目標

DBの問題をクエリだけに限定せず、接続、トランザクション、運用を含むend-to-endな問題として診断できる。
