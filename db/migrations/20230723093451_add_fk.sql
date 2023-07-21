-- migrate:up
ALTER TABLE `host_reviews` ADD FOREIGN KEY (`host_id`) REFERENCES `users`(id);
ALTER TABLE `host_reviews` ADD FOREIGN KEY (`guest_id`) REFERENCES `users`(id);
ALTER TABLE `host_reviews` ADD FOREIGN KEY (`room_id`) REFERENCES `rooms`(id);
ALTER TABLE `rooms` ADD FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(id);
ALTER TABLE `rooms` ADD FOREIGN KEY (`age_id`) REFERENCES `ages`(id);
ALTER TABLE `rooms` ADD FOREIGN KEY (`gender_id`) REFERENCES `genders`(id);
ALTER TABLE `rooms` ADD FOREIGN KEY (`host_id`) REFERENCES `users`(id);
ALTER TABLE `rooms` ADD FOREIGN KEY (`time_id`) REFERENCES `times`(id);
ALTER TABLE `restaurants` ADD FOREIGN KEY (`district_id`) REFERENCES `districts`(id);
ALTER TABLE `restaurant_reviews` ADD FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(id);
ALTER TABLE `users` ADD FOREIGN KEY (`age_id`) REFERENCES `ages`(id);
ALTER TABLE `users` ADD FOREIGN KEY (`gender_id`) REFERENCES `genders`(id);
ALTER TABLE `notifications` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(id);
ALTER TABLE `notifications` ADD FOREIGN KEY (`room_id`) REFERENCES `rooms`(id);
ALTER TABLE `notifications` ADD FOREIGN KEY (`message_id`) REFERENCES `messages`(id);
ALTER TABLE `restaurant_images` ADD FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants`(id);


-- migrate:down