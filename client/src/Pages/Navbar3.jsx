import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {useAuth} from '../Context/AuthProvider'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

function Navbar3() {

  const { profile , isAuthenticated } = useAuth()
  const navigateTo = useNavigate()
  // console.log("profile from = 3 ", profile?.user)
  const[myBlogs , setMyBlogs] = useState([]);
  const [show , setShow] = useState(false);


    // {isAuthenticated === true? navigateTo('/dashboard') : (toast.error("please login for dashboard"))}
    useEffect(()=>{
        const fetchMyBlogs = async()=>{
            try {
            const {data} = await axios.get(`/api/v1/blogs/get-my-blog/` ,{withCredential:true})
            // console.log(data.myBlog)

            setMyBlogs(data.myBlog)
            } catch (error) {
            console.log("failed to load your data ")
            }
        };
        fetchMyBlogs()
    
    },[])
// console.log("blog from mblog = ", m)

    const handleDelete = async(id)=>{
        await axios.delete(`/api/v1/blogs/delete-blog/${id}` , {withCredentials:true})
        .then((res)=>{

            toast.success(res.data.message || "Blog deleted successfully")
            setMyBlogs((bg)=>bg.filter((blog)=>blog._id !== id))
            navigateTo("/")
        }).catch((err)=>{
            console.log(err)
            if(err.response){
            toast.error(err.response.msg)
            }
            else{
            // console.log(err)
            toast.error("Failed to delete blog")
            }
            
        })
    }
// const viewBlog =()=>{
//   navigateTo(`/view-blog/${myBlogs?.}`)
// }

  const handleLogout = (e) => {
    e.preventDefault();

    axios.get("/api/v1/users/logout", { withCredentials: true })
      .then((response) => {
          toast.success("User logged out successfully");

          Cookies.remove("token");  //  Remove token after logout
          setIsAuthenticated(false);  // Update authentication state
          navigateTo("/");  // ✅ Redirect user
      })
      .catch((error) => {
          if (error.response) {
              toast.error(error?.response?.data?.msg || " failed to logout ");
          }
      });
  };
  return (

    <div>
         {/* desktop view */}
        <nav className='  flex justify-around items-center bg-gray-400 w-full h-20 shadow-lg shadow-gray-500 relative  '>
           
            <Link to='/'>
                <div  className='font-semibold text-xl hover:text-2xl duration-300' >
                    Blog <span className='text-blue-500'>Negus</span>
                </div>
            </Link>
            <div className='text-xl hover:text-blue-500 hover:font-semibold duration-300'>
                <ul className='max-sm:hidden'>
                    <Link to='/create-blog' >Create Blog</Link>
                    
                </ul>
            </div>
            <div>
                <div className='max-sm:hidden'>
                    <img src={profile?.user?.photo} alt="my Photo"  className='w-16 h-16 rounded-full' />
                    <p>{profile?.user?.username}</p>
                </div>
                <div  onClick={()=>setShow(!show)} className='flex justify-end m-8 sm:hidden'>{show ? <IoMdClose size={24}/> : <AiOutlineMenu size={24}/>}</div>
            </div>
            
            
        </nav>

        {/* for mobile view */}
        {show && 
            <div>
            <div className='w-full sm:hidden bg-gray-300   fixed h-full right-0 z-10 shadow-lg '>
              {/* <div className='flex justify-end m-8 bg-red-300'>{show ? <IoMdClose size={24}/> : <AiOutlineMenu size={24}/>}</div> */}
  
              <div className='flex justify-center mt-8  '>
                <ul className=' mt-24 flex flex-col '>
                  {/* <li  className='text-2xl pt-4 hover:font-semibold hover:text-gray-700 duration-300 bg-blue-300 rounded-2xl w-36 h-12 text-center pb-4 m-4 ' ><Link to={'/create-blog'}>Create blog</Link> </li>
                  <li className='text-2xl pt-4 hover:font-semibold hover:text-gray-700 duration-300 bg-green-400 rounded-2xl w-36 h-12 text-center pb-4 m-4' ><Link>Home</Link></li>
                  <li className='text-2xl pt-4 hover:font-semibold hover:text-gray-700 duration-300 bg-red-500 rounded-2xl w-36 h-12 text-center pb-4 m-4' ><Link  >Logout</Link></li>
                   */}

                   <Link to={'/create-blog'} className='text-2xl pt-4 hover:font-semibold hover:text-gray-700 duration-300 bg-blue-400 rounded-2xl w-36 h-12  pb-4 m-4 '><button>Create blog</button></Link>
                   <Link to={'/'} className='text-2xl pt-4 hover:font-semibold hover:text-gray-700 duration-300 bg-green-400 rounded-2xl w-36 h-12 text-center pb-4 m-4'><button>Home</button></Link>
                   <Link onClick={handleLogout} className='text-2xl pt-4 hover:font-semibold hover:text-gray-700 duration-300 bg-red-500 rounded-2xl w-36 h-12 text-center pb-4 m-4'><button>Log out</button></Link>
                   {/* <Link to={'/create-blog'} className='text-2xl pt-4 hover:font-semibold hover:text-gray-700 duration-300 bg-blue-400 rounded-2xl w-36 h-12 text-center pb-4 m-4'><button>Create blog</button></Link> */}
                  
                </ul>
              </div>
  
              
              
            </div>
          </div>
        }
        
        

        <div className='flex justify-center ' >
            <h3 className='mx-8 mt-8 text-2xl '>All Blogs</h3>
        </div>
       
        <div className="  container mx-auto my-12 p-4">
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
                  {myBlogs && myBlogs.length > 0 ? (
                    myBlogs.map((element) => (
                      <Link
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                        key={element._id}
                        to={`/view-blog/${element._id}`}
                        // onClick={viewBlog}
                      >
                        {element?.blogImage && (
                          <img
                            src={element?.blogImage}
                            alt="blogImg"
                            className="w-full h-48 object-cover"
                          />
                        )}
                        <div className="p-4">
                          <span className="text-sm text-gray-600">
                            {element.category}
                          </span>
                          <h4 className="text-xl font-semibold my-2">
                            {element.title}
                          </h4>
                          <div className="flex justify-between mt-4">
                            <Link
        
                              to={`/blog/update/${element._id}`}
                              className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                            >
                              UPDATE
                            </Link>
                            <button
                             onClick={()=>handleDelete(element?._id)}
                              className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                            >
                              DELETE
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-2xl ">
                      You have not posted any blog to see . PLEASE POST SOME BLOG!
                      <br />
                      <br />
                      <Link to='/' className='text-blue-500 font-semibold underline  '>Home</Link>
                    </p>
                  )}
                </div>
        </div>
    </div>
  )
}

export default Navbar3