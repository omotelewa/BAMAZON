
var inquirer = require("inquirer");
var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "bamazon_db"
});

db.connect(function (err) {

  if (err) throw err;
  console.log("connected as id: ", connection.threadId);
  itemForSale();
});


db.connect(function (err) {

  if (err) throw err;
  console.log("connected as id: ", connection.threadId);
  itemForSale();
});

function itemForSale() {
  
  let queryDB = "SELECT * FROM products";

  db.query(queryDB, function (err, result) {
    if(err) throw err;

    console.log(result);

  })
  purchase();
};

function purchase() {
  inquirer
  .prompt([
    {
      name: "item",
      type: "input",
      message: "What item ID would you like to purschase?"
    },
    {
      name: "units",
      type: "input",
      message: "How many units would you like?"
    }
  ])
  .then(function (ans) {
    var queryDB = "SELECT * FROM product WHERE item_id = ?";
    
  db.query(querydb, ans.item, function (err, result) {
    if (!result.length) {
      
      console.log("\r\n");
      console.log("Sorry this item is not available, please select another item.");
      purchase();

    }
        else{
          if(ans.unit > result[0])
          }
        }
  })
  })
}