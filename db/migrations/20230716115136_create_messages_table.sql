-- migrate:up
CREATE TABLE messages (
  id int primary key,
  content text not null
)

-- migrate:down
DROP TABLE messages