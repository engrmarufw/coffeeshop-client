import { useState } from 'react'
import { Outlet, ScrollRestoration, useLocation, useNavigation } from 'react-router-dom'
import './App.css'
import Footer from './Components/Shared/Footer'
import Navbar from './Components/Shared/Navbar/Navbar'
function App() {
  const [count, setCount] = useState(0)
  const navigation = useNavigation();
  const location = useLocation();
  const noHeaderFooterL = location.pathname.includes('/login')
  const noHeaderFooterR = location.pathname.includes('/register')
  return (
    <>
      {noHeaderFooterL || noHeaderFooterR || <Navbar></Navbar>}

      <div className='flex items-center justify-center'>
        {navigation.state === "loading" && <span className="loading loading-dots loading-lg h-[30rem]"></span>
        }
      </div>
      <Outlet></Outlet>
      <ScrollRestoration></ScrollRestoration>
      {noHeaderFooterL || noHeaderFooterR || <Footer></Footer>}
    </>
  )
}

export default App
