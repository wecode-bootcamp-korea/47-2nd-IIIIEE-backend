-- migrate:up
CREATE TABLE room_guests (
  id int primary key,
  room_id int not null,
  user_id int not null,
  unique key (room_id, user_id)
)

-- migrate:down
DROP TABLE room_guests
