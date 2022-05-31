class Source {
  constructor(name, { url, extension }, categories) {
    this.name = name;
    this.$ = {
      url: url,
      extension: extension || ''
    }
    this.categories = categories
  }

  getQueryURLs(category) {
    if (this.categories[category]) {
      return this.categories[category].map(cat => `${this.$.url}${cat}${this.$.extension}`)
    }
    return false; 
  }
}

// Base url `https://rss.nytimes.com/services/xml/rss/nyt/${category}.xml`
const NYT = {
  Sports: ['Baseball', 'Golf', 'Hockey', 'Soccer', 'Sports', 'Tennis', 'ProFootball', 'ProBasketball', 'CollegeFootball', 'CollegeBasketball', 'Automobiles'],
  World: ['Africa', 'Americas', 'AsiaPacific', 'Europe', 'MiddleEast', 'World'],
  Economy: ['Business', 'Economy', 'SmallBusiness', 'RealEstate', 'YourMoney', 'MediaandAdvertising', 'Dealbook', 'Jobs',],
  Arts_and_Culture: ['ArtandDesign', 'Arts', 'Dance', 'DiningandWine', 'FashionandStyle', 'Movies', 'Music', 'SundayBookReview', 'Theater', 'Television', 'Travel', 'Books'],
  Issuses: ['EnergyEnvironment', 'Politics', 'US', 'Climate', 'Education', 'Health'],
  Popular: ['MostViewed', 'MostShared', 'MostEmailed'], 
  Science_and_Technology: ['PersonalTech', 'Space', 'Science', 'Technology'],
  NY: ['NYRegion',],
  Miscellaneous: ['HomePage', 'Lens',  'Obituaries', 'Sunday-Review', 'TMagazine', 'Upshot', 'Weddings', 'Well',] 
}

// base url http://feeds.feedburner.com/ign/${category} - articles
// http://feeds.feedburner.com/ignfeeds/podcasts/${category} - Podcasts interesting, but probably a stretch right now
const IGN = {
  Science_and_Technology: ['tech-articles'],
  Arts_and_Culture: ['movies-articles'],
  Games: [ 'games-all']
}
 
 // base url https://feeds.a.dj.com/rss/${category}.xml
const WSJ = {
  Economy: ['WSJcomUSBusiness', 'RSSMarketsMain'],
  Science_and_Technology: ['RSSWSJD'],
  World: ['RSSWorldNews'],
  Arts_and_Culture: ['RSSLifestyle'],
  Miscellaneous: [ 'RSSOpinion',]
 }


const NYTSource = new Source('New York Times', { url: 'https://rss.nytimes.com/services/xml/rss/nyt/', extension: '.xml' }, NYT);
const WSJSource = new Source('Wall Street Journal', { url: 'https://feeds.a.dj.com/rss/', extension: '.xml' }, WSJ);
const IGNSource = new Source('IGN', { url: 'http://feeds.feedburner.com/ign/'}, IGN);

module.exports = {
  NYTSource,
  WSJSource,
  IGNSource
}
