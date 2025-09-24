import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google'
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full h-[45px] mt-4 bg-white border border-gray-300 rounded-[40px] shadow-md ring ring-black ring-opacity-5 cursor-pointer text-black font-medium text-base flex items-center justify-center gap-2"
    >
      <FcGoogle className="text-[1.3rem]" />
      Continue with Google
    </button>
  )
}

export default GoogleLoginButton


