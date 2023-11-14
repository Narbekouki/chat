const assertTypeEqual = require(__dirname + '/assertTypeEqual');

class GetRoomsAdapter
{
    constructor(connect)
    {
        this.connect = connect;
    }

    async exec(user_id)
    {

        try {
            assertTypeEqual('number', user_id);
            
            const sql = 'SELECT r.* ' +
                        'FROM room as r ' +
                        'INNER JOIN joined_room as j ' +
                        'ON r.id = j.room_id ' + 
                        'WHERE j.user_id = ?';
            const stmt = [user_id];
            
            return await this.connect.then(async connect => {
                const [results, fields] = await connect.execute(sql, stmt);
                return results;
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
module.exports = GetRoomsAdapter;