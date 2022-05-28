-- Working SQL Queries --

-- TABLE MAINTENANCE QUERIES --
alter table public.tbl_user_inputs rename column "likedFlag" To "likedflag";

-- INSERT QUERIES - DATABASE WILL UPDATE _id PRIMARY KEY FIELDS AUTOMATICALLY --
INSERT INTO public.tbl_user_inputs(user_id, article_id, readflag, likedflag) VALUES (2, 2, 1, 1); 

-- SELECT Queries --
select * from public.tbl_users;

select * from public.tbl_articles;

select * from public.tbl_user_inputs;

select * from public.tbl_user_inputs i where i.user_id=1;

-- Pulls ALL user records (swap out the "2" at the end with the user ID) --
SELECT U.USERNAME AS "user",
	I.READFLAG AS "read",
	I.LIKEDFLAG AS "liked",
	B.ARTICLES_SOURCE AS "source",
	B.ARTICLES_TITLE AS "title",
	B.ARTICLES_CONTENT AS "content"
FROM PUBLIC.TBL_USERS U
INNER JOIN PUBLIC.TBL_USER_INPUTS I ON I.USER_ID = U._ID
INNER JOIN PUBLIC.TBL_ARTICLES B ON B._ID = I._ID
WHERE I.USER_ID = 2;