import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {}
}

export const StorageSlice = createSlice({
  name: 'StorageSlice',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload

      // localStorage.setItem('tree', JSON.stringify(action.payload));
    },
    loadData: (state, action) => {
      const storedData = localStorage.getItem(action.payload)

      if (storedData) {
        state.data = JSON.parse(storedData)
      }
    },
    clearData: (state, action) => {
      state.data = {}
      localStorage.removeItem(action.payload)
    }
  }
})

export const { setData, loadData, clearData } = StorageSlice.actions

export default StorageSlice.reducer
