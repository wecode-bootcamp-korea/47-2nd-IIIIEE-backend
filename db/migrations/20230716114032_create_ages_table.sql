-- migrate:up
CREATE TABLE ages (
  id int primary key,
  age_range varchar(20) NOT NULL
)

-- migrate:down
DROP TABLE ages