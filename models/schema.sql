DROP DATABASE IF EXISTS blockPartyDb;
CREATE DATABASE blockPartyDb;

CREATE TABLE "blockParty"
(
    'id' int AUTO_INCREMENT,
    'post_title' varchar(30) NOT NULL,
    'message' varchar(250) NOT NULL,
    'category' varchar(30) NOT NULL,
    'userName' varchar(30) NOT NULL,
    'created_at' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ('id')
);