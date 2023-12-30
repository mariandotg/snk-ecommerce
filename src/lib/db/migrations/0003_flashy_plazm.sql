CREATE TABLE `snk_ecommerce_account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `snk_ecommerce_account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `snk_ecommerce_session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `snk_ecommerce_session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `snk_ecommerce_verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `snk_ecommerce_verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `snk_ecommerce_users` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `snk_ecommerce_users` DROP INDEX `snk_ecommerce_users_email_unique`;--> statement-breakpoint
ALTER TABLE `snk_ecommerce_users` ADD `name` varchar(255);--> statement-breakpoint
ALTER TABLE `snk_ecommerce_users` ADD `emailVerified` timestamp(3) DEFAULT (now());--> statement-breakpoint
ALTER TABLE `snk_ecommerce_users` ADD `image` varchar(255);--> statement-breakpoint
ALTER TABLE `snk_ecommerce_users` DROP COLUMN `password`;--> statement-breakpoint
ALTER TABLE `snk_ecommerce_account` ADD CONSTRAINT `snk_ecommerce_account_userId_snk_ecommerce_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `snk_ecommerce_users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `snk_ecommerce_session` ADD CONSTRAINT `snk_ecommerce_session_userId_snk_ecommerce_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `snk_ecommerce_users`(`id`) ON DELETE cascade ON UPDATE no action;