const Controller = require(__dirname + '/Controller');

class IndexController extends Controller
{
    constructor(req, res, getRoomsPort)
    {
        super(req, res);
        this.getRoomsPort = getRoomsPort;
    }

    show()
    {
        const user_id = this.req.session.user_id;
        // const user_id = 96

        // ログインしてないとリダイレクト
        if (user_id === undefined) {
            this.res.redirect('/login');
            return;
        }
        
        this.getRoomsPort.exec(user_id)
        .then(rooms => {
            this.res.render('index', {
                rooms: rooms
            });
        });
    }
}
module.exports = IndexController;