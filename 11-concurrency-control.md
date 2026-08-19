# 11. 並行性制御

## この章の役割

分離性を実現する代表的な仕組みを比較し、競合時の待機、abort、version管理が性能へ与える影響を理解する。

## この章で答える問い

- lockとMVCCは競合をどのように扱うのか
- optimistic/pessimistic concurrency controlは何に対して楽観・悲観なのか
- deadlockはなぜ起き、DBはどう検出・解消するのか

## 扱う内容

- shared/exclusive lock、lock compatibility
- row/page/table lock、intention lock、lock escalation
- two-phase locking（2PL）とstrict 2PL
- predicate lockとphantom対策
- MVCCのversion、snapshot、visibility rule
- vacuum/garbage collectionとlong-running transaction
- optimistic concurrency control、validation、retry
- pessimistic concurrency controlと待機
- wait-for graph、deadlock detection、victim selection
- timestamp orderingとSerializable Snapshot Isolation（SSI）の概略

## 図解・具体例

同じ在庫更新をlock方式とMVCC方式で並行実行し、reader/writerの待機とversionの見え方を比較する。

## 演習・確認課題

deadlockを起こす2トランザクションを設計し、ロック取得順序の統一で回避する。

## 読了時の到達目標

競合の種類と頻度から並行性制御の挙動を予測し、待機とretryのどちらが起きるか説明できる。
