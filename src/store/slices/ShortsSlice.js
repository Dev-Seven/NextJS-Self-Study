/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  CreateShortCategoryApi,
  CreateShortsApi,
  DeleteShortCategoryApi,
  DeleteShortsApi,
  GetAllShortCatApi,
  GetAllShortsApi,
  GetShortbyIdApi,
  GetShortCatByIdApi,
  GetShortCatBySubjectApi,
  UpdateShortCategoryApi,
  UpdateShortsApi
} from 'src/common/Service'
import { setLoading, setMessage } from './LayoutSlice'

// 1001 START
const initialState = {
  allShortsCategory: [],
  allShorts: [],
  createShortCategory: [],
  createShort: [],
  subByCat: [],
  getShortsById: []
}

export const GetAllShortCat = createAsyncThunk('GetAllShortCat', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllShortCatApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const CreateShortCategory = createAsyncThunk('CreateShortCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await CreateShortCategoryApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const UpdateShortCategory = createAsyncThunk('UpdateShortCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateShortCategoryApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const GetShortCatById = createAsyncThunk('GetShortCatById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetShortCatByIdApi({ _id: values })
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const DeleteShortCategory = createAsyncThunk('DeleteShortCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteShortCategoryApi({ _id: values })
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const GetAllShorts = createAsyncThunk('GetAllShorts', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllShortsApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(true))
    return error
  }
})

export const CreateShorts = createAsyncThunk('CreateShorts', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await CreateShortsApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const UpdateShorts = createAsyncThunk('UpdateShorts', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateShortsApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const DeleteShorts = createAsyncThunk('DeleteShorts', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteShortsApi({ _id: values })
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const GetShortCatBySubject = createAsyncThunk('GetShortCatBySubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetShortCatBySubjectApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const GetShortbyId = createAsyncThunk('GetShortbyId', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetShortbyIdApi({ _id: values })
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

const ShortsSlice = createSlice({
  name: 'ShortsSlice',
  initialState,

  extraReducers: builder => {
    builder.addCase(GetAllShortCat.fulfilled, (state, action) => {
      state.allShortsCategory = action.payload?.data
    })
    builder.addCase(CreateShortCategory.fulfilled, (state, action) => {
      state.createShortCategory = action.payload?.data
    })
    builder.addCase(GetAllShorts.fulfilled, (state, action) => {
      state.allShorts = action.payload?.data
    })
    builder.addCase(CreateShorts.fulfilled, (state, action) => {
      state.createShort = action.payload?.data
    })
    builder.addCase(GetShortCatBySubject.fulfilled, (state, action) => {
      state.subByCat = action.payload?.data
    })
    builder.addCase(GetShortbyId.fulfilled, (state, action) => {
      state.getShortsById = action.payload?.data
    })
  }
})

export default ShortsSlice.reducer
