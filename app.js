const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const app = express();
const port = 5000;

// 初期設定
require(__dirname + '/settings/bootstrap.js')(app, session);

// ルーティング
require(__dirname + '/settings/route.js')(app);

// サーバー起動
app.listen(port, ()=>{console.log('run')});
