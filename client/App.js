import React from "react";
import HeaderCompt from "./components/NavBarCompt"
import MainImgCompt from "./components/MainImgCompt"
import CustomNewsCompt from "./components/CustomNewsCompt"


export default function App() {
  const [isloggedOn, setisloggedOn] = React.useState(false);
  const [isUser, setisUser] = React.useState(false);

  React.useEffect(() => {
    console.log({ isloggedOn, isUser })
  }, [isloggedOn]);

  const logInHelper = async function () {


    let username = document.querySelector('#usernme').value;
    let password = document.querySelector('#password').value;
    // console.log(username, password);

    await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.verified) {
          setisloggedOn(data.verified);
          setisUser(data.userName);
        }
      });


  }
  console.log()
  return (
    <div>
      <HeaderCompt logInHelper={logInHelper} userData={{ isloggedOn, isUser }} />
      {/* <h1>Hello World</h1> */}
      <MainImgCompt />
      <CustomNewsCompt isloggedOn={isloggedOn} />

    </div>
  );
}