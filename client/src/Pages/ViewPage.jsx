import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

function ViewPage() {
  let { id } = useParams();
  const [singleblog , setSingleBlog] = useState({})

  console.log("id = ",id)
  useEffect( ()=>{
      // console.log("run ho raha hai "
    const fetchMyBlogs =async ()=>{
      try {         
            const {data} = await axios.get(`/api/v1/blogs/view-blog/${id}` ,{withCredential:true})
            console.log("from view page = ", data.blog)
    
            setSingleBlog(data.blog)
            
            
            // console.log("data in update " , data)
            // toast.success("Blog created successfully")   
    } catch (error) {
            if(error.response){
            // backend respond with an error status code 
            // console.log(error.response.data.msg || "errpr response ")
            toast.error(error.response.data.msg || "fail to load blog")
            }
            else if(error.request){
            // request was made but no response received 
            // console.log(error.request)
            // alert("no rersponse from backend ")
            toast.error("please create after some time ")
            }
            else{
                toast.error( "Failed to load ")
                // alert("an error occur while requesting  ")
            }
            // inbuilt 
            // toast.error(error.message || "please fill all the field")
        }
        
    }

    fetchMyBlogs()
  },[id])
    
  return (
    <div className='bg-slate-300 '>
        <div className='flex justify-center ' >
          <h4 className='text-4xl my-2'>{singleblog?.title}</h4>
        </div>
       
        <div className=' flex sm:flex-row flex-col w-full  shadow-lg  justify-center items-center h-auto gap-8 '>
      
          <div className='w-1/2 m-4   ' >
            <img src={singleblog?.blogImage} alt="blog image"  className='rounded-lg mx-8 m-8'/>
          </div>
          <div className='w-1/2 m-4 h-1/3 '>
            <p className='mr-8'>{singleblog?.about}</p>
            <p className='text-xl mt-8 float-right '>Created By :- {" " + singleblog?.adminName}</p>
            {/* <p>Created At }</p> */}
            
          </div>
          
        </div>
    </div>
    
  )
}

export default ViewPage