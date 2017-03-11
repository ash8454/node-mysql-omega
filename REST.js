var mysql = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/scenarios",function(req,res){
         var query = "SELECT * From ??";
         var table = ["Scenario"];
         query = mysql.format(query,table);
         connection.query(query,function(err,rows){
             if(err) {
                 res.json({"Error" : true, "Message" : "Error executing MySQL query", "ErrorMessage" : `${err}`});
             } else {
                 res.json({"Error" : false, "Message" : "Success", "Result" : rows});
             }
         });
     });

     router.get("/testcases",function(req,res){
          var query = "SELECT * From ??";
          var table = ["test_case"];
          query = mysql.format(query,table);
          connection.query(query,function(err,rows){
              if(err) {
                  res.json({"Error" : true, "Message" : "Error executing MySQL query", "ErrorMessage" : `${err}`});
              } else {
                  res.json({"Error" : false, "Message" : "Success", "Result" : rows});
              }
          });
      });

     router.get("/:TeamName",function(req,res){
          var query = "SELECT test_case.TestCaseId, Scenario.ScenarioId, test_case.Description, test_case.Status, test_case.RunDate, test_case.RunBy FROM ??  join Scenario ON (Scenario.ScenarioId = test_case.ScenarioId && ?? = ?)";
          var table = ["test_case", "TeamName", req.params.TeamName, "Status", req.params.Status];
          //var table = ["test_case"];
          query = mysql.format(query,table);
          connection.query(query,function(err,rows){
              if(err) {
                  res.json({"Error" : true, "Message" : "Error executing MySQL query", "ErrorMessage" : `${err}`});
              } else {
                  res.json({"Error" : false, "Message" : "Success", "Result" : rows});
              }
          });
      });

    router.get("/:TeamName/:Status",function(req,res){
         var query = "SELECT COUNT(Status) as result FROM ??  join Scenario ON (Scenario.ScenarioId = test_case.ScenarioId && ?? = ? && ?? = ?)";
         var table = ["test_case", "TeamName", req.params.TeamName, "Status", req.params.Status];
         //var table = ["test_case"];
         query = mysql.format(query,table);
         connection.query(query,function(err,rows){
             if(err) {
                 res.json({"Error" : true, "Message" : "Error executing MySQL query", "ErrorMessage" : `${err}`});
             } else {
                 res.json({"Error" : false, "Message" : "Success", "Result" : rows});
             }
         });
     });

}

module.exports = REST_ROUTER;
