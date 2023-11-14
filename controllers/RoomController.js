const Controller = require(__dirname + '/Controller');

class RoomController extends Controller
{
    constructor(req, res)
    {
        super(req, res)
    }

    show()
    {
        this.res.render('room', {
            messages: messages,
        });
    }
}
module.exports = RoomController;