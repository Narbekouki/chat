const IndexController = require(__dirname + '/../controllers/IndexController');
/**
 * @param {Express} app
 */
module.exports = function(app) {
    app.get('/', (req, res) => (new IndexController(req, res)).show());
    app.get('/user_registration', (req, res) => {});
    
    app.post('/oauth', )
}