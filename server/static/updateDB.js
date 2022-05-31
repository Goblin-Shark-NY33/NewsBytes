const Sources = require('../static/categories');


function getSourcesAndCategories(sources) {
  const output = {

  }
  for (let key in sources) {
    const source = sources[key];
    const name = source.name
    output[name] = Object.keys(source.categories)
  }

  return output;
}