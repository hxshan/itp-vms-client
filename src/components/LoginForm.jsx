import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';


import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useLogin } from '../hooks/useLogin';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import  {useAuthContext}  from '../hooks/useAuthContext';
import LogError from '../pages/LogError';



const LoginForm = ({ toggleForm , showForm}) => {

    const {user} = useAuthContext()
    const navigate = useNavigate()


    const [openError,setOpenError] = useState(false)

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {login,error,isloading} = useLogin()

    const handleSubmit = async (e)=>{
        
        e.preventDefault();
        console.log("running")

        await login(email,password)
        if(!error){
            setLoginDetails({
                email:"",
                password:""
            })
        }
    }

    useEffect(()=>{
        if(user?.accessToken){
            navigate(`/clientDash/${user?.id}`)
        }else if(error){
            alert(error)
        }
    },[user,error])

    const handleInput =(e)=>{
        const {name,value} = e.target

        if(name === "password"){
            setPassword(value)
        }else if(name === "email"){
            setEmail(value)
        }
    }

    console.log(email)
    console.log(password)



  return (
    //Login
    <div className={` w-[450px] min-h-[450px] h-fit transition-transform duration-500 transform mt-20 ml-20 bg-white border-2 ${showForm ? 'translate-x-0' : 'translate-x-full'} xl:bg-transparent xl:border-none` }>
        <LogError isOpen={openError} Toggle={()=>{setOpenError(!openError)}}/>
        <form >
            <h1 className=" text-4xl text-center">Login</h1>
            

            <div className="w-full h-[50px] my-[30px] mx-0 flex items-center border-2 pr-5">
                <input
                type="email"
                id="email"
                placeholder="E-mail"
                required
                name='email'
                value={email}
                onChange={handleInput}
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
                name='password'
                value={password}
                onChange={handleInput}
                className="w-full h-full bg-transparent outline-none border-2 border-solid border-white border-opacity-10 rounded-[40px] text-base  py-[20px] pr-[45px] pl-[20px]"
                />

                <div>
                    <RiLockPasswordLine className=' text-[1.5rem]'/>
                </div>

                
            </div>

            <div>
                <button
                type="submit"
                id="submitBtn"
                className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-md ring ring-black ring-opacity-10 cursor-pointer text-black font-bold text-base"
                onClick={(e)=>handleSubmit(e)}
                >
                Login
                </button>
            </div>

{/*}
            <div className="text-[14.5px] text-center mt-[20px] mb-[15px] mx-0  ">
                <p>
                Don&apos;t have an account?
                <a
                    href="#"
                    onClick={toggleForm}
                    className="no-underline font-bold hover:underline"
                >
                    Register
                </a>
                </p>
            </div>
  {*/}
        </form>

    </div>
    
  )
}

export default LoginForm