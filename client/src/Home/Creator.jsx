import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthProvider'
import axios from 'axios'

function Creator() {

 const [admin , setAdmin] = useState([])
 useEffect(()=>{
    const  fetchCreator = async()=>{
      try {
        const {data} =  await axios.get('/api/v1/users/allCreator')
        // console.log(data)
        setAdmin(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchCreator()
 },[])


 
//  console.log(admin)
  return (
    <div className=' mx-auto p-4 '>
      <h2 className='text-2xl font-semibold mb-5' >Popular creator</h2>
      <div className=' grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5 my-2 '>
        {admin && admin.length > 0 ? (
            admin.slice(0,6).map((element)=>{
              return(
                <div key={element?._id} className='flex mb-2 justify-center '>
                  <div className=' items-center'>
                    <div>
                    <img src={element.photo} alt="image of blog " className='border border-black w-56 h-56 object-cover rounded-full items-center '  />
                    </div>
                    
                    <div className='text-center '>
                      <p>{element.username}</p>
                      <p className='text-gray-600 '> Author</p>
                    </div>
                  </div>
                
                  

                 
                </div>
              )
            })
        ):(<div></div>)}
      </div>
    </div>
  )
}

export default Creator