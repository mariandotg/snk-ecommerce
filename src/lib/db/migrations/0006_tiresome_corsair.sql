ALTER TABLE `snk_ecommerce_account` DROP FOREIGN KEY `snk_ecommerce_account_userId_snk_ecommerce_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `snk_ecommerce_session` DROP FOREIGN KEY `snk_ecommerce_session_userId_snk_ecommerce_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `snk_ecommerce_account` MODIFY COLUMN `userId` int;--> statement-breakpoint
ALTER TABLE `snk_ecommerce_session` MODIFY COLUMN `userId` int;