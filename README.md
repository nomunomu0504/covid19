# 福井県公認 新型コロナウイルス感染症対策サイト

<!-- ![](https://github.com/tokyo-metropolitan-gov/covid19/workflows/production%20deploy/badge.svg) -->

[![福井県公認 新型コロナウイルス感染症対策サイト](/static/official_ogp.png)](https://covid19-fukui.com/)

## Slackチャンネルへの参加
このサイトを運営・改善していくためのSlackを開設しています。継続的に改善に参加していただける方は[こちらから登録](https://join.slack.com/t/nomunomu0504/shared_invite/zt-d6ad54zo-VqgGZR2qRtIjIKP04reI0Q)してご参加ください。リポジトリのコラボレーターに招待します。

## ブランチについて
基本的には `nomu_production` と `nomu_development` の２つをベースとして運用を行います。それぞれの扱い方は以下の通りです。

- nomu_development

デフォルトブランチです。複数人が作業を行っているため、ファイルがコンフリクトする可能性があります。そのため `必ず` Slackやissueを使ってコンタクトを取り合いながら進めてください。このブランチに取り込まれた内容は自動的に [https://nomu-development.covid19-fukui.com/](https://nomu-development.covid19-fukui.com/) に反映されます。（反映までに2,3分程かかる可能性があります。packageを変更した場合はinstall処理も走るため数分かかることがあります。お待ちください）

本番ブランチ（nomu_production）に実装したい機能等が完成した場合、直接 `nomu_production` にPRを発行せずに、このブランチ（nomu_development）へPRを発行し動作確認を行ってください。PRが発行されると、追加された機能が`https://deploy-preview-{PR番号}--covid19-fukui.netlify.com`に **`production`として** 展開されます。ローカルで動いてもサーバー上で動かない可能性があります。このブランチへのマージは、オーナー以外のコラボレーターの方が行う可能性もあります。

- nomu_production

本番サイトのブランチです。このブランチへの操作権限は、このリポジトリのオーナーである[@nomunomu0504](https://github.com/nomunomu0504)のみが有しています。nomu_developmentブランチで動作確認が終わったものをPR経由で追加していく形になります。このブランチにプッシュされた内容は自動的に [https://covid19-fukui.com/](https://covid19-fukui.com/) に反映されます。

## ブランチの運用について
ブランチの運用に関しては以下のように定めます。必ず遵守するようお願いします。

- 機能追加やエンハンス系について

feature/{issueNumber}-{branchName} `Ex) feature/52-add_new_cards`

- 緊急のバグ修正等（issueを作る場合）

hotfix/{issueNumber}-{branchName} `Ex) hotfix/55-fix_nuxt_build_error`

- 緊急のバグ修正等（issueを作らない場合）

hotfix/{branchName} `Ex) hotfix/fix_nuxt_build_error`

## 貢献の仕方
上記２つを遵守いただいた上で、issueを作成していただき `nomu_development` へPRを発行してください。

※ nomu_development 以外への Pull Request は禁止です。  

## CONTRIBUTORS.md への追加について
ご協力いただいた皆様のお名前（ハンドルネーム）や役割を記す、[CONTRIBUTORS.md](./CONTRIBUTORS.md) というファイルがあります。 
何かしらの貢献を行った方は、ぜひこちらにもお名前をお載せください。 [#24](https://github.com/nomunomu0504/covid19/issues/24) の Issue をご覧の上、コメントください。

## ライセンス
本ソフトウェアは、[MITライセンス](./LICENSE.txt)の元提供されています。

### 環境構築の手順

- 必要となるNode.jsのバージョン: 10.19.0以上

**yarn を使う場合**
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

**docker compose を使う場合**
```bash
# serve with hot reload at localhost:3000
$ docker-compose up --build
```

**Vagrant を使う場合**
```bash
# serve with hot reload at localhost:3000
$ vagrant up
```

### `Cannot find module ****` と怒られた時

**yarn を使う場合**
```bash
$ yarn install
```

**docker compose を使う場合**
```bash
$ docker-compose run --rm app yarn install
```

### VSCode + Remote Containersで開発する場合

1. VSCodeの拡張機能「[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)」を導入します。
2. [この画像（外部サイト）](https://code.visualstudio.com/docs/remote/containers#_quick-start-try-a-dev-container)のように左下部の「Open Folder in Container」でこのリポジトリのルートを選択すれば環境構築が始まります。

#### Topic
- 設定を変更したい場合は、`.devcontainer/devcontainer.json`を修正してください。
詳細は[devcontainer.jsonのリファレンス](https://code.visualstudio.com/docs/remote/containers#_devcontainerjson-reference)を参照してください。
- Remote Container実行時のみ有効な拡張機能「ESLint」を導入していますが、必要に応じて`devcontainer.json`の`extensions`に追加してください。
詳細な手順は[こちら（外部サイト）](https://code.visualstudio.com/docs/remote/containers#_managing-extensions)を参照してください。
- 開発環境を再構築する場合は、左下部の「Rebuild Container」を実行してください。

### 本番環境/その他の判定
`process.env.GENERATE_ENV` の値が、本番の場合は`'production'`に、それ以外の場合は `'development'` になっています。  
テスト環境のみで実行したい処理がある場合はこちらの値をご利用ください。
