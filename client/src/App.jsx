import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Blogs from '../src/Pages/Blogs'
import About from  '../src/Pages/About'
import Contact from '../src/Pages/Contact'
import Login from '../src/Pages/Login'
import Register from '../src/Pages/Register'
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import CreateBlog from './Dashboard/CreateBlog'
import UpdateBlog from './Dashboard/UpdateBlog'
import ViewPage from './Pages/viewPage'
import { useAuth } from './Context/AuthProvider'
import NotFound from './Pages/NotFound'
import Navbar3 from './Pages/Navbar3'



function App() {
  const location = useLocation()
  const hideNavFooter = ['/login' , '/register' ,'/dashboard'].includes(location.pathname)

  const {isAuthenticated} = useAuth()
  // const navigateTo = useNavigate()
  
  return (
    <>
     

      { !hideNavFooter && <Navbar/>}
    
      <Routes>
        <Route exact path='/' element = {<Home/>}/>
        <Route exact path='/blogs' element = {<Blogs/>}/>
        <Route exact path='/contact' element = {<Contact/>}/>
        <Route exact path='/about' element = {<About/>}/>
        <Route exact path='/login' element = {<Login/>}/>
        {/* <Route exact path='/check' element = {<Nav/>}/> */}
        <Route exact path='/Register' element = {<Register/>}/>
        <Route exact path='/dashboard' element = {isAuthenticated===true?<Navbar3/> : <Navigate to={'/login'}/>}/>
        <Route exact path='/create-blog' element={isAuthenticated === true ?<CreateBlog/> : <Navigate to={'/login'}/>} />

    
        {/* update page route  */}
        <Route exact path='/blog/update/:id' element={ isAuthenticated === true ? <UpdateBlog/> : <Navigate to={'/login'} /> }/>

        {/* view page route */}
        <Route exact path ='/view-blog/:id' element={<ViewPage/>} />
        {/* universal  Route */}
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Toaster />

      { !hideNavFooter && <Footer/>}
      
    </>
  )
}

export default App
