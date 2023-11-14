const assertTypeEqual = require(__dirname + '/assertTypeEqual');

class GetMessagesAdapter
{
    constructor(connect)
    {
        this.connect = connect;
    }

    /**
     * @typedef {{name: string, icon_path: string}} User
     * @typedef {{id: number, user: User, text: string}} Message
     * @param {number} room_id メッセージを取得したい部屋ID
     * @returns {Promise<Message[]>} 
     */
    async exec(room_id)
    {
        try {
            assertTypeEqual('number', room_id);

            const sql = 'SELECT m.id as id, m.text as text, u.id as user_id, u.name as user_name, u.icon_path as user_icon ' +
                        'FROM message as m ' +
                        'INNER JOIN user as u ' +
                        'ON m.user_id = u.id ' +
                        'WHERE m.room_id = ?';
            const stmt = [room_id];

            return await this.connect.then(async connect => {
                const [results, fields] = await connect.execute(sql, stmt);
                
                const arr = [];
                for (const record of results) {
                    arr.push({
                        id:   record.id,
                        text: record.text,
                        user: {
                            id:        record.user_id,
                            name:      record.user_name,
                            icon_path: record.user_icon,
                        },
                    });
                }
                return arr;
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = GetMessagesAdapter;