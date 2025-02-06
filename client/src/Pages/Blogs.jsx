import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'

function Blogs() {
  const {blogs} = useAuth()
  // console.log("data from blog pages = ", blogs)
  return (
    <div>
      <div>
        <h4 className='text-center mt-5 text-2xl'>All blogs</h4>
      </div>
   

      <div className='container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 ' >
          {blogs && blogs.length > 0 ? (
            blogs.slice(0,4).map((element)=>{
              return(
                <Link to={`/view-blog/${element._id}`}  key={element._id} className='mt-2 bg-yellow-100 rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                  <div className='group relative'>
                    <img src={element.blogImage} alt="" className='w-full h-66 object-cover' />
                    <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300'></div>
                    <h2 className='absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300' >{element.title}</h2>
                  </div>
                  <div className='p-6 flex items-center'>
                    <img src={element.adminPhoto} alt="Admin Photo"  className='w-12 h-12 rounded-full border-2 border-yellow-400'/>
                    <div className='ml-4 font-semibold text-gray-700'>
                      <p>{element.adminName}</p>
                      <p className='text-xs text-gray-400'>New</p>
                    </div>
                  </div>
    
                </Link>
              )
            })
          ):(<div></div>)}
        </div>
      </div>
    
  )
}

export default Blogs