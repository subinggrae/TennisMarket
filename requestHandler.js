const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const main_css = fs.readFileSync('./main.css', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');
const orderlist_css = fs.readFileSync('./orderlist.css', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
  mariadb.query('SELECT * FROM product', function(err, rows) {
    console.log(rows);
  });

  response.writeHead(200, {'Content-Type' : 'text/html'});
  response.write(main_view);
  response.end();
}

function mainCss(response) {
  response.writeHead(200, {'Content-Type' : 'text/css'});
  response.write(main_css);
  response.end();
}

function redRacket(response) {
  fs.readFile('./img/redRacket.png', function(err, data) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(data);
    response.end();
  })
}

function blueRacket(response) {
  fs.readFile('./img/blueRacket.png', function(err, data) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(data);
    response.end();
  })
}

function blackRacket(response) {
  fs.readFile('./img/blackRacket.png', function(err, data) {
    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(data);
    response.end();
  })
}

function order(response, productId) {
  console.log(productId);

  response.writeHead(200, {'Content-Type' : 'text/html'});

  mariadb.query(
    `INSERT INTO orderlist VALUES(${productId}, NOW());`
    , function(err, rows) { 
      console.log(rows);
    });

  response.write('order page');
  response.end();
}

function orderlist(response) {
  response.writeHead(200, {'Content-Type' : 'text/html'});

  mariadb.query('SELECT * FROM orderlist', function(err, rows) {
    response.write(orderlist_view);

    rows.forEach(element => {
      tr = `<tr><td>${element.product_id}</td><td>${new Date(element.order_date).toLocaleDateString()}</td></tr>`;
      console.log(tr);
      response.write(
        tr
      );
    })

    response.write('</table></body></html>');
    response.end();
  });
}

function orderlistCss(response) {
  response.writeHead(200, {'Content-Type' : 'text/css'});
  response.write(orderlist_css);
  response.end();
}

let handle = {};
handle['/'] = main;
handle['/main.css'] = mainCss;
handle['/order'] = order;
handle['/orderlist'] = orderlist;
handle['/orderlist.css'] = orderlistCss;

// image directory
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;