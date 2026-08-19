# 04. B-tree、B+tree、インデックス設計

## この章の役割

RDBで中心的に使われる木構造インデックスを、計算量だけでなくページI/Oとレコード配置の観点から理解する。

## この章で答える問い

- B-treeとB+treeは二分探索木と何が違うのか
- なぜB+treeは範囲検索と順序付き走査に向くのか
- clustered indexとsecondary indexでは、検索後のI/Oがどう違うのか

## 扱う内容

- fan-out、root/internal/leaf node、木の高さ
- search、insert、split、mergeの基本動作
- B-treeとB+treeの構造上の違い
- clustered/primary index、heap-organized table、secondary index
- composite indexとleftmost prefix
- covering index、included column、index-only scan
- partial index、selectivity、重複値とNULL
- write amplificationとページ分割

## 図解・具体例

注文日時と顧客IDの複合インデックスをページ分割しながら構築し、等価検索・範囲検索・並び替えでの利用可否を示す。

## 演習・確認課題

3種類のクエリに対してインデックス候補を設計し、読み取り改善と書き込みコストを比較する。

## 読了時の到達目標

インデックスの有無だけでなく、木の高さ、leaf走査、table lookupの回数からアクセスコストを説明できる。
