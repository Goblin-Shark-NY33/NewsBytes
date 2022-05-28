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

  const htmlIMG = []
  // let allImgs = [] // Array we're storing all the images from the server response 

  if (articles) {
    for (let i = 0; i < articles.length; i++) {
      //  Setting "carousel-item active" only to array image [0] as we need it only on the first item 
      let carosel = "carousel-item active";
      // console.log("hi")
      (i != 0) ? carosel = "carousel-item" : "carousel-item active";
      if (!articles[i].imgURL) articles[i].imgURL = defaultimg;
      htmlIMG.push(
        <div className={carosel}>
          <img src={articles[i].imgURL} height="400px" width="200px" className="d-block w-100" alt=".." />
        </div>)
    }
  }


  // URL for axios
  // Axios get request to ggrab et the data we need from the server database

  // .then((res) => {
  //   console.log('Data we received -> ', res.data);
  // })


  // let allImgs = [
  //   "https://rickandmortyapi.com/api/character/avatar/474.jpeg",
  //   "https://rickandmortyapi.com/api/character/avatar/744.jpeg",
  //   "https://preview.redd.it/97qxyric0i351.jpg?auto=webp&s=4b3dd19e08d67187b9ae8816f7edd6e3d48edcd9",
  // ]
  // const htmlIMG = []

  // for (let i = 0; i < allImgs.length; i++) {
  //   // Setting "carousel-item active" only to array image [0] as we need it only on the first item 
  //   let carosel = "carousel-item active";
  //   (i != 0) ? carosel = "carousel-item" : "carousel-item active";
  //   htmlIMG.push(
  //     <div className={carosel}>
  //       <img src={allImgs[i]} height="400pxx" width="1000px" className="d-block w-100" alt=".." />
  //     </div>)
  // }


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