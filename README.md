## arxiv_notify

### Function
* arxivから指定したカテゴリの論文をslackbotで通知する

### Requirement
* ワークスペースにbotを作成
* googleアカウントの作成

### Spreadsheet format

| A | B | C |
----|----|----
| name | rsspageurl | channel |

* name: 適当な名前
* rsspageurl: 対象のページurl
* channel: 対象チャンネル名

### Flow
1. Googledriveにスプレッドシートを作成
2. スプレッドシートからスクリプトエディタへ
3. スクリプトにライブラリ追加

| ライブラリ名 | key |
---- | ---- 
| SlackApp | M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO |
| Parser | M1lugvAXKKtUxn_vdAG9JZleS6DrsjUUV |
4. プログラムの実行

## References
* [keyについて](https://qiita.com/fireowl11/items/e703e35073b600528e7c)
* [プログラムについて](https://ncrna.jp/blog/item/333-pubmed-rss-to-slack)
* [slackapi](https://api.slack.com/)