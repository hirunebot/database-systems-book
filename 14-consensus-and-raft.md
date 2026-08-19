# 14. 合意形成とRaft

## この章の役割

ノード障害や通信分断がある環境で、複数ノードが同じ順序の決定へ合意する問題を理解し、Raftの基本動作を追跡する。

## この章で答える問い

- replicationとconsensusは何が違うのか
- leaderはどのように選ばれ、古いleaderの書き込みをどう防ぐのか
- majorityがあれば、どのような障害まで進行できるのか

## 扱う内容

- consensus problemとstate machine replication
- safetyとliveness
- majority quorumと障害許容数
- Raftのfollower/candidate/leader
- term、election timeout、RequestVote
- replicated log、AppendEntries、commit index
- log matching、leader completeness
- leader crash、再選挙、ログ修復
- membership changeとsnapshotの概略
- lease、fencing token、clockへ依存する設計の注意

## 図解・具体例

3ノードクラスタで選挙、ログ複製、leader障害、再選挙を1イベントずつ進めるタイムラインを作る。

## 演習・確認課題

3・5・7ノード構成の障害許容数を求め、通信分断時に書き込みを継続できる側を判定する。

## 読了時の到達目標

Raftを単なるleader electionではなく、複製ログの順序とcommitを合意する仕組みとして説明できる。
