const Controller = require(__dirname + '/Controller');
const service_config = require(__dirname + '/../settings/service_config');

class LoginController extends Controller
{
    constructor(req, res, signInPort)
    {
        super(req, res);
        this.signInPort = signInPort;

    }

    show()
    {
        this.res.render('login', {
            service_name: service_config.service_name
        });
    }

    signIn()
    {
        const login_id = this.req.body.login_id;
        const password = this.req.body.password;

        this.signInPort.exec(login_id, password)
        .then(exec => {
   
            if (exec === false) {
                this.res.redirect('/login');
            } else {
                this.req.session.user_id = exec;
                this.res.redirect('/');

            }
        });
    }
}
module.exports = LoginController;