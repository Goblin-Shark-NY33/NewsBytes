-- TO USE, UNCOMMENT, MODE BACK TO PROJECT ROOT FOLDER and RUN BELOW COMMAND --
-- psql -d postgres://bonmdflq:yTHOliRDDsBIgEc94mXJmzFJVk_NV3Ua@fanny.db.elephantsql.com/bonmdflq -f newsbytes_postgres_create.sql --

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;


-- CREATE TABLE public.tbl_users (
--   "_id" serial,
--   "user" varchar NOT NULL UNIQUE,
--   "pass" varchar NOT NULL,
-- 	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
-- ) WITH (
--   OIDS=FALSE
-- );

-- CREATE TABLE public.tbl_articles (
--   "_id" serial,
--   "articles_source" varchar NOT NULL,
--   "articles_title" varchar NOT NULL,
--   "articles_content" varchar NOT NULL,
--   CONSTRAINT "articles_pk" PRIMARY KEY ("_id")
-- ) WITH (
--   OIDS=FALSE
-- );

-- CREATE TABLE public.tbl_user_inputs (
--   "_id" serial,
--   "user_id" bigint NOT NULL,
--   "article_id" bigint NOT NULL,
--   "readFlag" int NOT NULL,
--   "likedFlag" int NOT NULL,
--   CONSTRAINT "user_inputs_pk" PRIMARY KEY ("_id"),
--   CONSTRAINT "readVal" CHECK ("readFlag" >= 0 AND "readFlag" < 2 AND "likedFlag" >= 0 AND "likedFlag" < 2)
-- ) WITH (
--   OIDS=FALSE
-- );

-- ALTER TABLE public.tbl_user_inputs ADD CONSTRAINT "user_input_fk0" FOREIGN KEY ("user_id") REFERENCES public.tbl_users("_id");
-- ALTER TABLE public.tbl_user_inputs ADD CONSTRAINT "user_input_fk1" FOREIGN KEY ("article_id") REFERENCES public.tbl_articles("_id");

