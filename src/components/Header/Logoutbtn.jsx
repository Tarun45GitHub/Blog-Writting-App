import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth.js'
import { logout } from '../../store/authslice.js'

function Logoutbtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authservice.logout()
        .then(()=>{dispatch(logout)})
        .catch(()=>{console.log(error)})
    }
    return (
     <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
    )
}

export default Logoutbtn
