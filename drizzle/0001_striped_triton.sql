CREATE TABLE IF NOT EXISTS "userInteractions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"movieId" integer NOT NULL,
	"rating" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userInteractions" ADD CONSTRAINT "userInteractions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userInteractions" ADD CONSTRAINT "userInteractions_movieId_movie_id_fk" FOREIGN KEY ("movieId") REFERENCES "public"."movie"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
