-- migrate:up
CREATE TABLE restaurants (
  id int primary key,
  name varchar(50) not null,
  district_id int not null,
  location_x decimal(10,10) not null,
  location_y decimal(10,10) not null,
  type varchar(30) not null,
  image varchar(1000) not null,
  rating varchar(10) not null,
  description text(100)
)

-- migrate:down
DROP TABLE restaurants