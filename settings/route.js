const IndexController            = require(__dirname + '/../controllers/IndexController');
const LoginController            = require(__dirname + '/../controllers/LoginController');
const RoomController             = require(__dirname + '/../controllers/RoomController');
const UserRegistrationController = require(__dirname + '/../controllers/UserRegistrationController');
const SignInAdapter              = require(__dirname + '/../usecase/SignInAdapter');
const UserAddAdapter             = require(__dirname + '/../usecase/UserAddAdapter');
const GetRoomsAdapter            = require(__dirname + '/../usecase/GetRoomsAdapter');
  

/**
 * ルーティングファイル 
 */

module.exports = function(app, connect) {
    app.get('/',                   (req, res) => (new IndexController(req, res, new GetRoomsAdapter(connect))).show());    
    app.get('/auth',               (req, res) => res.redirect('/'));
    app.post('/auth',              (req, res) => (new LoginController(req, res, new SignInAdapter(connect))).signIn());
    app.get('/login',              (req, res) => (new LoginController(req, res, new SignInAdapter(connect))).show());
    app.get('/room/:room_id',      (req, res) => (new RoomController(req, res)).show());
    app.get('/user_registration',  (req, res) => (new UserRegistrationController(req, res, new UserAddAdapter(connect)).show()));
    app.post('/user_registration', (req, res) => (new UserRegistrationController(req, res, new UserAddAdapter(connect))).userAdd());

}