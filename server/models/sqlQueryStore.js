module.exports = {
  getUserArticles: "SELECT U.USERNAME AS \"user\", " +
    "I.READFLAG AS \"read\", " +
    "I.LIKEDFLAG AS \"liked\", " +
    "B.ARTICLES_SOURCE AS \"source\", " +
    "B.ARTICLES_TITLE AS \"title\", " +
    "B.ARTICLES_CONTENT AS \"content\" " +
    "FROM PUBLIC.TBL_USERS U " +
    "INNER JOIN PUBLIC.TBL_USER_INPUTS I ON I.USER_ID = U._ID " +
    "INNER JOIN PUBLIC.TBL_ARTICLES B ON B._ID = I._ID " +
    "WHERE I.USER_ID = $1;",
  validateUser: "SELECT _ID AS \"userID\", USERNAME AS \"userName\" FROM PUBLIC.TBL_USERS U WHERE (U.USERNAME = $1 AND U.PASS = $2);",
  createNewUser: "INSERT INTO public.tbl_users(username, pass) VALUES ($1, $2) RETURNING _id;",
  addRSSToDb: "INSERT INTO public.tbl_articles " +
    "(articles_source, articles_title, articles_content, articles_pub_date, articles_img_height, " +
    "articles_img_medium, articles_img_url, articles_img_width, articles_author, articles_category, articles_link) " +
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING _id;",
  addArticleRefsToUsers: "INSERT INTO public.tbl_user_inputs (user_id, article_id, readflag, likedflag) " +
    "VALUES ($1, $2, $3, $4);"
};
