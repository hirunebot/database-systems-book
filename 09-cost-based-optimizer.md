# 09. コストベース最適化

## この章の役割

optimizerが候補計画を比較する仕組みと、推定の誤りから不適切な計画が選ばれる理由を扱う。

## この章で答える問い

- cost-based optimizerは何をコストとしているのか
- cardinality estimationが計画選択の中心になるのはなぜか
- optimizerの判断が外れたとき、どこを観察すればよいのか

## 扱う内容

- rule-based optimizationとcost-based optimization
- table/index statistics、NDV、histogram、most common values
- selectivityとcardinality estimation
- 列間相関、データ偏り、古い統計による推定誤差
- access pathとjoin algorithmの候補生成
- join order探索、動的計画法、探索空間の削減
- I/O、CPU、memory、networkを含むcost model
- prepared statement、plan cache、parameter-sensitive plan
- EXPLAINとEXPLAIN ANALYZEの読み分け

## 図解・具体例

推定行数と実行行数がずれ、nested loopから大量のtable lookupが発生する例を段階的に診断する。

## 演習・確認課題

実行計画から最初に推定が外れた演算子を探し、統計・相関・条件式のどれが原因か仮説を立てる。

## 読了時の到達目標

「optimizerが間違えた」で止まらず、推定値、候補計画、コストの連鎖として説明できる。
