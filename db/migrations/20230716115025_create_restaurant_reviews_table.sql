-- migrate:up
CREATE TABLE restaurant_reviews (
  id int primary key,
  restaurant_id int not null,
  content varchar(200) not null
)

-- migrate:down
DROP TABLE restaurant_reviews