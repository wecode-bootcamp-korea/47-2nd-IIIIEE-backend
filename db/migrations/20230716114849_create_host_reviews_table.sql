-- migrate:up
CREATE TABLE host_reviews (
  id int primary key,
  host_id int not null,
  guest_id int not null,
  room_id int not null,
  content text(100) not null,
  rating decimal(3,1) not null,
  UNIQUE KEY (host_id, guest_id, room_id)
)

-- migrate:down
DROP TABLE host_reviews
