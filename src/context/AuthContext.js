/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable lines-around-comment */
// ** React Imports
import { createContext, useEffect, useMemo, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { logout } from 'src/store/slices/AuthSlice'
import Toast from 'src/pages/Common/Toast'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  const theme = useTheme()
  const dispatch = useDispatch()

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage?.getItem('userToken')
      const permission = JSON.parse(window.localStorage.getItem('permission'))
      if (storedToken) {
        if (router.pathname === '/') {
          if (permission?.dashboard?.dashboard === true) {
            router.push('/home')
          } else {
            router.push('/WelcomePage')
          }
        }
      } else {
        router.push('/login')
      }
    }

    initAuth()
  }, [])

  const handleLogout = () => {
    dispatch(logout()).then(res => {
      if (res?.payload?.status === 200) {
        router.push('/login')
        setUser(null)
        localStorage.clear()
        Toast({ response: res })
      } else {
        Toast({ response: res, error: true })
      }
    })
  }

  // const handleRegister = (params, errorCallback) => {
  //   axios
  //     .post(authConfig.registerEndpoint, params)
  //     .then(res => {
  //       if (res.data.error) {
  //         if (errorCallback) errorCallback(res.data.error)
  //       } else {
  //         handleLogin({ email: params.email, password: params.password })
  //       }
  //     })
  //     .catch(err => (errorCallback ? errorCallback(err) : null))
  // }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    // login: handleLogin,
    logout: handleLogout
    // register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
