create schema ccca;

-- Creation of item table
CREATE TABLE IF NOT EXISTS ccca.items (
  id SERIAL,
  description varchar(250) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  heigth DECIMAL(10,2) NOT NULL,
  width DECIMAL(10,2) NOT NULL,
  depth DECIMAL(10,2) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

-- Creation of coupon table
CREATE TABLE IF NOT EXISTS ccca.coupons (
  id SERIAL,
  code varchar(250) NOT NULL,
  discount DECIMAL(10,2) NOT NULL,
  expiration_date DATE NOT NULL,
  PRIMARY KEY (id)
);

CREATE SEQUENCE ccca.orders_code_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

-- Creation of order table
CREATE TABLE IF NOT EXISTS ccca.orders (
  id SERIAL,
  cpf varchar(250) NOT NULL,
  coupon_id INT,
  code varchar(250) NOT NULL,
  date DATE,
  PRIMARY KEY (id),
  FOREIGN KEY (coupon_id) REFERENCES ccca.coupons(id)
);

-- Creation of order_item table
CREATE TABLE IF NOT EXISTS ccca.order_items (
  id SERIAL,
  order_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES ccca.orders(id),
  FOREIGN KEY (item_id) REFERENCES ccca.items(id)
);

insert into ccca.items (id, description, price, heigth, width, depth, weight) values (1, 'Notebook', 1000.00, 20.00, 20.00, 3.00, 1.00);
insert into ccca.items (id, description, price, heigth, width, depth, weight) values (2, 'Monitor', 200.00, 30.00, 40.00, 5.00, 2.50);
insert into ccca.items (id, description, price, heigth, width, depth, weight) values (3, 'Mouse', 40.00, 10.00, 5.00, 2.00, 0.03);

insert into ccca.coupons (id, code, discount, expiration_date) values (1, 'DESCONTO10', 0.10, CURRENT_DATE + INTERVAL '1 day');
insert into ccca.coupons (id, code, discount, expiration_date) values (2, 'DESCONTO102020', 0.10, '2020-12-31');
