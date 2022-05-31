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
  addSource: "INSERT INTO public.tbl_sources (sources_name) VALUES ($1);",
  addCategory: "INSERT INTO public.tbl_categories (sources_id, categories_name) VALUES ($1);",
  getCategorties: "SELECT a.sources_name AS \"source\", b.categories_name AS \"categories\" FROM PUBLIC.TBL_SOURCES a INNER JOIN PUBLIC.TBL_CATEGORIES b on B.SOURCES_ID = A._ID;"
};
