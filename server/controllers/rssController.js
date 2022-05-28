const axios = require('axios');
const parser = new require('xml2js').Parser( {explicitArray: false});

const controllers = {};

controllers.getTransformRSS = (req, res, next) => {

  const url = 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml'

  axios.get(url)
    .then((response) => {
      const data = response.data; 
      return parser.parseStringPromise(data);
    })
    .then(data => {
      res.locals.data = normalizeRSSObj(data); 
      next();
    })
    .catch (err => {
      next({
        log: 'Failure in get Middleware',
        status: 500,
        message: {err: err.message}
    })
  })
}

function normalizeRSSObj(data) {
  // navigating thorugh first level of nesting. 
  const rss = data.rss;
  // sorting some of the meta data - may be useful down the road. 
  const metaData = rss.$;
  // channnel has detailed data about this rss feed i.e., publish date, copyright, build date, language, etc... 
  const channel = rss.channel;
  // These are the individucal posts. 
  const items = channel.item.map(post => {
    const newPost = {
      title: post.title,
      link: post.link,
      pubDate: post.pubDate,
      imgURL: post['media:content']?.$?.url || null,
      author: post['dc:creator']
    }
    return newPost
  });

  return items
}



module.exports = controllers;