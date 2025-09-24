import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuthContext'

const OAuthCallback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const userStr = params.get('user')

    if (token) {
      const userPayload = userStr ? JSON.parse(decodeURIComponent(userStr)) : {}
      const user = { ...userPayload, accessToken: token }
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: 'LOGIN', payload: user })
      navigate('/clientDash', { replace: true })
    } else {
      navigate('/clientLogin', { replace: true })
    }
  }, [location.search, dispatch, navigate])

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p>Signing you in...</p>
    </div>
  )
}

export default OAuthCallback


