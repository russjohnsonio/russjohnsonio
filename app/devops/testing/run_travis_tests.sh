#!/usr/bin/env bash
cd "$(dirname "$0")"
dir="$(pwd)"
cd $dir

whoami
echo "hello run_tests.sh"



echo "set directory to node application"
cd ../../node_app

echo "install required node modules"

npm install

echo "compile"
tsc


echo "start server"
pm2 start pm2/travis/russjohnsonio.pm2.config.js


echo "list pm2 servers"
pm2 l


mocha