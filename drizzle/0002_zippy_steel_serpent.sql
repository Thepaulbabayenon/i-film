ALTER TABLE "movie" ADD COLUMN "rank" integer;--> statement-breakpoint
ALTER TABLE "watchLists" ADD COLUMN "isFavorite" boolean DEFAULT false;