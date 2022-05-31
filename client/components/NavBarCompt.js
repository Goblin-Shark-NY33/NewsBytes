import React from "react";


export default function HeaderCompt(props) {

  // React.useEffect(() => { }, []);

  const headerDivLog = <div className="container">
    <div className="d-flex flex-row">
      <div className="col d-flex justify-content-start">
        <h1>News Bytes</h1>
      </div>
      <div className="col d-flex justify-content-end">
        {/* <button className="btn btn-dark m-1"> Sign up</button> */}
        <div className='form-floating p-1'>
          <input
            className='form-control'
            placeholder='Username'
            type='text'
            id='usernme'
            name='usernme'
            required
          />
          <label for='usernme'>Username </label>
        </div>

        <div className='form-floating p-1'>
          <input
            className='form-control'
            placeholder='Password'
            type='password'
            id='password'
            name='password'
            required
          />
          <label>Password </label>
        </div>
        <button className="btn btn-dark m-1" onClick={props.logInHelper}> Log In</button>
      </div>
    </div>
    <hr></hr>
  </div>

  const headerDivON = <div className="container">
    <div className="d-flex flex-row">
      <div className="col d-flex justify-content-start">
        <h1>News Bytes</h1>
      </div>
      <div className="col d-flex justify-content-end">
        {/* <button className="btn btn-dark m-1"> Sign up</button> */}
        <div className='form-floating p-1'>

          <label for='usernme'> Welcome {props.userData.isUser} </label>
        </div>
      </div>
    </div>
    <hr></hr>
  </div>

  // console.log({ verf: props.userData.isloggedOn })
  // let finalVal = props.userData.isloggedOn ? headerDivON : headerDivLog
  return (
    // finalVal
    // headerDivLog
    props.userData.isloggedOn ? headerDivON : headerDivLog
  );
}