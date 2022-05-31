import React from "react";
import axios from 'axios';


// Axios config settings 
const config = {
  headers: {
    Accept: 'application/json',
  },
}
let myUrl = ('http://localhost:8080/api');
const defaultimg = "https://preview.redd.it/97qxyric0i351.jpg?auto=webp&s=4b3dd19e08d67187b9ae8816f7edd6e3d48edcd9";

export default function MainImgCompt(props) {

  const [articles, setArticles] = React.useState(null)
  console.log(articles)

  React.useEffect(() => {
    axios.get(myUrl, config)
      .then((res => {
        // console.log(res.data.data)
        setArticles(res.data.data)

      }))

  }, []);
  // category: "Baseball"
  const htmlIMG = []
  const emptyimgObj = {
    title: null,
    type: "images",
    url: defaultimg,
    width: null,
  }
  if (articles) {
    for (let i = 0; i < articles.length; i++) {
      // console.log('!!!Articles -> ', articles[i])
      //  Setting "carousel-item active" only to array image [0] as we need it only on the first item 
      let carosel = "carousel-item active";
      (i != 0) ? carosel = "carousel-item" : "carousel-item active";
      // Sets default image when image is 
      if (!articles[i].img) {
        articles[i].img = emptyimgObj;
        // console.log('!!!Articles -> ', articles[i])
      }
      htmlIMG.push(
        <div className={carosel}>

          <div className="rssFeed">
            {/* Adding image from htmlImg array */}
            <img src={articles[i].img.url} height="400px" width="200px" className="d-block w-50" alt={defaultimg} />
            {/* Display x out of x sources */}
            <div className="zeroToX">{i} of {articles.length}
              {/* Attatch click event to title div  */}
              <a href={articles[i].link} target="_blank" rel="noreferrer">
                <div className="title">{articles[i].title}</div>
              </a>
              <div className="author">Author: {articles[i].author}</div>
              <div className="description">{articles[i].description}</div>
              {/* Convert date to regular format */}
              <div className="pubDate">Published {articles[i].pubDate.substr(0, articles[i].pubDate.indexOf("2022"))} 2022</div>
            </div>
          </div>
        </div>)
      // break;
    }
  }

  return (
    <div className="container">
      {/* <h1>RSSFeed</h1> */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade d-block w-100" data-bs-ride="carousel">
        <div className="carousel-inner">
          {htmlIMG}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}