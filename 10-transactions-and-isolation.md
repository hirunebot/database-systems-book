# 10. ACIDと分離レベル

## この章の役割

トランザクションが提供する保証を、略語の暗記ではなく、並行実行と障害の具体例から理解する。

## この章で答える問い

- ACIDの各性質は、どの失敗からアプリケーションを守るのか
- isolation levelを下げると、具体的にどの異常が許されるのか
- serializabilityと実際の実行順序にはどのような関係があるのか

## 扱う内容

- atomicity、consistency、isolation、durability
- consistencyがDB単体で保証できる範囲
- schedule、serial schedule、serializable schedule
- dirty read、non-repeatable read、phantom read
- lost update、read skew、write skew
- Read Uncommitted、Read Committed、Repeatable Read、Serializable
- snapshot isolationとserializabilityの差
- SQL標準の定義と製品実装差を読む際の注意

## 図解・具体例

口座振替、在庫引当、当直割り当てを使い、異常現象をトランザクションの時系列図で示す。

## 演習・確認課題

複数の実行履歴を読み、発生した異常と必要な分離レベルを判定する。

## 読了時の到達目標

業務上守りたい不変条件から、必要なトランザクション境界と分離レベルを議論できる。
