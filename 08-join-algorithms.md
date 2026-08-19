# 08. 結合アルゴリズム

## この章の役割

同じ論理joinを実現する代表的なアルゴリズムを比較し、入力サイズ、インデックス、メモリ、順序が選択へ与える影響を理解する。

## この章で答える問い

- nested loop joinはいつ有効で、いつ極端に遅くなるのか
- hash joinのbuild側を小さくする必要があるのはなぜか
- sort-merge joinは、どのような入力で有利になるのか

## 扱う内容

- simple/block/index nested loop join
- hash joinのbuild/probe、partitioning、spill
- sort-merge joinのsortとmerge
- equi-join、range join、非等価条件による制約
- inner/outer/semi/anti joinと実装上の注意
- 入力の大小、既存の順序、利用可能なインデックスによる選択
- join orderが中間結果の大きさへ与える影響

## 図解・具体例

顧客と注文の結合を3アルゴリズムで実行し、ページアクセスと中間データの流れを並べて示す。

## 演習・確認課題

テーブル件数、選択率、メモリ、インデックス有無が異なる複数ケースでjoin方式を選ぶ。

## 読了時の到達目標

実行計画で選ばれたjoin方式を、入力特性とコストから説明できる。
