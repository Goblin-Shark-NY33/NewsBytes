const axios = require('axios');
const parser = new require('xml2js').Parser( {explicitArray: false});

const controllers = {};

controllers.getTransformRSS = (req, res, next) => {

  const combiner = []
  const categories = ['Baseball', 'Technology', 'Tennis']; 
  
  for (const category of categories) {
    const url = `https://rss.nytimes.com/services/xml/rss/nyt/${category}.xml`
    combiner.push(axios.get(url).then(xmlRes => {
      return {
        category: category,
        data: xmlRes
      }
    }))
  }
  
  Promise.all(combiner)
    .then(responses => {
      return Promise.all(responses.map(xml => {
        const data = xml.data;
        const category = xml.category;
        return parser.parseStringPromise(data.data).then(parsed => {
          return {
            category: category,
            data: parsed
          }
        });
      }))
    })
    .then(data => {
      res.locals.data = data.reduce(
        (acc, curr) => {
          acc.push(...normalizeRSSObj(curr.data, curr.category))
          return acc
        }, [])
      
      return next();
    })
    .catch (err => {
        return next({
          log: 'Failure in get Middleware',
          status: 500,
          message: {err: err.message}
      })
    })
  // axios.get(url)
  //   .then((response) => {
  //     const data = response.data; 
  //     return parser.parseStringPromise(data);
  //   })
  //   .then(data => {
  //     res.locals.data = normalizeRSSObj(data); 
  //     return next();
  //   })
  //   
}

function normalizeRSSObj(data, category) {
  console.log(data)
  // navigating thorugh first level of nesting. 
  const rss = data.rss;
  // sorting some of the meta data - may be useful down the road. 
  const metaData = rss.$ || null;
  // channnel has detailed data about this rss feed i.e., publish date, copyright, build date, language, etc... 
  const channel = rss.channel;
  // These are the individucal posts. 
  const items = channel.item.map(post => {
    const newPost = {
      title: post.title,
      link: post.link,
      pubDate: post.pubDate,
      imgURL: post['media:content']?.$?.url || null,
      author: post['dc:creator'],
      category: category
    }
    return newPost
  });

  return items
}



module.exports = controllers;