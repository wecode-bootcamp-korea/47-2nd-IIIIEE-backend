-- migrate:up
CREATE TABLE room_status (
  id int primary key,
  name varchar(10) not null
)

-- migrate:down
DROP TABLE room_status

