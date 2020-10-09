const sqlFormatter = require('sql-formatter');

const {sql, 'sql/matching-double-quotes', 'sql/formatting'} = require('./sql');
const {'promise/independent-promises'} = require('./promise');

module.exports = {
  rules: {
    'sql/matching-double-quotes',
    'sql/formatting',
    'promise/independent-promises',
    'pr'
  },
  sql
};
