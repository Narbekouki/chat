const DBConnectingError = require(__dirname + '/../error/DBConnectingError');

module.exports = function(mysql) {
    const db_config = require(__dirname + '/db_config');
    const connection = mysql.createConnection({
        host:     db_config.host,
        user:     db_config.user,
        password: db_config.password,
        database: db_config.db_name
    });

    return connection;
};