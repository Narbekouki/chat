module.exports = function(express, app, session) {
    
    // ビューエンジンをEJSに設定
    app.set('view engine', 'ejs');
    app.set('views', __dirname +'/../views')

    // セッション
    app.use(session({
        secret: 'secret', // よくわかってない
        resave: false,
        saveUninitialized: false
    }));

    // フォームから受け取れる設定
    app.use(express.urlencoded({extended:true}));
};