var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost', //mysql 서버의 주소?
  user     : 'nodejs',
  password : '111111',
  database : 'opentutorials'
});
 
connection.connect();
 
connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {console.log(error)};
  console.log(results);
});
 
connection.end();