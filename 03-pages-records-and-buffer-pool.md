# 03. ページ、レコード、バッファプール

## この章の役割

テーブルがファイルへ保存される過程を、byte列ではなくページ単位で理解する。ディスクI/Oとメモリ管理が後続のインデックス、実行計画、WALへどう影響するかを示す。

## この章で答える問い

- なぜDBは行単位ではなくpage/block単位で読み書きするのか
- 可変長レコードをページ内でどう管理するのか
- buffer poolはOS page cacheと何が違うのか

## 扱う内容

- storage hierarchy、sector、page/block、extentの関係
- heap file、slotted page、record ID、free space management
- row-oriented storageとcolumn-oriented storage
- buffer frame、pin/unpin、dirty page、replacement policy
- sequential I/Oとrandom I/O、read-ahead
- OS page cache、Direct I/O、fsyncとの境界
- page checksum、compression、table bloatへの入口

## 図解・具体例

- slotted pageのheader、slot array、record領域
- cache miss時にページがストレージからbuffer poolへ入る流れ
- 行更新後、dirty pageがまだ永続化されていない状態

## 演習・確認課題

固定長・可変長の注文レコードを仮定し、1ページへ何行入るかと、1行の更新で必要になるI/Oを概算する。

## 読了時の到達目標

「1行を読む」という操作をページI/Oとキャッシュの観点から説明できる。
