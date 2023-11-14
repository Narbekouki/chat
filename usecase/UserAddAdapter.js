const bcrypt = require('bcrypt');
const assertTypeEqual = require(__dirname + '/assertTypeEqual');

class UserAddAdapter
{
    constructor(connect)
    {
        this.connect = connect;
    }

    /**
     * @param {string} login_id 既に登録されていると追加できない
     * @param {string} password 
     * @param {string} user_name 
     * @returns {number|false} insertId 追加できないときはfalse
     */
    async exec(login_id, password, user_name)
    {
        try {
            const default_icon_path = '';
            assertTypeEqual('string', login_id);
            assertTypeEqual('string', password);
            assertTypeEqual('string', user_name);
            
            const password_hash = bcrypt.hashSync(password, 10);
            
            // ユーザー登録処理
            // login_id は UK なのでthen内でエラーを吐きcatchする
            sql = 'INSERT INTO user ' +
                  '(login_id, password_hash, name, icon_path) ' + 
                  'VALUES (?, ?, ?, ?)';

            stmt = [login_id, password_hash, user_name, default_icon_path];
            return await this.connect.then(async connect => {
                const [results, fields] = await connect.execute(sql, stmt);
                return results.insertId;
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = UserAddAdapter;