const Controller = require(__dirname + '/Controller');

class AddFriendController extends Controller
{
    constructor(req, res, addFriendPort) {
        super(req, res);
        this.addFriendPort = addFriendPort;
    }

    addFriend()
    {
        const user_id   = this.req.session.user_id;
        const friend_id = this.req.body.friend_id;
        if (friend_id === undefined || friend_id === '') {
            this.res.redirect('/');
        }

        this.addFriendPort.exec(user_id, friend_id);
    }
}
module.exports = AddFriendController;