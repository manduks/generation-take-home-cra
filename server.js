const http = require('http');
const serveStaticFiles = require('ecstatic')({ root: `${__dirname}/static` });
const api = require('./lib/http-handle-api');

const port = process.env.PORT || 8000;

http
  .createServer((req, res) => {
    if (req.url.indexOf('/api') === 0) {
      return api(req, res);
    }
    // default: handle the request as a static file
    return serveStaticFiles(req, res);
  })
  .listen(port);

console.log('Listening on http://localhost:%d', port);
