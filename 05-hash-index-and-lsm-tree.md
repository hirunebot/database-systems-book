# 05. ハッシュインデックスとLSM-tree

## この章の役割

B+tree以外の代表的なアクセス構造を学び、読み取り・書き込み・範囲検索の要件に応じてストレージ構造が変わることを理解する。

## この章で答える問い

- hash indexはなぜ等価検索に強く、範囲検索に弱いのか
- LSM-treeはランダム書き込みをどのように順次書き込みへ変えるのか
- compactionは何を解決し、どのような負荷を生むのか

## 扱う内容

- hash function、bucket、collision、chaining、open addressing
- static hashingとextendible/linear hashingの概略
- append-only log、memtable、immutable memtable、SSTable
- sorted run、leveled/tiered compaction
- Bloom filterと存在しないキーの探索
- read/write/space amplification
- tombstoneと削除データの回収
- B+tree、hash index、LSM-treeの比較

## 図解・具体例

同じキー集合を3構造へ格納し、等価検索・範囲検索・連続書き込み時に触れるページやファイルを比較する。

## 演習・確認課題

書き込み中心、範囲検索中心、point lookup中心の3ワークロードに対し、構造を選んで理由を説明する。

## 読了時の到達目標

ストレージ構造を「速い・遅い」ではなく、amplificationとワークロードの適合性から比較できる。
