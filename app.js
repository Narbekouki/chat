const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
const app = express();
const port = 5000;

// 初期設定
require(__dirname + '/settings/bootstrap.js')(express, app, session);

const mysql_connect = require(__dirname + '/settings/db_connecting.js')(mysql);

// ルーティング
require(__dirname + '/settings/route.js')(app, mysql_connect);

// サーバー起動
app.listen(port, ()=>{
    console.log('success')
});
