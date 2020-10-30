create user pmhcodes@localhost;
create schema pmhcodes;
use pmhcodes;

grant all privileges on pmhcodes.* to pmhcodes@localhost;

create table users (
  username varchar(30) not null,
  password varchar(64) not null,
  salt varchar(8) not null,
  constraint user_pk primary key (username)
);
