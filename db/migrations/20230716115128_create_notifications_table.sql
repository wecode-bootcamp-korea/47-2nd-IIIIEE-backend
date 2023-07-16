-- migrate:up
CREATE TABLE notifications (
  id int primary key,
  user_id int not null,
  room_id int not null,
  message_id int not null,
  content text not null,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down
DROP TABLE notifications