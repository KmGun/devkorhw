// 참고 : 이부분은 추후에 db.template.js라는 파일로 저장되고 (값들은 모두 빠진상태) 버전관리 시스템에 올라간다. 
var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : '111111',
    database : 'opentutorials'
  });
db.connect();
module.exports = db; // 하나의 api만 export할때.
