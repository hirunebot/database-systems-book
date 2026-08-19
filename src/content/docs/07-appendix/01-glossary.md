---
title: 付録A. 用語集
description: 本書で使うデータベース・分散システム用語を、相互参照できる短い定義で整理する。
sidebar:
  order: 90
  label: 付録A. 用語集
---

用語は製品・文献によって意味が異なることがあります。ここでは本書での使い方を短く整理します。厳密な条件や実装差は各章を参照してください。

## ストレージとインデックス

| 用語 | 本書での意味 |
| --- | --- |
| block / page | DBMSがI/O、cache、checksumなどを管理する固定サイズの単位。製品によって呼称が異なる |
| record | Logical rowをstorage formatへencodeしたもの。Header、NULL bitmap、version情報などを含み得る |
| heap file | Key順を維持せずrecordをpageへ格納する基本構造。Priority queueのheapとは別 |
| slotted page | Slot arrayから可変長recordのoffsetを参照し、record IDを維持したままpage内再配置できる形式 |
| record ID / TID | Page IDとslot IDなどからphysical recordを指す識別子 |
| extent | 連続pageをまとめたallocation単位 |
| free space map | 空き領域を持つpageを探すための補助構造 |
| Buffer Pool | Storage上のpageをmemory frameへcacheするDBMS内部領域 |
| buffer frame | Buffer Pool内で一つのpageを保持するmemory slot |
| pin | 使用中pageがreplacementされないようframeを固定すること |
| dirty page | Memory上で更新済みだがdata fileへ未flushのpage |
| cache hit / miss | 必要pageがBuffer Poolにある／storageから読む必要がある状態 |
| replacement policy | Buffer Poolが満杯のとき追い出すframeを選ぶ規則。LRU、Clockなど |
| sequential I/O | 近接pageを順に読むI/O |
| random I/O | 離れたpageへ移動しながら読むI/O |
| B-tree | 高fan-outのbalanced search tree。製品名としてB+tree的構造もB-treeと呼ぶ |
| B+tree | Entryをleafへ集め、leafをkey順にlinkした多分探索木 |
| fan-out | 一つのinternal nodeが持つchild数。大きいほど木の高さを抑えられる |
| page split | 満杯nodeを複数pageへ分け、parentへseparatorを追加する処理 |
| clustered index | Table rowのphysical placementと強く結びつくindex。具体的意味は製品差が大きい |
| secondary index | Primary/clustered access path以外の検索経路 |
| composite index | 複数columnを順序付きkeyとして持つindex |
| covering index | Queryに必要なcolumnを含み、table accessを省略できる可能性があるindex |
| index-only scan | Table row本体を読まず、indexとvisibility情報から結果を返すscan |
| partial index | Predicateを満たすrowだけを含むindex |
| hash index | Hash functionでbucketを選び、主にequality lookupを行うindex |
| collision | 異なるkeyが同じhash bucket/slot候補へ対応すること |
| LSM-tree | Memoryのsorted structureとimmutable sorted filesをmergeするwrite-oriented構造 |
| memtable | LSM-treeがnew writeを受けるmemory上のsorted structure |
| SSTable | Key順に並んだimmutable file（Sorted String Table） |
| compaction | 複数SSTable/runをmergeし、version、tombstone、配置を整理する処理 |
| tombstone | Immutable structureでdeleteを表すmarker |
| Bloom filter | 「確実に存在しない」を判定でき、positiveにはfalse positiveを許す確率的集合 |
| read amplification | 一つのlogical readで余分に読むpage/file/byte |
| write amplification | Applicationのlogical writeに対しstorageへ実際に書くbyteの倍率 |
| space amplification | 有効logical dataに対する実storage使用量の倍率 |
| row-oriented | 一rowのcolumnを近くへ配置するstorage形式 |
| column-oriented | 同じcolumnの値をまとめるstorage形式 |

## クエリ処理

