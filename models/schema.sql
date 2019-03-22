DROP DATABASE IF EXISTS blockPartyDb;
CREATE DATABASE blockPartyDb;

CREATE TABLE angels
(
    id int AUTO_INCREMENT,
    message varchar(250) NOT NULL,
    userName varchar(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE beggars
(
    id int AUTO_INCREMENT,
    message varchar(250) NOT NULL,
    userName varchar(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE nosey
(
    id int AUTO_INCREMENT,
    message varchar(250) NOT NULL,
    userName varchar(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)