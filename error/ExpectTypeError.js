class ExpectTypeError extends Error
{
    constructor(expect, val)
    {
        super(`expect was ${expect}, but given ${typeof val}.`)
    }
}
module.exports = ExpectTypeError;