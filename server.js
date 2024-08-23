let http = require('http');

function start(route, handle) {
  function onRequest(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);

    route(url.pathname, handle, response, url.searchParams.get('productId'));
  }
  
  http.createServer(onRequest).listen(8888);
}

exports.start = start;