| 用語 | 本書での意味 |
| --- | --- |
| parser | SQL textをtoken/grammarで解析してsyntax treeを作る部分 |
| binder / analyzer | Table・column名をcatalogへ結び、型・権限・曖昧さを検査する部分 |
| relational algebra | Selection、projection、joinなどrelationを入出力とするoperator体系 |
| logical plan | 何を計算するかを表すoperator tree |
| physical plan | どのscan/algorithmで計算するかを具体化した実行計画 |
| predicate pushdown | Filterを意味が変わらない範囲でdata source近くへ移す書き換え |
| projection pruning | 後続で不要なcolumnを早い段階で除く書き換え |
| table / sequential scan | Table data pageを順に読むaccess path |
| index scan | Index entryから該当rowへ到達するaccess path |
| bitmap scan | 対象table pageをbitmapへまとめ、page順に読むaccess path |
| physical operator | Scan、sort、join、aggregateなどphysical planの実行単位 |
| Iterator / Volcano model | 親operatorが子へnextを要求してrowをpullする実行model |
| vectorized execution | Rowではなくbatch/vector単位でoperator間を受け渡す実行model |
| pipeline | 中間結果全体を保存せず、生成したrow/batchを次operatorへ渡すこと |
| materialization | 中間結果をmemory/temporary storageへ保存すること |
| pipeline breaker | 全入力などを必要としpipelineを止めるoperator。Sort、hash buildなど |
| spill | Operatorのdataがmemoryを超え、temporary storageへ退避すること |
| external sort | Memory-sized runを作り、storage上でmulti-way mergeするsort |
| hash aggregate | Group keyをhash tableへ置いてaggregate stateを更新する方式 |
| nested loop join | Outer rowごとにinnerをscan/lookupするjoin |
| index nested loop | Inner側index lookupをouter rowごとに行うnested loop |
| hash join | Build sideからhash tableを作り、probe sideのkeyで検索するequi-join |
| sort-merge join | 両入力をjoin key順にし、先頭からmergeするjoin |
| build / probe | Hash joinでhash tableを作る入力／そのtableを検索する入力 |
| semi join | Rightにmatchがあるleft rowを返し、right columnや重複matchを出力しないjoin |
| anti join | Rightにmatchがないleft rowを返すjoin |
| statistics | Optimizerがdata量・分布を推定するためcatalogへ持つ情報 |
| selectivity | Predicateを通るrowの割合 |
| cardinality | Operatorが出力するrow数 |
| NDV | Number of Distinct Values。異なる値の数 |
| histogram | 値域をbucketへ分け、分布を近似するstatistics |
| MCV | Most Common Values。頻出値とfrequency |
| cost model | I/O、CPU、memory、networkなどを比較用costへ換算するmodel |
| join order | 複数relationをどの順序・tree形状でjoinするか |
| EXPLAIN | 推定physical planを表示する機能 |
| EXPLAIN ANALYZE | Queryを実行し、実rows/time/loopsなどをplanへ加える機能 |
| plan cache | Prepared statementなどのplanを再利用するcache |

## トランザクションと並行性

| 用語 | 本書での意味 |
| --- | --- |
| transaction | 複数read/writeを一つのcommit/abort単位として扱うもの |
| ACID | Atomicity、Consistency、Isolation、Durability |
| atomicity | Transactionの変更をall-or-nothingにする性質 |
| consistency（ACID） | Transaction前後で定義された不変条件を守る性質 |
| isolation | Concurrent transactionの相互作用を制御する性質 |
| durability | Commit済み結果を対象failure後も保持する性質 |
| schedule / history | 複数transaction operationの時系列 |
| serializability | 並行実行結果が何らかのserial orderと同等である性質 |
| strict serializability | Serializabilityにreal-time orderを加えた性質 |
| dirty read | 未commit valueを別transactionが読む異常 |
| non-repeatable read | 同一transactionの同じrow再readで値が変わる異常 |
| phantom read | Predicate再実行でmatching row集合が変わる異常 |
| lost update | 同じold valueから計算したwriteで一方の更新が失われる異常 |
| read skew | 複数itemから新旧の混ざった状態を読む異常 |
| write skew | 同じsnapshotを読んだtransactionが別rowを更新し、不変条件を壊す異常 |
| Snapshot Isolation | Consistent snapshotを読み、write-write conflictを防ぐがwrite skewを許し得るisolation |
| shared lock | Read用でほかのshared lockと共存できるlock |
| exclusive lock | Write用でshared/exclusiveと競合するlock |
| intention lock | 下位granularityへlockを取る意図を上位へ記録するlock |
| 2PL | Growing phaseでlockを取得し、shrinking phaseで解放するTwo-Phase Locking |
| strict 2PL | Write lockをcommit/abortまで保持する2PL |
| predicate/range lock | Predicateに該当する現在・将来のrow範囲を保護するlock |
| deadlock | Transactionのwait-for関係がcycleになり誰も進めない状態 |
| MVCC | 複数versionからsnapshotにvisibleなversionを選ぶ並行性制御 |
| visibility | あるsnapshotからrecord versionが見えるかという規則 |
| vacuum / GC | 不要old versionを回収する処理 |
| pessimistic control | 競合を予想し、operation前にlock/resourceを確保する方式 |
| optimistic control | 競合が少ないと仮定し、commit前にversion/依存を検証する方式 |
| SSI | Snapshot間のdangerous dependencyを検出しSerializableを作る方式 |
| serialization failure | Safeなserial orderを作れずtransactionをabortしたerror |

