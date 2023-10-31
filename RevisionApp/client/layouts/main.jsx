import { Outlet } from 'react-router-dom';
import { Header, Footer, LeftColumn } from '../components';

function index() {
  const bgColor = '#f8f9fa'
  const textColor = '#212529'
  return (
    <>
      <Header/>
      <div className='main-page h-100'>
      <div className='container h-100'>
        <div className='row my-5'>
        <LeftColumn/>
        <Outlet/>
        </div>
      </div>
      </div>
      <Footer bgColor={bgColor} textColor={textColor}/>
    </>
  )
}

export default index
