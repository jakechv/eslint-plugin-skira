const sqlFormatter = require('sql-formatter');

const {'sql/matching-double-quotes', 'sql/formatting'} = require('./sql');

module.exports = {
  rules: {
    'sql/matching-double-quotes',
    'sql/formatting'
  },
};
