var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

//connect to the function.
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);   
    
});

function runBamazon() {
    
}

//pass in a id and return a product
function getProduct(id) {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, {
            ID: id
        },
        function (err, res) {
            if (err) throw err;
            connection.end();
            return res;
        });    
}

function getProducts() {
    var query = "SELECT * FROM products";
    connection.query(query,
        function (err, res) {
            console.log("getting products");
            return displayProducts(res);
        });
}

// first display all of the items available for sale. Include the ids, names, and prices of products for sale.
function displayProducts(res) {
    console.log(res);
    console.log("ID == Item == Category == Price == Quantity in stock");
    for (var i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].ID + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity); 
        console.log("=")
    }
    itemNumberPrompt();
}
getProducts();


// The second message should ask how many units of the product they would like to buy.
function itemNumberPrompt() {
    inquirer
        .prompt([
        {
            name: "productID",
            type: "input",
            message: "What is the ID number of the product you want to buy?",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of this item do you want to buy?"
        },
        ])
        .then(function (answer) {
            console.log(answer);
            orderRequest(answer['productID'], answer['quantity']);
            
            //get this to show the response and input.
        });
};

//check my quantity vs stock_qaunitity 
//if my quant is more then stock_quanity then run line of error merp.
//else my quant is less then stock quanitity then run function for new product amount and total cost. 


// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
function orderRequest(userProduct_id, user_quantity) {

    var chosenItem = getProduct(userProduct_id);
    if (chosenItem.stock_quantity >= parseInt(user_quantity)) {
        //make new amount 
       var new_quantity = stock_quantity - user_quantity;
       var priceAmount = user_quantity * chosenItem.price;
       var query = "UPDATE products SET ? WHERE ?";

        connection.query(query,
            [
                {
                    stock_quantity: new_quantity
                },
                {
                    id: userProduct_id
                }
            ],
        function (err, res) {
            console.log("you've purchased " + user_quantity + "and totally a lot of money!")
            return displayProducts(res);
        });
    } else {
       console.log("Insufficient quantity! Sorry we dont have that many left");
    }
};  



// };
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// function updateproductquantity() {
// Once the update goes through, show the customer the total cost of their purchase//