const ExpectTypeError = require(__dirname + '/../error/ExpectTypeError');

function assertTypeEqual(expectType, val)
{
    if (expectType !== typeof val) {
        throw new ExpectTypeError(expectType, val)
    }
}
module.exports = assertTypeEqual;