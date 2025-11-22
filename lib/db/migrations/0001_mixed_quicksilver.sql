CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`google_book_id` text,
	`title` text NOT NULL,
	`authors` text,
	`description` text,
	`cover_url` text,
	`isbn` text,
	`status` text DEFAULT 'want_to_read' NOT NULL,
	`rating` integer,
	`read_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
