-- migrate:up
CREATE TABLE rooms (
  id int primary key,
  restaurant_id int not null,
  host_id int not null,
  image varchar (1000) null,
  date varchar (20) not null,
  time varchar (20) not null,
  max_num int not null,
  age_id int not null DEFAULT 1,
  gender_id int not null DEFAULT 1,
  room_status_id int not null,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down
DROP TABLE rooms

