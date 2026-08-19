# 07. 物理実行と演算子

## この章の役割

論理演算が具体的なアルゴリズムへ落とされ、行やバッチが実行エンジンを流れる仕組みを扱う。

## この章で答える問い

- table scanとindex scanは何を実際に読み取るのか
- sortやaggregationがメモリに収まらないと何が起きるのか
- pipeliningとmaterializationにはどのような違いがあるのか

## 扱う内容

- physical planとphysical operator
- sequential/table scan、index scan、index-only scan、bitmap scan
- filter、projection、limit
- in-memory sortとexternal merge sort
- sort aggregationとhash aggregation
- iterator/Volcano model、pipelining、materialization
- row-at-a-timeとvectorized execution
- memory budget、spill、temporary file
- parallel scanとparallel aggregationの概略

## 図解・具体例

同じlogical planに対する複数のphysical planを描き、行数、メモリ量、I/Oによる違いを比較する。

## 演習・確認課題

データ件数とメモリ制限を変えたとき、sortとaggregationがspillする条件を概算する。

## 読了時の到達目標

実行計画の各演算子が、どのデータをどの単位で受け渡すかを説明できる。
