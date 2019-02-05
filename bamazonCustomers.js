var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

var db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

db.connect(function (err) {
  if (err) throw err;

  console.log("connected as id: ", db.threadId);
  itemForSale();
});

function itemForSale() {

  let queryDB = "SELECT * FROM products";

  db.query(queryDB, function (err, result) {
    if (err) throw err;

    console.table(result);

  })
  setTimeout(function(){purchase()}, 1000);
};

function purchase() {
  inquirer
    .prompt([{
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
      var queryDB = "SELECT * FROM products WHERE item_id = ?";

      db.query(queryDB, ans.item, function (err, result) {

        
        if (!result.length) {
          
          console.log("\r\n");
          console.log("Sorry this item is not available, please select another item.");
          purchase();
          
        } else if (ans.units > result[0].stock_quantity) {
          
          console.log("\r\n Sorry, we do not have that amount.  Please try again \r\n");
          
        } else {
          let updateDB = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
          let newDbAmount = result[0].stock_quantity - ans.units;
          
          db.query(updateDB, [newDbAmount, ans.item], function (err, res) {
            console.log("\r\n Thank you for purchase.  Come again soon.\r\n");
            console.table(result);
            db.end();
          })
        }
      })
    })
};