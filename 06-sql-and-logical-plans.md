# 06. SQLから論理実行計画へ

## この章の役割

宣言的なSQLが、意味を保ったまま関係代数と論理実行計画へ変換される過程を理解する。

## この章で答える問い

- SQLは「何を得たいか」しか書かないのに、DBはどう実行方法を決めるのか
- relational algebraはSQLの理解にどう役立つのか
- logical planの書き換えは、なぜ結果を変えずに高速化できるのか

## 扱う内容

- parsing、binding/name resolution、type checking
- selection、projection、join、aggregation、set operation
- SQLのbag semanticsと関係代数のset semanticsの差
- NULLとthree-valued logicが書き換えへ与える影響
- query treeとlogical plan
- predicate pushdown、projection pruning、constant folding
- subqueryのdecorrelationとview展開への入口

## 図解・具体例

顧客別の注文合計を求めるSQLを、構文木、関係代数、書き換え前後のlogical planへ順に変換する。

## 演習・確認課題

SQLを関係代数へ変換し、selectionとprojectionを安全に下へ移動できる位置を示す。

## 読了時の到達目標

SQLの記述順と実行順が一致しない理由を説明し、logical planを読める。
