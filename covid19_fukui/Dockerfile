# LTSのバージョンを使う
FROM node:12.16.1-slim

# 最新の yarn をインストール
RUN set -eux \
    && apt-get update \
    && apt-get install -qqy curl \
    && curl --compressed -o- -sSL https://yarnpkg.com/install.sh | bash \
    && apt-get remove -y curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# package.json と yarn.lock から node_modules をインストール
WORKDIR /app/covid19_fukui
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile　--non-interfactive

# 全てコピー
COPY . ./

# コンテナの起動時に json_getter.js を起動させる
CMD yarn fetch
