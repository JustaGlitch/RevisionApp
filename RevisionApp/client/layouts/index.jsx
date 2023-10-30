import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

function index() {
  return (
    <>
      <Header/>
        <div id="main-containter">
          <Outlet/>
        </div>
      <Footer/>
    </>
  )
}

export default index
