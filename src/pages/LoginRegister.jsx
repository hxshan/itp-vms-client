import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useState } from 'react'
import bmw from '../../images/BMW_M5.png'

const LoginRegister = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showingForm, setShowingForm] = useState(true)

  const toggleForm = () => {
    setShowingForm(false); 

    setTimeout(() => {
      setShowLogin((prevState) => !prevState);
      setShowingForm(true);
    }, 500); 

  };

  return (
    <div className=' bg-black w-full h-screen m-0 flex overflow-hidden'>
      <div className='bg-gradient-to-b from-slate-900 via-[#16588E] to-slate-900  w-2/5'>
        <img src={bmw} className='w-[600px] absolute top-20 left-[150px]'/>

      </div>

      <div className="flex-1 bg-white flex justify-end items-center pr-[150px]">
        {showLogin ? (
            <LoginForm toggleForm={toggleForm} showForm={showingForm}/>
          ) : (
            <RegisterForm toggleForm={toggleForm} showForm={showingForm} />
          )}
      </div>
    </div>
  )
};

export default LoginRegister;