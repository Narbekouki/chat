const Controller = require(__dirname + '/Controller');

class RoomController extends Controller
{
    constructor(req, res, getMessagesPort, isJoinRoomPort)
    {
        super(req, res)
        this.getMessagesPort = getMessagesPort;
        this.isJoinRoomPort  = isJoinRoomPort;
    }

    async show()
    {
        const user_id = this.req.session.user_id;

        // ログインしてないとリダイレクト
        if (user_id === undefined) {
            this.res.redirect('/login');
            return;
        }
        const room_id = Number.parseInt(this.req.params.room_id);

        await this.isJoinRoomPort.exec(user_id, room_id)
        .then(is_join_room => {
            if (is_join_room === false) {
                this.redirect('/error');
                return;
            }
        });
        
        await this.getMessagesPort.exec(room_id)
        .then(messages => {
            this.res.render('room', {
                user_id: user_id,
                messages: messages,
            });
        });
    }
}
module.exports = RoomController;