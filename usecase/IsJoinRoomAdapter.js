const assertTypeEqual = require(__dirname + '/assertTypeEqual');

class IsJoinRoomAdapter
{
    constructor(connect)
    {
        this.connect = connect;
    }

    /**
     * ユーザーが所属しているか
     * @param {number} user_id 
     * @param {number} room_id 
     * @returns {Promise<boolean>} 所属しているとtrue
     */
    async exec(user_id, room_id)
    {
        try {
            assertTypeEqual('number', user_id);
            assertTypeEqual('number', room_id);

            const sql = 'SELECT * ' +
                        'FROM join_room ' +
                        'WHERE user_id = ? ' +
                        'AND   room_id = ?';
            const stmt = [user_id, room_id];

            return this.connect.then(async connect => {
                const [results, fields] = await connect.execute(sql, stmt);
                return results.length === 1;
            });
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
module.exports = IsJoinRoomAdapter;