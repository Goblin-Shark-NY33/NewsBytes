const axios = require('axios');
const parser = new require('xml2js').Parser( {explicitArray: false});
const Sources = require('../static/categories');
const controllers = {};

controllers.getTransformRSS = (req, res, next) => {
  // we should probbly use query params here for search and filter. 
  // console.log(req.query.categories);
  // if the cateogry they're searching for doesn't exist we should move on.
  const categories = ['Science_and_Technology', 'World', 'Economy', 'Arts_and_Culture', 'Issuses', 'Popular', 'NY', 'Miscellaneous', 'Games'];
  const combiner = []
  
// First loop through each category they have queried
  categories.forEach(category => {

    // for each category, we will check all available sources for new on that category
    for (const source in Sources) {
      // 'search' - is the current source we're considering
      const search = Sources[source]; 
      // 'Name' is a property of each source, it is the normal spelling for the source
      const name = search.name;
      // query URLs is a function availbe to the Source Class (see ./static/categories.js). This function will take all
      // of the sub-categories in this source and create the apporpriate url for our GET request. 
      const queryURLs = search.getQueryURLs(category);
      // check if this source has the specified category of news, if not ocntinue to next one. This function returns false if there 
      // is no appropriate category for that source. 
      if (!queryURLs) continue; 


      // begin pushing queries into the combiner that will use promise.all to concurrently (I think) process the get requests. 
      combiner.push(...queryURLs.map(url => {
        // make a get reuquest to the source for all relevant news
        return axios.get(url)
          .then(xmlRes => {
             // use our parsing library 'https://www.npmjs.com/package/xml2js' to tranform the XLM data into an object representation
            return parser.parseStringPromise(xmlRes.data);
            }
          )
          .then(data => {
            // Use a helper function (see below) to pick out the specifc fields we care about in the object.
            // NOTE: These objects are deeply nested, should add additonal optional chaining to ensure better error handling. 
            return normalizeRSSObj(data, category, name)
          })
          .catch(err => {
            // This is our catch all for any querying errors - by defualt this will return an empty array to avoid errors in the 
            // reducer function below (see promise.all)
            console.log(`Failure in request to ${name} for: ${category} at: ${err.request.path}\n Message: ${err.message}\n Check URL path for error in spelling, spacing.`);
            return [];
          })
      }))
    }
  })

  // Using promise to all to wait for the queries after rapidly firing them off. 
  Promise.all(combiner)
    .then(responses => {
      // each response should be normalized now and will be an array of objects.
      // using a reduce below to combine each of these arrays for delivery to client. 
      res.locals.data = responses.reduce((acc, currArr) => {
        acc.push(...currArr);
        return acc;
      })

      // if the data is empty this would indicate an error in all of the queries or a lack of data. 
      if (!res.locals.data.length) throw new Error('no data was received');
      console.log(`We served ${res.locals.data.length} articles`)
      next();
    })
    .catch(err => {
      // an error at this stage should be unlikely, but would likely come from our intial queries.
        return next({
          log: 'Failure in get Middleware',
          status: 500,
          message: {err: err.message}
      })
    })
}

function normalizeRSSObj(data, category, source) {
  try {
    // navigating thorugh first level of nesting. 
    const rss = data.rss;
    // sorting some of the meta data - may be useful down the road. 
    const metaData = rss.$ || null;
    // channnel has detailed data about this rss feed i.e., publish date, copyright, build date, language, etc... 
    const channel = rss.channel;
    // These are the individucal posts. 
    const items = channel.item.map(post => {
      const newPost = {
        title: post.title || null,
        description: post.description || null,
        link: post.link || null,
        pubDate: post.pubDate || null,
        img: post['media:content']?.$
          || post['media:thumbnail']
          ? {
          ...post['media:thumbnail'].$,
            medium: 'image'
          }
          : {
          url: null,
          width: null,
          height: null,
          medium: null
        },
        author: post['dc:creator'] || null,
        category: category,
        source: source
      }
      return newPost
    });
     
    // console.log(items); 
    return items
  } catch (err) {
    // still figuring out what the best wy to handle errors at this stage is.
    console.log(`Failure in RSS Normalization`)
    return [];
  }
}



module.exports = controllers;