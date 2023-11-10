const DBConnectiongError = require(__dirname + '/../error/DBConnectiongError');

module.exports = function(mysql) {
    const db_config = require(__dirname + '/db_config');
    const connection = mysql.createConnection({
        host:     db_config.host,
        user:     db_config.user,
        password: db_config.password,
        database: db_config.db_name
    });

    connection.connect((err) => {
        if (err) {
            console.log('error connecting: ' + err.stack);
            throw new DBConnectiongError();
        }
        console.log('db connecting: success');
    });
    return connection;
};