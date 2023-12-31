const assertTypeEqual = require(__dirname + '/assertTypeEqual');

class GetRoomsAdapter
{
    constructor(connect)
    {
        this.connect = connect;
    }

    /**
     * @typedef {{id:number, name:string, create_at: string}} Room 
     * @param {number} user_id 取得したいユーザーID 
     * @returns {Room[]}
     */
    async exec(user_id)
    {
        try {
            assertTypeEqual('number', user_id);
            
            const sql = 'SELECT r.* ' +
                        'FROM room as r ' +
                        'INNER JOIN join_room as j ' +
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