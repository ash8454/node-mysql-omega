var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./REST.js");
var app  = express();

const port = process.env.PORT || 3800;

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        // host     : 'localhost',
        // user     : 'root',
        // password : '',
        // database : 'restful_api_demo',
        // debug    :  false
        host     : 'us-cdbr-iron-east-04.cleardb.net',
        port     : '3306',
        user     : 'b6ebb0a0297b9e',
        password : '6b01aea1',
        database : 'heroku_ebfed75d99e67f4',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(port,function(){
          console.log(`All right ! I am alive at Port ${port}.`);
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();
