module.exports = function(app, session) {
    
    // ビューエンジンをEJSに設定
    app.set('view engine', 'ejs');
    app.set('views', __dirname +'/../views')

    // セッション
    app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: false
    }));
};