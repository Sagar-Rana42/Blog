import React, {createContext, useContext, useEffect, useState } from 'react'
import axios from "axios"
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
export const AuthContext = createContext()

function AuthProvider({children}) {

    const [blogs , setBlogs]  = useState()  
    const [profile , setProfile]  = useState()  
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));  
    // let [isAuthenticated , setIsAuthenticated] = useState(Cookies.get("token") ? true : false)



    let token = Cookies.get("token"); // Get token from cookies

    useEffect(() => {
        //  Track authentication state dynamically
        const checkAuth = () => {
            const token = Cookies.get("token");
            setIsAuthenticated(!!token);
        };

        checkAuth(); // Run when the component mounts

        const interval = setInterval(checkAuth, 1000); // Check every second (alternative: use a better state trigger)
        
        return () => clearInterval(interval); // Cleanup
    }, []);

    useEffect(()=>{
        const fetchProfile = async()=>{
            try {
                // let token = localStorage.getItem("token"); // Retrieve the token directly from the localStorage (Go to login.jsx)
                // const parsedToken  = token?JSON.parse(token) : undefined
                
                if(isAuthenticated){
                    const decodedToken = jwtDecode(token);
                    // console.log("Decoded Token:", decodedToken);
                }
                // console.log("token = " , token)
                // console.log("parsed token = " , parsedToken)
                // const parsedToken = token ? JSON.parse(token):undefined
                // console.log("parsedToken = ", decodedToken)
               
                if (isAuthenticated) {
                const {data} = await axios.get('/api/v1/users/my-profile')
                // console.log(data)
                setProfile(data)
                // setIsAuthenticated(true)
                }
                
               

               
            } catch (error) {
                if(error.response){
                    console.log(error.response.data.msg)
                }
                else{
                    console.log(error.message)
                }
                
            }
        }

        const fetchBlogs = async()=>{
            try {
                const {data} = await axios.get('/api/v1/blogs/get-all-blog')
               setBlogs(data)

                // console.log(response.data.allBlog[0].about)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogs()
        fetchProfile()
    },[])
    
  return (
        <AuthContext.Provider value={{blogs , profile ,setProfile, isAuthenticated,setIsAuthenticated ,token, }}> {children}
            {/* passing blog as object so we add another curly braces */}
        </AuthContext.Provider>
  )
}
export default AuthProvider

export const useAuth = ()=> useContext(AuthContext)