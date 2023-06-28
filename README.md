# 概要

都道府県別の総人口推移グラフを表示する SPA です

## 環境構築

1. ルートディレクトリで以下のコマンドを実行してください。

```bash
# npm
npm install

# yarn
yarn install
```

2. https://opendata.resas-portal.go.jp/form.html で利用登録を行い、API キーを取得してください。

3. 取得した API キーを使って、ルートディレクトリに`.env`ファイルを以下の内容で作成してください。

```
NUXT_PUBLIC_KEY=作成したAPIキー
```

## 開発環境での動作確認

ルートディレクトリで以下のコマンドを実行し、 `http://localhost:3000`から動作を確認できます:

```bash
# npm
npm run dev

# yarn
yarn dev
```

## E2Eテストの実行方法

1. テスト用にプロジェクトをビルドするため、ルートディレクトリで以下のコマンドを実行してください。

```
TEST=true yarn run nuxt build
```

2. ルートディレクトリで以下のコマンドを実行することでテストを実行できます。

```
yarn run playwright test
```