import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

function index() {
  const bgColor = '#5db470'
  const textColor = 'white'
  return (
    <>
      <Header/>
        <div className='task-page h-100'>
          <div className='container h-100'>
            <div className='row my-5'>
              <Outlet/>
            </div>
          </div>
        </div>
      <Footer bgColor={bgColor} textColor={textColor}/>
    </>
  )
}

export default index
