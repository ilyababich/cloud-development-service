create extension if not exists "uuid-ossp";

--Create table products
create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer
);

--Create table stocks
create table stocks (
	product_id uuid not null primary key,
	count integer
);

--Connect tables by id column 
alter table products add column stocks_product_id uuid references stocks(product_id);


--Insert data into products table
insert into products (title, description, price) values ('Product1','Some description',100);
insert into products (title, description, price) values ('Product2','Some description',150);
insert into products (title, description, price) values ('Product3','Some description',200);
insert into products (title, description, price) values ('Product4','Some description',250);
insert into products (title, description, price) values ('Product5','Some description',300);
insert into products (title, description, price) values ('Product6','Some description',350);
insert into products (title, description, price) values ('Product7','Some description',400);
insert into products (title, description, price) values ('Product8','Some description',450);
insert into products (title, description, price) values ('Product9','Some description',500);
insert into products (title, description, price) values ('Product10','Some description',550);

--Insert data into stocks table
insert into stocks (product_id, count) values ('f7fa737a-6e3b-4328-86c6-0429e0c0bcaa', 4);
insert into stocks (product_id, count) values ('33c2c219-d952-4018-bcfd-55fbeac8aad0', 2);
insert into stocks (product_id, count) values ('8b6792de-8d20-456a-9c05-f5ca61c8008d', 6);
insert into stocks (product_id, count) values ('9cdc73cb-3b38-48e5-ae81-b057f2768624', 1);
insert into stocks (product_id, count) values ('ddd54ac1-c0ef-4992-a786-cf3625ec679a', 10);
insert into stocks (product_id, count) values ('b4ae25d5-0f31-49c9-826a-d5a4a158d7af', 2);
insert into stocks (product_id, count) values ('96b6caf8-19ec-4dd0-840a-62912d0e6dcb', 41);
insert into stocks (product_id, count) values ('9281e761-a23b-40f4-ae8a-1436b898afd0', 32);
insert into stocks (product_id, count) values ('83c45f0a-97e9-4bf5-b71b-a6c02b077b70', 9);
insert into stocks (product_id, count) values ('352c1a83-69c6-4b0c-ab1b-c37e7aee84a6', 11);

--Show products table
select * from products;

