var db = require('./db');
var template = require('./template.js');
var url = require('url');
var qs = require('querystring');
var path = require('path');

exports.home = function(request,response){
    db.query(`SELECT * FROM topic`,function(error,topics){ //줄들을 가져온다.
        db.query(`SELECT * FROM author`,function(error,authors){
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `
            <form action="/author/create_process" method="post">
                <p><input type="text" name="name" placeholder="name"></p>
                <p>
                    <textarea name="profile" placeholder="profile"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form> 
          `,
          `
            ${template.authorTable(authors)}
            <style>
            table{border-collapse:collapse;}
            td{border: 1px black solid;}
            </style>
          `
        );
        response.writeHead(200);
        response.end(html);
        })
      }) 

};

exports.create_process = function(request,response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`INSERT INTO author (name,profile) VALUES(?,?)`,[post.name,post.profile],function(error,result){
          if (error){throw error;}
          response.writeHead(302, {Location: `/author`});
          response.end();
        });
      })
}

exports.update = function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`,function(error,topics){
          db.query(`SELECT * FROM author WHERE id=?;`,[queryData.id],function(error2,author){
            var title = author[0].name;
            var list = template.list(topics);
            var html = template.HTML(title, list,
              `
              <form action="/author/update_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <p><input type="text" name="name" placeholder="name" value="${author[0].name}"></p>
                <p>
                  <textarea name="profile" placeholder="profile">${author[0].profile}</textarea>
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
              ``
            );
            response.writeHead(200);
            response.end(html);
          });
          
        
      });
};

exports.update_process = function(request,response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`UPDATE author SET name=?, profile=? WHERE id=?;`,[post.name,post.profile,post.id],function(error,result){
            if (error){throw error;}
            response.writeHead(302, {Location: `/author`});
            response.end();
          })
      });
}
exports.delete_process = function(request,response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`DELETE FROM author WHERE id = ?;`,[post.id],function(error,result){
            if (error){throw error};
            response.writeHead(302, {Location: `/author`});
            response.end();
          })
      });
};
