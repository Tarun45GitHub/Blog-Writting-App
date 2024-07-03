import { useState } from "react"
import React from 'react'
import authservice from "../appwrite/auth"
import { Link,useNavigate } from "react-router-dom"
import { login } from "../store/authslice"
import {Button,Input,Logo} from "./index.js"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"

function SignUp() {
    const navigate=useNavigate()
    const [error,setError]=useState()
    const dispatch=useDispatch()
    const {register,handelSubmit}=useForm()

    const create=async(data)=>{
        setError("")
        try {
            const userData=await authservice.createAccount(data)
            if(userData){
                const userData= authservice.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")

            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center" >
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%"></Logo>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'> Sign up to create account</h2> 
                <p className='mt-2 text-center text-base text-black/60 '>
                Already have an account?&nbsp;
                <link to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline" >Sign In</link>
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handelSubmit(create)}>
                    <div className="space-y-5">
                        <input
                        label="Full Name:"
                        placeholder="Enter your Full Name"
                        {...register("FullName",{
                            required:true,
                        })}
                        />

                        <input 
                            label="Email:"
                            placeholder='Enter your email'
                            type='email'
                            {...register("email",{
                                required:true,
                                validate:{
                                    matchPatern: (value)=>/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/.test(value) || "email address must be a valid address",
                                }
                            })}
                        />
                        <input 
                        type="password"
                        label="password"
                        placeholder="Enter Your Password"
                        {...register("password",{
                            required:true,
                        })}
                         />

                         <Button 
                         type="Submit"
                         className="w-full">Create Account</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
