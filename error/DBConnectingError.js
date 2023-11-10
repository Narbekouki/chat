class DBConnectiongError extends Error
{
    constructor()
    {
        super('db connecting: Error')
    }
}
module.exports = DBConnectiongError;