## 障害回復

| 用語 | 本書での意味 |
| --- | --- |
| WAL | Data pageより先にrecovery logを永続化するWrite-Ahead Logging |
| log record | Update、commit、checkpointなどをWALへ記録した単位 |
| LSN | Log Sequence Number。WAL内の位置・順序 |
| page LSN | Pageへ反映済みの最新log位置 |
| redo | Commit済みなど必要な変更をlogから再適用すること |
| undo | 未commit変更を取り消すこと |
| force / no-force | Commit時にdata page本体のflushを要求する／しないpolicy |
| steal / no-steal | 未commit dirty pageをstorageへwriteできる／できないpolicy |
| group commit | 複数transactionのcommitを一度のWAL flushへまとめること |
| checkpoint | Recovery開始を新しくするためactive/dirty stateなどを記録する処理 |
| fuzzy checkpoint | Transactionを止めず、変化中のstateを記録してpageを徐々にflushするcheckpoint |
| ARIES | Analysis、redo、undoでsteal/no-force DBを回復する代表的algorithm |
| CLR | Undo進捗を記録するCompensation Log Record |
| crash recovery | Data/WAL storageが残るprocess/OS crashから戻す処理 |
| media failure | Data file/WAL自体を失う・破損する障害 |
| PITR | Base backupとarchive WALから指定時点へ戻すPoint-in-Time Recovery |
| RPO | 許容できるdata lossの時間・位置 |
| RTO | 許容できるservice復旧時間 |

## 分散データベース

| 用語 | 本書での意味 |
| --- | --- |
| replication | 同じlogical dataのcopyを複数nodeへ維持すること |
| leader / follower | Write順序を決めるnode／leader logを追従するnode |
| synchronous replication | Commit前に指定replicaのackを待つ複製 |
| asynchronous replication | Replica ackを待たずleader local commitを返す複製 |
| replica lag | Leader位置とreplica receive/flush/replay位置の差 |
| linearizability | Operationがrequest-response間の一点で起き、real-time orderを守るように見える性質 |
| eventual consistency | New writeが止まればreplicaが最終的に収束する性質 |
| causal consistency | Happened-before関係のあるoperation順を守る性質 |
| read-after-write | Sessionが自分の完了済みwrite以降を読む保証 |
| monotonic read | 一度読んだversionより古いversionへ戻らない保証 |
| quorum | N replica中R/Wなど一定数のresponse/ackを要求する方式 |
| read repair | Read時にreplica差を見つけ、古いcopyを修復すること |
| anti-entropy | Backgroundでreplica差を比較・修復すること |
| hinted handoff | Down中のtarget replicaに代わり別nodeがwriteを一時保持すること |
| failover | Failure時にstandby/followerをnew primary/leaderへ切り替えること |
| fencing token | Old owner/leaderのlate operationを拒否する単調増加token/epoch |
| split brain | 複数nodeが同時にauthoritative leaderとしてwriteを受ける状態 |
| CAP | Network partition時にlinearizable consistencyとavailabilityを同時に常時満たせないこと |
| PACELC | Partition時のA/Cに加え、通常時のlatency/consistency trade-offを表す考え方 |
| consensus | Failure下で一つのdecision/ordered logへ合意する問題 |
| state machine replication | 同じcommand logをdeterministic state machineへ適用してreplica stateを一致させる方式 |
| Raft term | Leader generationを表す単調増加logical clock |
| Raft commit index | Clusterがcommittedと認識しapply可能なlog prefix位置 |
| majority | floor(N/2)+1 node。異なるmajority同士が必ず交差する |
| partitioning | Logical data setを複数部分へ分割すること |
| sharding | Horizontal partitionを複数nodeへ配置すること |
| shard key | Data placementとrequest routingを決めるkey |
| partition pruning | Predicateから不要partitionを除外すること |
| scatter-gather | 複数shardへrequestをfan-outしresultを集約すること |
| co-location | 関連dataを同じpartition/nodeへ置くこと |
| global secondary index | Base dataとは別partitioningで全shardを横断するindex |
| rebalancing / resharding | Partition ownershipや境界を変更しdataを移動すること |
| hotspot / skew | Data量またはloadが一部partition/keyへ偏ること |

