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
  if (articles) {
    for (let i = 0; i < articles.length; i++) {
      //  Setting "carousel-item active" only to array image [0] as we need it only on the first item 
      let carosel = "carousel-item active";
      (i != 0) ? carosel = "carousel-item" : "carousel-item active";
      if (!articles[i].imgURL) articles[i].imgURL = defaultimg;
      htmlIMG.push(
        <div className={carosel}>
          {/* Display x out of x sources */}
          <div className="zeroToX">{i} of {articles.length}</div>

          {/* Adding image from htmlImg array */}
          <img src={articles[i].imgURL} height="400px" width="200px" className="d-block w-100" alt={defaultimg} />
          {/* Attatch click event to info div  */}
          <a href={articles[i].link} target="_blank" rel="noreferrer">
            <div className="info">
              <div className="title">{articles[i].title}</div>
              <div className="author">Author: {articles[i].author}</div>
              <div className="pubDate">Date: {articles[i].pubDate}</div>
            </div>
          </a>
        </div>)
    }
  }

  return (
    <div className="container">
      <h1>RSSFeed</h1>
      <div id="carouselExampleFade" className="carousel slide carousel-fade d-block w-50" data-bs-ride="carousel">
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