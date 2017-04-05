const data = require('../store-directory.json');

module.exports = function api(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(data));
  res.end();
};
