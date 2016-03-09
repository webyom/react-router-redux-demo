#!/usr/bin/env bash

TARGET_PATH=./
SERVER_HOST=root@47.88.18.101

cd $TARGET_PATH && tar -czvf package.tar.gz dist
cd -
scp $TARGET_PATH/package.tar.gz $SERVER_HOST:package.tar.gz
rm $TARGET_PATH/package.tar.gz
ssh -t $SERVER_HOST "tar -xzvf package.tar.gz && rm -rf /var/www/react-demo && cp -R dist /var/www && mv /var/www/dist /var/www/react-demo && rm -R dist package.tar.gz"