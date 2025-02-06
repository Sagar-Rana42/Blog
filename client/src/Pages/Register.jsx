import React ,{useState }from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../Context/AuthProvider'

function Register() {
  const {setIsAuthenticated } = useAuth()

  const [username , setUsername] = useState("")
  const [email , setEmail] = useState("")
  const [phone , setPhone] = useState("")
  const [password , setPassword] = useState("")
  const [photo , setPhoto] = useState("")
  const [photoPrev , setPhotoPrev] = useState("")

  const changePhotoHandler = (e)=>{
    // console.log(e)
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      // console.log("reader = ", reader)
      setPhotoPrev(reader.result)
      // console.log("result = ", reader.result)
      // console.log("file =",file)
      setPhoto(file)
      
    }
    
  }

  const handleRegister = async(e)=>{
    e.preventDefault();
    const formData = new FormData()
    
    formData.append('username' , username)
    formData.append('email' , email)
    formData.append('phone' , phone)
    formData.append('password' , password)
    formData.append('photo' , photo)

    try {
      // reponse ke under data rahega
      const {data} = await axios.post('http://localhost:4000/api/v1/users/register',formData)

      // console.log("response after submitted ",data)
      // console.log("form data ", formData)
      // msg: jo backend me key hoga 
      toast.success(data.msg || "User registered successfully")
      setEmail("");
      setUsername("");
      setPhone("");
      setPassword("");
      setPhoto("");
      setPhotoPrev("");
    } catch (error) {
      if(error.response){
        // backend respond with an error status code 
        // console.log(error.response.data.msg || "errpr response ")
        toast.error(error.response.data.msg)
      }
      else if(error.request){
        // request was made but no response received 
        // console.log(error.request)
        // alert("no rersponse from backend ")
        toast.error("please register after some time ")
      }
      else{
          toast.error( error.message)
          // alert("an error occur while requesting  ")
      }
      // inbuilt 
      // toast.error(error.message || "please fill all the field")
    }
  
  }
  
  
  return (
    <div>  
      <div className=' min-h-screen flex items-center justify-center bg-gray-150'>
        <div className=' w-full  max-w-md bg-white shadow-md rounded-lg p-8'> 
          <form  onSubmit={handleRegister}>
            <div className='flex justify-center m-4'>
              <Link to={'/'} className='font-semibold hover:scale-110 hover:shadow-lg shadow-gray-500 duration-300 text-xl items-center text-center'>
                Blog <span className='text-blue-500'>Nexus</span>
              </Link >
            </div>
            <h1 className='text-xl font-semibold m-4 float-start'>Register</h1>
            <div className="mb-3">
              <input type="text" placeholder='Enter username'required  value={username} onChange={(e)=>setUsername(e.target.value)} className='w-full p-2  border rounded'/>
            </div>
            <div className="mb-3">
              <input type="email" placeholder='Your your email' required value={email}  onChange={(e)=>setEmail(e.target.value)}  className='w-full p-2  border rounded'/>
            </div>
            <div className="mb-3">
              <input type="phone" placeholder='Enter your phone Number'required value={phone}  onChange={(e)=>setPhone(e.target.value)}  className='w-full p-2  border rounded'/>
            </div> 
            <div className="mb-3"> 
              <input type="password" autoComplete="password" required placeholder='Enter password' value={password}  onChange={(e)=>setPassword(e.target.value)}  className='w-full p-2 border rounded'/>
            </div>
            <div className='flex items-center mb-4'>
              <div className='photo w-20 h-20 mr-4 '>
                  <img src={photoPrev?`${photoPrev}`:"photo"} alt="photo"  />
              </div>
              <input type="file" required  onChange={changePhotoHandler} className='w-full p-2 border rounded-md'/>
            </div>
            <p className='text-center mb-4'>Already register?{" "} <Link to="/login" className='text-blue-500 text-italic'> Login now</Link> </p>

            <button type='submit' className='w-full border rounded p-2 bg-blue-600 hover:bg-blue-800 duration-300 text-white '>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register