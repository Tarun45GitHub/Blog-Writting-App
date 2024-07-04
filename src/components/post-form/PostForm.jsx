import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { appendErrors, useForm } from 'react-hook-form'
import {Button,Input,select,RTE, Select} from '../index.js'
import dbservice from '../../appwrite/dbconfig.js'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.slug || "",
            content:post ?.content||"",
            status: post ?.status || "active",
        }
    })
    const navigate=useNavigate()
    const userData=useSelector(state=>state.user.userData)
    const submit = async (data)=>{
        if(post){
            const file=data.image[0] ? dbservice.uploadfile(data.image[0]) :null
            if(file){
                dbservice.deletefile(post.featuredImage)
            }
            const dbpost=await dbservice.updatePost(post.$id,{...data,featuredImage:file ? file.$id :undefined})
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }else{
            const file=await dbservice.uploadfile(data.image[0])
            if(file){
                const field=file.$id
                data.featuredImage=field
                const dbpost =await dbservice.createPost({...data,userId:userData.$id})
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }
        }
    }
    const slugTransform=useCallback((value)=>{
        if(value && typeof value ==='string'){
           return value.trim()
           .toLocaleLowerCase()
           .replace(/^[a-zA-Z\d\s]+/g,'-')
        }
        return ""
    },[])
    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true}))
            }
        })
        return()=>{
            subscription.unsubscribe()
        }

    },[watch,slugTransform,setValue])
    return (
       <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
        <div className='w-2/3 px-2'>
            <input 
            label="Title:"
            placeholder='Title'
            className='mb-4'
            {...register("title",{required:true})}
            />
            <input
            label="Slug:"
            placeholder='Slug'
            className='mb-4'
            {...register("slug",{required :true})}
            onInput={(e)=>{
                setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true});
            }}
            />
            <RTE label="Content:" name="content"
            control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
            label="featured Image :"
            type="file"
            className="mb-4"
            accept="image/png,image/jpg,image,jpge,image/gif"
            {...register("image",{required:!post})}
            />
            {post && (
                <div className='w-full mb-4'>
                    <img src={dbservice.getFilePreview(post.featuredImage)}
                     alt={post.title}
                     className='rounded-lg'/>
                </div>
            )}
            <Select
            options={["active","inactive"]}
            label="status"
            className="mb-4"
            {...register("status",{required:true})}
            />
            <Button type='submit' bgColor={post?"bg-green-500":undefined}
            className='w-full'>
                {post ? "update" : "submit"}
            </Button>
        </div>
       </form>
    )
}

export default PostForm
