const matchingDoubleQuotes = require('./matchingDoubleQuotes');
const formatting = require('./formatting');
const sql = x => x;

module.exports = {
    'sql/formatting': formatting,
    'sql/matching-double-quotes': matchingDoubleQuotes,
    sql
};
