const assertTypeEqual = require(__dirname + '/assertTypeEqual');
const bcrypt = require('bcrypt');

class SignInAdapter
{
    constructor(connect)
    {
        this.connect = connect;
    }

    /**
     * 
     * @param {string} login_id 
     * @param {string} password
     * @returns {number|false} ログイン出来ればユーザーID 出来なければfalse
     */
    exec(login_id, password)
    {
        try {
            assertTypeEqual('string', login_id);
            assertTypeEqual('string', password);

            const sql = 'SELECT id, password_hash ' +
                        'FROM user ' +
                        'WHERE login_id = ?';
            
            const stmt = [login_id];
            return this.connect.then(async connect => {
                const [results, fields] = await connect.execute(sql, stmt);

                if (results.length === 0) {
                    return false;
                }

                const  id           = results[0].id;
                const password_hash = results[0].password_hash;

                if (bcrypt.compareSync(password, password_hash)) {
                    return id;
                } else {
                    return false;
                }
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
module.exports = SignInAdapter;