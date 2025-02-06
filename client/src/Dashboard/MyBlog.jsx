import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function MyBlog() {

  const[myBlogs , setMyBlogs] = useState([]);
  const navigateTo = useNavigate();
  
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
  

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
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
            <p className="text-center text-gray-500">
              You have not posted any blog to see!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBlog