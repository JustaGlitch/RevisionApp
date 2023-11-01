import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

function index() {
  const bgColor = '#00c444'
  const textColor = 'white'
  return (
    <>
      <Header/>
        <div id="account-page" className="h-100">
        <div className="container h-100 mt-5">
          <div className='row h-75 align-items-center justify-content-center'>
            <Outlet/>
          </div>
        </div>
        </div>
      <Footer bgColor={bgColor} textColor={textColor}/>
    </>
  )
}

export default index
