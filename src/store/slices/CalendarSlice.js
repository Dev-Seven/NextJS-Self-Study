/* eslint-disable newline-before-return */
// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import {
  addDatesCategory,
  addDatesCategoryApi,
  AddImportantDateApi,
  deleteDateCategoryApi,
  DeleteImportantDateApi,
  editDateCategoryApi,
  getAllDatesCategoryApi,
  getAllEvents,
  getAllImportantDateCategoryDropdownApi,
  GetImportantDateByIdApi,
  importantDatesCategoryByIdApi,
  UpdateImportantDateApi
} from 'src/common/Service'
import { setLoading } from './LayoutSlice'

const initialState = {
  events: [],
  selectedEvent: null,
  selectedCalendars: [],
  getAllDates: [],
  getAllImportantDateCategoryDropdown: []
}

// ** Fetch Events
export const fetchEvents = createAsyncThunk('fetchEvents', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllEvents(values)
    if (result?.data?.code === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

// export const fetchEvents = createAsyncThunk('importantDates/getAllEvents', async calendars => {
//   const response = await axios.get('/apps/calendar/events', {
//     params: {
//       calendars
//     }
//   })

//   return response.data
// })

// ** Add Event
export const addEvent = createAsyncThunk('addEvent', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await AddImportantDateApi(values)
    if (result?.data?.code === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

// ** Update Event
export const updateEvent = createAsyncThunk('updateEvent', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateImportantDateApi(values)
    if (result?.data?.code === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

// ** Delete Event
export const deleteEvent = createAsyncThunk('deleteEvent', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteImportantDateApi({ _id: values })
    if (result?.data?.code === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const GetImportantDateById = createAsyncThunk('GetImportantDateById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetImportantDateByIdApi({ _id: values })
    if (result?.data?.code === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

// ** Add Important Date Category

export const datesCategory = createAsyncThunk('datesCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await addDatesCategoryApi(values)
    if (result?.data?.code === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

// ** Get All Important Dates Category

export const getAllDatesCategory = createAsyncThunk('getAllDatesCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllDatesCategoryApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const getAllImportantDateCategoryDropdown = createAsyncThunk(
  'getAllImportantDateCategoryDropdown',
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const result = await getAllImportantDateCategoryDropdownApi(values)
      if (result?.data?.status === 200) {
        dispatch(setLoading(false))
        return result.data
      } else {
        throw result.data
      }
    } catch (error) {
      dispatch(setLoading(false))
      return error
    }
  }
)

// ** Get Important Dates By Id

export const importantDatesById = createAsyncThunk('importantDatesById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await importantDatesCategoryByIdApi({ _id: values })
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

// ** Update important Dates Category

export const editDateCategory = createAsyncThunk('editDateCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await editDateCategoryApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

// ** Delete Important Dates Category

export const deleteDateCategory = createAsyncThunk('deleteDateCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await deleteDateCategoryApi({ _id: values })
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState,
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.payload)
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0
      }
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedCalendars = state.getAllDates
      } else {
        state.selectedCalendars = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action?.payload
    })
    builder.addCase(getAllDatesCategory.fulfilled, (state, action) => {
      state.getAllDates = action?.payload?.data
    })
    builder.addCase(getAllImportantDateCategoryDropdown.fulfilled, (state, action) => {
      state.getAllImportantDateCategoryDropdown = action?.payload?.data
    })
  }
})

export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = appCalendarSlice.actions

export default appCalendarSlice.reducer
