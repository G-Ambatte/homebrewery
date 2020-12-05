#!/bin/sh

pkg install -y git nano node npm mongodb36-3.6.20

sysrc mongod-enable=YES
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
