function route(pathname, handle, response, productId) {
  console.log('pathname: ' + pathname + ', productId: ' + productId);

  if (typeof(handle[pathname]) == 'function') {
    handle[pathname](response, productId);
  } else {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.write('This is not a page.');
    response.end();
  }
}

exports.route = route;