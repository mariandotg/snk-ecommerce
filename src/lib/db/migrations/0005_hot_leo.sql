CREATE TABLE `snk_ecommerce_user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	CONSTRAINT `snk_ecommerce_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `snk_ecommerce_users`;--> statement-breakpoint
ALTER TABLE `snk_ecommerce_account` DROP FOREIGN KEY `snk_ecommerce_account_userId_snk_ecommerce_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `snk_ecommerce_session` DROP FOREIGN KEY `snk_ecommerce_session_userId_snk_ecommerce_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `snk_ecommerce_account` ADD CONSTRAINT `snk_ecommerce_account_userId_snk_ecommerce_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `snk_ecommerce_user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `snk_ecommerce_session` ADD CONSTRAINT `snk_ecommerce_session_userId_snk_ecommerce_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `snk_ecommerce_user`(`id`) ON DELETE cascade ON UPDATE no action;