#!/bin/sh

pkg install -y git nano node npm mongodb44-4.4.1

sysrc mongod_enable=YES
service mongod start

export NODE_ENV="local"
export PORT=8001

cd /
git clone https://github.com/naturalcrit/homebrewery.git

cd homebrewery
npm install
npm audit fix -force
npm run postinstall
npm start
