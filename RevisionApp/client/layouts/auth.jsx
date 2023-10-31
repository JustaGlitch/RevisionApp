import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

function index() {
  const bgColor = '#5db470'
  const textColor = 'white'
  return (
    <>
      <Header/>
        <div id="main-containter">
          <Outlet/>
        </div>
      <Footer bgColor={bgColor} textColor={textColor}/>
    </>
  )
}

export default index
