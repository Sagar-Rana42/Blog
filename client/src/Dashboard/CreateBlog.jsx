import React, {useState} from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CreateBlog() {

  const navigateTo = useNavigate();

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
  
  const handleCreateBlog = async(e)=>{
    e.preventDefault();
    const formData = new FormData()
    
    formData.append('title' , title)
    formData.append('category' , category)
    formData.append('about' , about)
    formData.append('blogImage' , blogImage)

    try {
      // reponse ke under data rahega
      const {data} = await axios.post('/api/v1/blogs/create-blog',formData)

      // console.log("response after submitted ",data)
      // console.log("form data ", formData)
      // msg: jo backend me key hoga 
      toast.success(data.msg || "User Created successfully")
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePrev("")
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
          toast.error( error.message)
          // alert("an error occur while requesting  ")
      }
      // inbuilt 
      // toast.error(error.message || "please fill all the field")
    }
  
  }
  const submithandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData()

    formData.append("title",title)
    formData.append("category",category)
    formData.append("about",about)
    formData.append("blogImage",blogImage)

    try {
      const {data} = await axios.post('/api/v1/blogs/create-blog', formData , {
        withCredential:true,
        headers:{
          "Content-type":"multiplart/form-data",
        },
        }
      )
      console.log("data after register" , data)
      toast.success("Blog created successfully")
      setAbout("")
      setTitle("")
      setCategory("")
      setBlogImage("")
      setBlogImagePrev("")
      navigateTo('/')
    } catch (error) {
        console.log(error)
        if(error.response){
          toast.error(error.response.data.msg || "please  filed all the field ")
        }
    }
  };
  return (
    <div >  
      <div className='min-h-screen py-10 '>
        <div className='max-w-4xl bg-gray-300 mx-auto p-6 border rounded-lg shadow-lg 
          
        '> 
          
          <h4 className='text-lg mb-4'>Create Blog</h4>
          
         
          
          <form action="" onSubmit={submithandler}>

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

export default CreateBlog