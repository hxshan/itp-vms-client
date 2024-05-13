import React, { useState } from 'react'
import bmw from '../../images/BMW_M5.png'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";


const ClientLogin = () => {

  return (
    <div className=' bg-black w-full h-screen m-0 flex overflow-hidden'>
      <div className='bg-gradient-to-b from-slate-900 via-[#16588E] to-slate-900  w-2/5'>
        <img src={bmw} className='w-[600px] absolute top-20 left-[150px]'/>

      </div>

      <div className="flex-1 bg-white flex justify-end items-center pr-[150px]">
      <div className={` w-[450px] min-h-[450px] h-fit transition-transform duration-500 transform mt-20 ml-20 bg-white border-2  xl:bg-transparent xl:border-none` }>
        <form >
            <h1 className=" text-4xl text-center">Client Login</h1>

            <div className="w-full h-[50px] my-[30px] mx-0 flex items-center border-2 pr-5">
                <input
                type="email"
                id="email"
                placeholder="E-mail"
                required
                className="w-full h-full bg-transparent outline-none border-2 border-solid border-white border-opacity-10 rounded-[40px] text-base py-[20px] pr-[45px] pl-[20px]"
                />
                <div >
                    <MdEmail className=' text-[1.5rem]'/>
                </div>
            </div>

            <div className="w-full h-[50px] my-[30px] mx-0 flex items-center border-2 pr-5 focus:border-black">
                <input
                type="password"
                id="password"
                placeholder="Password"
                required
                className="w-full h-full bg-transparent outline-none border-2 border-solid border-white border-opacity-10 rounded-[40px] text-base  py-[20px] pr-[45px] pl-[20px]"
                />

                <div>
                    <RiLockPasswordLine className=' text-[1.5rem]'/>
                </div>

                
            </div>

            <div className="flex justify-between text-[14.5px] mt-[-15px] mb-[15px] mx-0">
                <label>
                <input
                    type="checkbox"
                    id="password"
                    required
                    className="accent-white mr-[4px]"
                />
                Remember Me
                </label>

                <a href="#" className=" text-white no-underline hover:underline">
                Forgot Password
                </a>
            </div>

            <div>
                <button
                type="submit"
                id="submitBtn"
                className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-md ring ring-black ring-opacity-10 cursor-pointer text-black font-bold text-base"
                >
                Login
                </button>
            </div>

        </form>

    </div>
      </div>
    </div>
  )
}

export default ClientLogin