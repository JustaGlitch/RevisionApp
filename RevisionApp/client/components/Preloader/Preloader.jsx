import React from "react";
import preloaderImg from "../../assets/img/preloader.png";

function Loader() {
  return (
    <div className="loader">
      <img src={preloaderImg} />
      <p>Loading</p>
    </div>
  );
}

export default Loader;
