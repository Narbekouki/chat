const Controller = require(__dirname + '/Controller');
const service_config = require(__dirname + '/../settings/service_config');

class UserRegistrationController extends Controller
{
    constructor(req, res, userAddPort)
    {
        super(req, res);
        this.userAddPort = userAddPort;
    }

    show()
    {
        this.res.render('user_registration', {
            service_name: service_config.service_name
        })
    }

    async userAdd()
    {
        const login_id  = this.req.body.login_id;
        const password  = this.req.body.password;
        const user_name = this.req.body.name;

        this.userAddPort.exec(login_id, password, user_name)
        .then(result => {
            if (result === false) {
                this.res.redirect('/error');
            } else {
                this.req.session.user_id = result;
                this.res.redirect('/');
            }
        });
    }
}
module.exports = UserRegistrationController;