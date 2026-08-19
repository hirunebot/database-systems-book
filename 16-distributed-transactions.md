# 16. 分散トランザクション

## この章の役割

複数DB・shard・サービスにまたがる更新で、atomicityや業務上の整合性をどのように実現するかを比較する。

## この章で答える問い

- two-phase commitは何を保証し、どこで停止し得るのか
- SagaはDBトランザクションの代替なのか
- message送信とDB更新の二重書き込み問題をどう避けるのか

## 扱う内容

- local transactionとdistributed transaction
- atomic commitとconsensusの違い
- two-phase commit（2PC）のprepare/commit
- coordinator/participant障害とin-doubt transaction
- three-phase commitの考え方と実用上の位置づけ
- Sagaのorchestration/choreography
- compensating actionと不可逆な副作用
- transactional outbox、inbox、change data capture（CDC）
- at-most-once、at-least-once、effectively-once
- idempotency key、deduplication、retry
- Lamport clockなど因果順序の基礎への入口

## 図解・具体例

注文、在庫、決済の更新を2PCとSagaでそれぞれ設計し、障害点ごとの状態と復旧方法を比較する。

## 演習・確認課題

決済成功後に応答を受け取れなかったケースを、冪等性とoutboxを使って安全にretryできるよう設計する。

## 読了時の到達目標

技術的atomicityと業務上の補償を区別し、失敗時の中間状態を明示して方式を選べる。
