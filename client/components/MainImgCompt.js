import React from "react";

export default function MainImgCompt(props) {

  let allImgs = [
    "https://rickandmortyapi.com/api/character/avatar/474.jpeg",
    "https://rickandmortyapi.com/api/character/avatar/744.jpeg",
  ]
  const htmlIMG = []
  for (let img of allImgs) {

    htmlIMG.push(
      <div className="carousel-item">
        <img src={img} height="400pxx" width="1000px" className="d-block w-100" alt=".." />
      </div>)

  }

  return (
    <div className="container">
      <h1>RSS Feed</h1>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://preview.redd.it/97qxyric0i351.jpg?auto=webp&s=4b3dd19e08d67187b9ae8816f7edd6e3d48edcd9"
              height="400pxx" width="1000px" className="d-block w-100" alt=".." />
          </div>
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