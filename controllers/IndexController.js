const Controller = require(__dirname + '/Controller');

class IndexController extends Controller
{
    show()
    {
        this.res.render('index');
    }
}
module.exports = IndexController;