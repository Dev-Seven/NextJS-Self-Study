import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addServiceTaxApi,
  deleteServiceTaxApi,
  getAllActiveServiceTaxApi,
  getAllCompanyDetailsApi,
  getAllServiceTaxApi,
  getAllStateApi,
  getServiceTaxByIdApi,
  getStateByIdApi,
  updateCompanyDetailsApi,
  updateServiceTaxApi,
  updateStateTaxApi
} from 'src/common/Service'
import { setLoading } from './LayoutSlice'

const initialState = {
  getAllServiceTax: [],
  addServiceTax: [],
  getAllState: [],
  getAllActiveServiceTax: [],
  getState: {},
  companyData: []
}

export const getAllCompanyDetails = createAsyncThunk('getAllCompanyDetails', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllCompanyDetailsApi(values)
    if (result?.status === 200) {
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

export const updateCompanyDetails = createAsyncThunk('updateCompanyDetails', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await updateCompanyDetailsApi(values)
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

export const addServiceTax = createAsyncThunk('addServiceTax', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await addServiceTaxApi(values)
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

export const updateServiceTax = createAsyncThunk('updateServiceTax', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await updateServiceTaxApi(values)
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

export const updateStateTax = createAsyncThunk('updateStateTax', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await updateStateTaxApi(values)
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

export const getServiceTaxById = createAsyncThunk('getServiceTaxById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getServiceTaxByIdApi({ _id: values })
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

export const getStateById = createAsyncThunk('getStateById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getStateByIdApi({ _id: values })
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

export const getAllServiceTax = createAsyncThunk('getAllServiceTax', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllServiceTaxApi(values)
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

export const getAllState = createAsyncThunk('getAllState', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllStateApi(values)
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

export const getAllActiveServiceTax = createAsyncThunk('getAllActiveServiceTax', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllActiveServiceTaxApi(values)
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

export const deleteServiceTax = createAsyncThunk('deleteServiceTax', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await deleteServiceTaxApi({ _id: values })
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

const MasterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllServiceTax.fulfilled, (state, action) => {
      state.getAllServiceTax = action.payload?.data
    })
    builder.addCase(addServiceTax.fulfilled, (state, action) => {
      state.addServiceTax = action.payload?.data
    })
    builder.addCase(getAllState.fulfilled, (state, action) => {
      state.getAllState = action.payload?.data
    })
    builder.addCase(getAllActiveServiceTax.fulfilled, (state, action) => {
      state.getAllActiveServiceTax = action.payload?.data
    })
    builder.addCase(getStateById.fulfilled, (state, action) => {
      state.getState = action.payload?.data
    })
    builder.addCase(getAllCompanyDetails.fulfilled, (state, action) => {
      state.companyData = action.payload?.data
    })
  }
})

export const {} = MasterSlice.actions

export default MasterSlice.reducer
