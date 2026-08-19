# 18. 総合演習：1件の注文を追跡する

## この章の役割

本書で学んだ概念を、注文APIの1回の書き込みと読み取りへ統合する。各章を独立した知識で終わらせず、同じイベントを異なるレイヤーから説明する。

## この章で答える問い

- 注文確定のSQLは、commit応答までにどの層を通るのか
- 同時更新、クラッシュ、replica lag、network partitionが起きると何が変わるのか
- 要件が変わったとき、どの設計判断を見直すべきか

## ケーススタディ

次のシステムを段階的に設計する。

1. 単一ノードDBに顧客、注文、在庫を保存する
2. 注文一覧の遅いクエリを実行計画から改善する
3. 同時購入による在庫の取り過ぎをトランザクションで防ぐ
4. commit直後のクラッシュからWALで復旧する
5. followerを追加し、読み取りとfailoverを設計する
6. 注文をshardへ分割し、決済サービスと連携する

## 本文へ含める観察点

- スキーマ、制約、ページとインデックスの配置
- SQL、logical plan、physical plan、cardinality
- lockまたはMVCCでのversion visibility
- WAL record、commit、checkpoint、recovery
- replication log、consensus、read consistency
- shard routing、2PCまたはSaga、outbox、retry
- latency、throughput、RPO/RTO、運用上の監視項目

## 成果物

- end-to-endのシーケンス図
- 要件と設計判断を対応づけたdecision table
- 複数の障害注入シナリオと期待結果
- 単一ノード版から分散版までの設計変更履歴

## 最終確認課題

「ユーザーへ注文完了を返した」とは、各構成でどのノードのどの状態まで保証されたことを意味するか説明する。

## 読了時の到達目標

アプリケーションの要件をDB内部の機構へ結びつけ、正常系だけでなく競合・遅延・障害時の振る舞いまで説明できる。
