import React, { useState } from 'react'
import { useAuth } from '../Context/AuthProvider'
import {Link, useParams} from "react-router-dom"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Trending() {
  const {id} = useParams()
  const {blogs} = useAuth();
  const [value , setValue] = useState(0);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className='container mx-auto '>
      <h2 className='text-2xl font-semibold mb-4'>Trending</h2>
      <Carousel  responsive={responsive}  >

        
        {blogs && blogs.length > 0 ? (
          blogs.slice(0,6).map((element)=>{
            return(
              <div  className='grid mx-4'>

                <Link to={`/view-blog/${element._id}`} key={element._id} className= ' bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                  <div className='group relative'>
                    <img src={element.blogImage} alt="image of blog " className='w-full h-56 object-cover ' />
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
              </div>
            )
          })
        ):(<div></div>)}
      </Carousel>
    </div>
    
    // <div>hero</div>
    
  )
}

export default Trending