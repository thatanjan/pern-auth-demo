create database pern_auth;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


create Table users (
  _id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar(255) NOT NULL, 
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL
);

INSERT into users (name, email, password) values ('Anjan', 'as2@gmail.com', '104456') RETURNING _id;

SELECT * FROM users;

DELETE FROM  users;

drop database users;
drop table users;