## 分散トランザクションとメッセージ

| 用語 | 本書での意味 |
| --- | --- |
| atomic commit | 複数participantが全員commitまたは全員abortするdecision |
| 2PC | Prepare/voteとcommit/abort decisionの二phaseでatomic commitするprotocol |
| prepared transaction | Coordinator decisionへ従えるようdurable stateとresourceを保持したtransaction |
| in-doubt | Prepared後、最終decisionが不明で待機している状態 |
| Saga | 長いworkflowをlocal transactionとcompensationへ分けるpattern |
| compensation | 既にcommitしたbusiness operationを業務上打ち消す新しいoperation |
| orchestration | Central workflow componentがSaga stepを指揮する方式 |
| choreography | Serviceがevent反応で次stepを進める方式 |
| dual write | 一つのbusiness operationで独立systemへ個別writeすること |
| transactional outbox | Business rowとpublish予定eventを同じlocal transactionへ保存するpattern |
| CDC | DB change logから変更eventを取得するChange Data Capture |
| inbox | Consumerが処理済みevent IDをbusiness updateと同じtransactionへ記録するpattern |
| at-most-once | 0回または1回delivery/processing |
| at-least-once | 最低1回だがduplicateを許すdelivery/processing |
| idempotency | 同じoperationを複数回適用しても業務結果が一つになる性質 |
| idempotency key | Retryを同じlogical operationへ結びつける一意key |
| ambiguous outcome | Timeout等でoperationがcommitしたかclientから不明な状態 |
| Lamport clock | Happened-beforeならtimestamp大小を保つlogical clock |
| vector clock | Nodeごとのcounterでcausal orderとconcurrencyを表すclock |

## アプリケーションと運用

| 用語 | 本書での意味 |
| --- | --- |
| connection pool | DB connectionを再利用し、DBへ流すconcurrencyを制限する仕組み |
| backpressure | 下流capacityを超えるworkをqueue/reject/rate limitで抑えること |
| prepared statement | SQL構造を準備しparameterを後からbindするstatement |
| N+1 query | 一覧1 queryの各rowごとに追加queryを発行するpattern |
| keyset pagination | 最後のsort keyをcursorとして次pageを読むpagination |
| expand-contract | Schemaを追加→移行→旧要素削除の互換段階へ分けるmigration |
| online DDL | Read/write停止を抑えてschema/indexを変更する機能 |
| backfill | 既存rowへnew column/dataを段階的に埋める処理 |
| SLO | Service Level Objective。測定可能な信頼性/latency目標 |
| restore drill | Backupから実際に復元しRTOと整合性を検証する訓練 |
| switchover | Planned maintenanceでprimary/standby roleを安全に交換すること |

用語を一つだけ覚えるのではなく、「どの問題を解き、何を代償にするか」を各章で確認してください。
