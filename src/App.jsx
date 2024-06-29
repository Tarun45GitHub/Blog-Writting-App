import { useEffect, useState } from 'react';
import './App.css'
import conf from './config/config.js';
import { useDispatch } from 'react-redux';
import authservice from './appwrite/auth.js';
import {login,logout} from "./store/authslice.js"
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
const[loading,setLoading]=useState(true);
const dispatch=useDispatch();
useEffect(()=>{
  authservice.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
  })
  .finally(()=>setLoading(false))
},[])

return !loading ? (
  <div className='min-h-screen flex flex-wrap  content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
       todo: {/*outlate*/}
      </main>
      <Footer/>
    </div>
  </div>
  ) : null
}

export default App
