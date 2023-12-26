CREATE TABLE `snk_ecommerce_users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `snk_ecommerce_users_id` PRIMARY KEY(`id`)
);
