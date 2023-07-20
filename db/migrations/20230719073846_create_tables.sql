-- migrate:up
CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  kakao_id VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(50) NULL,
  nickname VARCHAR(20) NULL, 
	profile_image VARCHAR(1000) NULL,
  email VARCHAR(200) NULL UNIQUE,
  password VARCHAR(1000) NULL,
  phone_number VARCHAR(50) NULL UNIQUE,
  birthdate VARCHAR(50) NULL,
  age_id int NULL DEFAULT 9,
  gender_id int NULL DEFAULT 4,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ages (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  age_range varchar(20) NOT NULL
);

CREATE TABLE genders (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  gender varchar(20) not null
);

CREATE TABLE room_guests (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  room_id int not null,
  user_id int not null,
  unique key (room_id, user_id)
);

CREATE TABLE rooms (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  restaurant_id int not null,
  host_id int not null,
	title varchar(30) NOT NULL,
	content varchar(100) NOT NULL,
  image varchar (1000) null,
  date DATE not null,
  time_id int not null,
  max_num int not null,
  age_id int not null DEFAULT 3,
  gender_id int not null DEFAULT 8,
  room_status_id int not null DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE times (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  hour varchar(10) not null
);

CREATE TABLE room_status (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(10) not null
);

CREATE TABLE host_reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  host_id int not null,
  guest_id int not null,
  room_id int not null,
  content text(100) not null,
  rating decimal(3,1) not null,
  UNIQUE KEY (host_id, guest_id, room_id)
);

CREATE TABLE restaurants (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(50) not null,
  district_id int not null,
  location_x decimal(12,8) not null,
  location_y decimal(12,8) not null,
  type varchar(30) not null,
  rating varchar(10) not null,
  description text(100)
);

CREATE TABLE restaurant_images (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  image varchar(1000) NOT NULL
);

CREATE TABLE restaurant_reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  restaurant_id int not null,
  content varchar(200) not null
);

create table districts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(30) not null
);

CREATE TABLE notifications (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id int not null,
  room_id int not null,
  message_id int not null,
  content text not null,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  content text not null
);

-- migrate:down