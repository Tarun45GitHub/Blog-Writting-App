import React,{useEffect,useState} from 'react'
import dbservice from '../appwrite/dbconfig'
import { Container } from '../components'
import Postcard from '../components'

function AllPost() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{},[])
    dbservice.getPosts([]).then((posts)=>{
        if(posts) setPosts(posts.documents)
    })
    return (
        <div className='w-full py-8'>
            <Container>
            <div className='flex flex-wrap '>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1' >
                        <Postcard post={post}/>
                    </div>
                ))}
            </div>
            </Container>

        </div>
    )
}

export default AllPost
