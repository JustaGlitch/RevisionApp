import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

function index() {
  const bgColor = '#385624'
  const textColor = 'white'
  return (
    <>
      <Header/>
        <div id="pnf-containter">
          <Outlet/>
        </div>
      <Footer bgColor={bgColor} textColor={textColor}/>
    </>
  )
}

export default index
