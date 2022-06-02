import React from 'react';
import axios from 'axios';

const config = {
  headers: {
    Accept: 'application/json',
  },
};
let myUrl = 'http://localhost:8080/api';

export default function customNewsCompt(props) {
  const [articles, setArticles] = React.useState(null);
  // console.log(articles)

  React.useEffect(() => {
    axios.get(myUrl, config).then((res) => {
      // console.log(res.data.data)
      setArticles(res.data.data);
    });
  }, []);

  const htmlIMG = [];
  const emptyimgObj = {
    title: null,
    type: 'images',
    url: 'https://preview.redd.it/97qxyric0i351.jpg?auto=webp&s=4b3dd19e08d67187b9ae8816f7edd6e3d48edcd9',
    width: null,
  };

  const cardArr = [];
  if (articles && props.isloggedOn) {
    for (let i = 0; i < 10; i++) {
      if (!articles[i].img) {
        articles[i].img = emptyimgObj;
        // console.log('!!!Articles -> ', articles[i])
      }

      // cardArr.push(
      //   <div className='card' style={{ width: '100%' }}>
      //     <img src={articles[i].img.url} className='card-img-top' alt='...' />
      //     <div className='card-body'>
      //       <h5 className='card-title'>{articles[i].title}</h5>
      //       <p className='card-text'>{articles[i].description}</p>
      //       <a href={articles[i].link} className='btn btn-primary btn-dark'>
      //         Go to Article
      //       </a>
      //     </div>
      //   </div>
      // );

      cardArr.push(
        // <div>
        <div className='card mb-3'>
          <img src='...' className='card-img-top' alt='...' />
          <div className='card-body'>
            <h5 className='card-title'>Card title</h5>
            <p className='card-text'>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href='#' className='btn btn-primary'>
              Go somewhere
            </a>
          </div>
        </div>
        // HI
        // </div>
      );

      // cardArr.push(<div>Hi</div>)
    }
  }

  console.log('this is Bottom', articles);
  return (
    <div className='wrapperLeft'>
      {/* <div class='card' style={{ width: '18rem' }}>
        <img src='...' class='card-img-top' alt='...' />
        <div class='card-body'>
          <h5 class='card-title'>Card title</h5>
          <p class='card-text'>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href='#' class='btn btn-primary'>
            Go somewhere
          </a>
        </div>
      </div> */}
      {/* <h1>Here</h1> */}
      {/* {cardArr} */}
    </div>
  );
}
