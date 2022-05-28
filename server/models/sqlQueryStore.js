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
  validateUser: "SELECT _ID AS \"userID\", USERNAME AS \"userName\" FROM PUBLIC.TBL_USERS U WHERE (U.USERNAME = $1 AND U.PASS = $2);"
};
