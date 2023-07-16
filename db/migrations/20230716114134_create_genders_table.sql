-- migrate:up
CREATE TABLE genders (
  id int primary key,
  gender varchar(20) not null
)

-- migrate:down
DROP TABLE genders