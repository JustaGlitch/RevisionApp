import React from "react";
import psyduck from '../../assets/img/pagenotfound.gif'
function PageNotFound() {


  return (
    <>
      <h1 className="text-white">Page Not Found</h1>
      <img src={psyduck}/>
    </>
  );
}

export default PageNotFound;
