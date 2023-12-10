CREATE TABLE `snk_ecommerce_shoeImages` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`shoe_id` int,
	`image_url` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `snk_ecommerce_shoeImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `snk_ecommerce_shoeStock` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`shoe_id` int,
	`size` varchar(10) NOT NULL,
	`stock` int NOT NULL DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `snk_ecommerce_shoeStock_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `snk_ecommerce_shoes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`price` decimal(10,2),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `snk_ecommerce_shoes_id` PRIMARY KEY(`id`)
);
