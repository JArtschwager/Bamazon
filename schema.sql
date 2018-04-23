-- this is the part that will go into mysql

CREATE DATABASE bamazon

USE bamazon

CREATE TABLE products (
    ID int NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10, 4) NOT NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY (ID)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("halter top", "Women's clothing", "14.50", "25"),
("jeans", "Men's clothing", "80.00", "20"),
("cat nip", "pets", "2.57", "10"),
("Mean girls", "movies", "15.25", "25"),
("Oil Paint", "art supplies", "7.50", "5"),
("Sweater", "Women's clothing", "20.00", "7"),
("T-shirt", "Men's clothing", "20.00", "2"),
("Pull toy", "pets", "5.55", "8"),
("Paint brush", "art supplies", "2.22", "9"),
("picture frame", "home decor", "15.00", "3"),
("coffee table", "home decor", "100.00", "10");