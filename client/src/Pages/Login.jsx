import React ,{useState }from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthProvider'


function Login() {
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const {isAuthenticated,setIsAuthenticated , setProfile} = useAuth()
  const navigateTo = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
        toast.error("Please fill all the fields");
        return;
    }

    try {
        const { data } = await axios.post(
            "http://localhost:4000/api/v1/users/login",
            { email, password },
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            }
        );

        setProfile(data?.loggedInUser);

        toast.success(data.msg || "User login successful");
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);  //  Ensure state updates after login
        navigateTo("/");
    } catch (error) {
        toast.error(error?.response?.data?.msg || "Login failed");
    }
  };

  
  
  return (
    <div>  
      <div className=' min-h-screen flex items-center justify-center bg-gray-150'>
        <div className=' w-full  max-w-md bg-white shadow-md rounded-lg p-8'> 
          <form  onSubmit={handleLogin}>
            <Link to={'/'} className='hover:text-blue-500 duration-300  '>
              <div className='font-semibold text-xl items-center text-center'>
                Blog <span className='text-blue-500'>Nexus</span>
              </div >
            </Link>
           
            <h1 className='text-xl font-semibold m-4 float-start'>Login</h1>
           
            <div className="mb-3">
              <input type="email" placeholder='Your your email' value={email}  onChange={(e)=>setEmail(e.target.value)}  className='w-full p-2  border rounded'/>
            </div>
            
            <div className="mb-3"> 
              <input type="password" autoComplete="password"  placeholder='Enter password' value={password}  onChange={(e)=>setPassword(e.target.value)}  className='w-full p-2 border rounded'/>
            </div>
           
            <p className='text-center mb-4'>New User ?{" "} <Link  to="/register" className='text-blue-500 text-italic hover:text-blue-700 duration-300 hover:font-semibold' >Register Now </Link> </p>

            <button type='submit' className='w-full border rounded p-2 bg-blue-600 hover:bg-blue-800 duration-300 text-white '>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login