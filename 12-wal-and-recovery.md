# 12. WALとクラッシュリカバリ

## この章の役割

メモリ上の更新を高速に受け付けながら、クラッシュ後に一貫した状態へ戻す仕組みを扱う。WALを通常時の書き込みと復旧の両面から理解する。

## この章で答える問い

- dirty pageより先にログを永続化する必要があるのはなぜか
- checkpointを取ってもWALを不要にできないのはなぜか
- redoとundoは、どの更新に対して必要になるのか

## 扱う内容

- write-ahead loggingの原則
- log record、transaction ID、log sequence number（LSN）
- commit recordとgroup commit
- force/no-force、steal/no-stealの組み合わせ
- sharp/fuzzy checkpoint
- crash recoveryのanalysis、redo、undo
- ARIESの基本アイデアとcompensation log record
- media failureとcrash failureの違い
- backup/restore、base backup、point-in-time recovery（PITR）
- checksumと破損検出

## 図解・具体例

commit済み・未commitの更新とdirty pageが混在した瞬間にクラッシュさせ、ログから復旧する過程を示す。

## 演習・確認課題

ログ列とページLSNを読み、redo対象、undo対象、処理不要の更新へ分類する。

## 読了時の到達目標

commit応答、ログ永続化、データページ書き出しの順序と、クラッシュ後の復旧手順を説明できる。
