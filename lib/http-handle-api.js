const data = require('../store-directory.json');
const getQueryParams = require('./get-query-params');

module.exports = function api(req, res) {
  const params = getQueryParams(req.url);
  console.log(params);
  // how many records to fetch
  let limit = parseInt(params.limit, 10) || 10;
  // pagination offset
  const skip = parseInt(params.skip, 10) || 0;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  console.log(limit);
  console.log(skip);
  limit -= 1;
  console.log(data.slice(skip, skip + limit));
  //res.write(JSON.stringify(data.length < skip ? [] : data.slice(skip, skip + limit)));
  res.write(JSON.stringify(data));
  res.end();
};
