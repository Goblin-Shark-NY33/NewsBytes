import React from "react";

export default function HeaderCompt() {
  return (
    <div className="container">
      <div className="d-flex flex-row">
        <div class="col d-flex justify-content-start">
          <h1>News Bytes</h1>
        </div>
        <div class="col d-flex justify-content-end">
          <button className="btn btn-dark m-1"> Sign up</button>
          <button className="btn btn-dark m-1"> Log In</button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}