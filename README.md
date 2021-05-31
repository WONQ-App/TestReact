# 設定内容

````bash
# Amplify 初期設定
$ amplify init
$ amplify add auth
$ amplify auth update
	管理者：Administrator
	代理店：Agency
	見積もり会社：Estimator
	アフィリエイター：Affiliator
````



# Amplify基本コマンド

````bash
# プロジェクトを操作するIAMユーザーを作成
$ amplify configure

# amplifyに追加
$ amplify add auth
$ amplify add api

# amplifyデプロイ
$ amplify status
$ amplify push
$ amplify auth push

# その他
$ amplify init
$ amplify pull
$ amplify remove api

# env関係
$ amplify env list
$ amplify env add
$ amplify env checkout production
$ amplify env pull
$ amplify env pull --restore
$ amplify env remove production
$ amplify env remove dev


# api関係
$ amplify mock api

# プロジェクトを削除
$ amplify delete
````



# モジュール

````bash
$ yarn add aws-amplify aws-amplify-react @aws-amplify/ui-react
````

