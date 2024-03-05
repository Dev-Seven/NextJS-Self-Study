/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001                 06-03-2023                   ADD Login api                              DHRUV
// 1002                 09-03-2023                   ADD ForgotPassword api                     DHRUV

// 1001 Start
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ForgotPasswordAPI, changePasswordApi, loginAPI, logoutApi } from 'src/common/Service'

const initialState = {
  adminData: [],
  email: '',
  loading: false,
  error: ''
}

export const login = createAsyncThunk('login', async values => {
  try {
    const result = await loginAPI(values)
    if (result?.payload?.status === 200) {
      // localStorage.setItem('userToken', JSON.stringify(result.data.token))
      // localStorage.setItem('permission', JSON.stringify(result.data.permission))

      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    return error
  }
})

export const changePassword = createAsyncThunk('changePassword', async values => {
  try {
    const result = await changePasswordApi(values)
    if (result?.payload?.status === 200) {
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    return error
  }
})

export const logout = createAsyncThunk('logout', async values => {
  try {
    const result = await logoutApi(values)
    if (result?.payload?.status === 200) {
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    return error
  }
})

// 1002 START
export const forgotPassword = createAsyncThunk('forgotPassword', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await ForgotPasswordAPI(values)

    // if (result?.data.code === 200) {
    // dispatch(setLoading(false))
    //   return result
    // }

    return result.data
  } catch (error) {
    // dispatch(setLoading(true))
    return error
  }
})

// 1002 END

const authSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.adminData = { data: action.payload?.data, permission: action.payload?.permission }
    })

    // 1002 START
    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.email = payload.data
    })

    // 1002 END
  }
})

export default authSlice.reducer

// 1001 END
