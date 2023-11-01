import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, LeftColumn } from "../components";

function index() {
  const isAdmin = false;

  const bgColor = "#f8f9fa";
  const textColor = "#212529";
  const [stopAnimation, setStopAnimation] = useState(false)
  const handleStopAnimation = () => {
    setStopAnimation(!stopAnimation)
  }
  return (
    <>
      <Header />
      <div class="position-fixed bottom-0 end-0 p-3 d-sm-none d-md-block">
        <button onClick={handleStopAnimation} className="btn btn-warning shadow">{stopAnimation ? "Animate!" : "Stop Animation"}</button>
      </div>

      <div className={`main-page h-100 ${stopAnimation ? '' : 'animate'}`}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center my-5">
            {isAdmin && <LeftColumn />}
            <Outlet />
          </div>
        </div>
      </div>
      <Footer bgColor={bgColor} textColor={textColor} />
    </>
  );
}

export default index;
