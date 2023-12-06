CREATE DATABASE IF NOT EXISTS `fractaldb`;

USE `fractaldb`;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_num VARCHAR(50) NOT NULL,
    createdAT DATE NOT NULL,
    final_price DECIMAL(10, 2) NOT NULL,
    status ENUM('Pending', 'InProgress', 'Completed') NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    qty INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    qty INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


SELECT * FROM orders;
SELECT * FROM order_details;
SELECT * FROM products;
