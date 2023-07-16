-- migrate:up
create table districts (
  id int primary key,
  name varchar(30) not null
)

-- migrate:down
DROP TABLE districts