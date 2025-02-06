import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

function UpdateBlog() {

  const {id } = useParams();
  console.log("id of blog = " , id);
  const navigateTo = useNavigate()

  const [title , setTitle] = useState("")
  const [category , setCategory] = useState("")
  const [about , setAbout] = useState("")
  const [blogImage , setBlogImage] = useState("")
  const [blogImagePrev , setBlogImagePrev] = useState("")

  const changePhotoHandler = (e)=>{
    // console.log(e)
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      // console.log("reader = ", reader)
      setBlogImagePrev(reader.result)
      // console.log("result = ", reader.result)
      // console.log("file =",file)
      setBlogImage(file)
      
    }
    
  }
 
  useEffect( async()=>{
    const fetchMyBlogs =async ()=>{
      try {
        
        const {data} = await axios.get(`/api/v1/blogs/view-blog/${id}` ,{withCredential:true})
        console.log(data.blog)

        // setMyBlogs(data.myBlog)
        
          
        console.log("data in update " , data)
        // toast.success("Blog created successfully")
        setTitle(data?.blog?.title)
        setCategory(data?.blog?.category)
        setAbout(data?.blog?.about)
        setBlogImagePrev(data?.blog?.blogImage)
        setBlogImage(data?.blog?.blogImage)
        // setBlogImage(data.blog.blogImage)
        
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
          toast.error("please create after some time ")
        }
        else{
            toast.error( "pat an i")
            // alert("an error occur while requesting  ")
        }
        // inbuilt 
        // toast.error(error.message || "please fill all the field")
      }
    }
    fetchMyBlogs()
  },[id])




  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
        const { data } = await axios.put(`/api/v1/blogs/update-blog/${id}`, formData, {
            withCredentials: true,  
            headers: {
                "Content-Type": "multipart/form-data",  
            },
        });

        // console.log("Update API Response:", data);  

        toast.success("Blog updated successfully");  
        navigateTo('/');

    } catch (error) {
        console.log("Update API Error:", error);  

        if (error.response) {
            toast.error(error.response.data.msg || "Please fill all the fields");
        }
    }
  };





  return (
    <div>
       <div className='min-h-screen py-10 '>
        <div className='max-w-4xl bg-gray-300 mx-auto p-6 border rounded-lg shadow-lg 
          
        '> 
          
          <h4 className='text-lg mb-4'>Update Blog</h4>
          
         
          
          <form action="" onSubmit={handleUpdate}>

            <div className="space-y-2 mb-4">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
              />
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-lg">category</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
              />
            </div>

            <div className="space-y-2 mb-4">
              <label className="block text-lg">Blog Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={blogImagePrev? blogImagePrev:"image.jped"} 
                  alt="Image"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-gray-400   rounded-md outline-none"
              />
            </div>

            <div className='m-4 pb-2 mb-4'>
              <label htmlFor="about" className='text-lg'>About</label>
              <br />
              <textarea name="about"
                id="about"
                className='w-full px-3 py-2  border border-gray-400  rounded-md outline-none'
                rows={5}
                placeholder="Write something about your blog"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>

              
                
            </div>
            <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                Post Blog
            </button>

          </form>
          
          
        </div>

       
      </div>
    </div>
  )
}

export default UpdateBlog