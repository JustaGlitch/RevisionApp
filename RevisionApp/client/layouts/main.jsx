import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer, LeftColumn } from "../components";
import { AuthContext } from "../contexts/AuthContext";

function index() {
  const { userRole } = useContext(AuthContext);
  const isAdmin = userRole === "admin";

  const bgColor = "#f8f9fa";
  const textColor = "#212529";
  const [stopAnimation, setStopAnimation] = useState(false);
  const handleStopAnimation = () => {
    setStopAnimation(!stopAnimation);
  };
  return (
    <>
      <Header />
      <div className="position-fixed bottom-0 end-0 p-3 d-sm-none d-md-block">
        <button
          onClick={handleStopAnimation}
          className="btn btn-warning shadow"
        >
          {stopAnimation ? "Animate!" : "Stop Animation"}
        </button>
      </div>

      <div className={`main-page h-100 ${stopAnimation ? "" : "animate"}`}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center my-5">
            {/* {isAdmin && <LeftColumn />} */}
            <Outlet />
          </div>
        </div>
      </div>
      <Footer bgColor={bgColor} textColor={textColor} />
    </>
  );
}

export default index;
