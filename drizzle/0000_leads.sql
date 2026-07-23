CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text,
	`country` text,
	`payload` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `leads_kind_created_idx` ON `leads` (`kind`,`created_at`);
--> statement-breakpoint
CREATE INDEX `leads_email_idx` ON `leads` (`email`);
