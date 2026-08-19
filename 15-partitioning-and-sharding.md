# 15. パーティショニングとシャーディング

## この章の役割

1ノードへ収まらないデータや負荷を分割する方法と、分割によって新たに生まれるrouting、偏り、再配置の問題を扱う。

## この章で答える問い

- partitioningとshardingはどの文脈で使い分けるのか
- range/hash partitioningは、検索と負荷分散にどう影響するのか
- shardを増減すると、なぜデータ移動が難しくなるのか

## 扱う内容

- horizontal/vertical partitioning
- range、hash、list partitioning
- consistent hashingとvirtual node
- shard keyの条件とco-location
- routing、scatter-gather、distributed query execution
- local/global secondary index
- data skew、hot key、hot partition
- split、merge、rebalancing、resharding
- online migration中のdual read/writeと整合性
- partition pruningとcross-shard join

## 図解・具体例

注文を顧客ID・注文日時のそれぞれで分割した場合の、代表クエリとデータ移動を比較する。

## 演習・確認課題

想定クエリ、成長率、偏りを与えられたシステムに対してshard keyを選び、弱点も記述する。

## 読了時の到達目標

shardingを容量対策だけでなく、routing、再配置、トランザクション境界を含む設計として評価できる。
