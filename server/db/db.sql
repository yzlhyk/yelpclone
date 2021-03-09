 -- Create database CREATE DATABASE database_name;

-- \c yelp -- change to yelp database

-- \d products -- list the product table 


CREATE TABLE products (
   id INT,
   name VARCHAR(50),
   price INT,
   on_sale boolean
);

ALTER TABLE products ADD COLUMN featured boolean;


CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >= 1 and price_range <=5)
);

INSERT INTO restaurants (name, location, price_range) values ('zambo', 'mel', 3);
INSERT INTO restaurants (name, location, price_range) values ('Wendys', 'miami', 4);
INSERT INTO restaurants (name, location, price_range) values ('Nao', 'Perth', 5);


CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) values (3, 'mike', 'kinda ok', 2);
INSERT INTO reviews (restaurant_id, name, review, rating) values (3, 'june', 'kinda 2', 2);
INSERT INTO reviews (restaurant_id, name, review, rating) values (3, 'jone', 'kinda 3', 3);
INSERT INTO reviews (restaurant_id, name, review, rating) values (3, 'Bob', 'kinda 4', 4);

ALTER TABLE reviews ADD restaurant_id 

INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;

SELECT * FROM restaurants INNER JOIN reviews on restaurants.id = reviews.restaurant_id;

SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurant_id = reviews.restaurant_id WHERE id=2;

SELECT * FROM restaurants INNER JOIN reviews on restaurants.id = reviews.restaurant_id;