/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  CreateQuestionBankApi,
  createQuizApi,
  CreateQuizCategoryApi,
  DeleteQuestionBankApi,
  DeleteQuizApi,
  DeleteQuizCategoryApi,
  getAllQuestionBankApi,
  GetAllQuizApi,
  GetAllQuizCategoryApi,
  GetQuestionByIdApi,
  GetQuizCategoryByIdApi,
  getQuizByIdApi,
  questionBySubjectApi,
  UpdateQuestionBankApi,
  updateQuizApi,
  UpdateQuizCategoryApi,
  GetSubjectByQuestionsApi,
  getAllQuizCategoryDropdownApi
} from 'src/common/Service'
import { setLoading, setMessage } from './LayoutSlice'

// 1001 START
const initialState = {
  allQuestionBank: [],
  addQuestionBank: [],
  allQuiz: [],
  quizById: [],
  allSubjectQuestion: [],
  allQuizcategory: [],
  addQuizcategory: [],
  subjectByQuestions: [],
  getAllQuizCategoryDropdown: []
}

export const getAllQuestionBank = createAsyncThunk('getAllQuestionBank', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllQuestionBankApi(values)
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

export const CreateQuestionBank = createAsyncThunk('CreateQuestionBank', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await CreateQuestionBankApi(values)
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

export const UpdateQuestionBank = createAsyncThunk('UpdateQuestionBank', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateQuestionBankApi(values)
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

export const GetQuestionById = createAsyncThunk('GetQuestionById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetQuestionByIdApi({ _id: values })
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

export const getQuizById = createAsyncThunk('getQuizById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getQuizByIdApi({ _id: values })
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

export const DeleteQuestionBank = createAsyncThunk('DeleteQuestionBank', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteQuestionBankApi({ _id: values })
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

export const GetAllQuiz = createAsyncThunk('GetAllQuiz', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllQuizApi(values)
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

export const DeleteQuiz = createAsyncThunk('DeleteQuiz', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteQuizApi({ _id: values })
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

// // question by subject api
// export const questionBySubject = createAsyncThunk('questionBySubject', async (values, { dispatch }) => {
//   try {
//     dispatch(setLoading(true))
//     const result = await questionBySubjectApi(values)
//     if (result?.data?.status === 200) {
//       dispatch(setLoading(false))
//       return result?.data
//     } else {
//       throw result?.data
//     }
//   } catch (error) {
//     dispatch(setLoading(true))
//     return error
//   }
// })

// export const createQuiz = createAsyncThunk('createQuiz', async (values, { dispatch }) => {
//   try {
//     dispatch(setLoading(true))
//     const result = await createQuizApi(values)
//     if (result?.data?.status === 200) {
//       dispatch(setLoading(false))
//       return result?.data
//     } else {
//       throw result?.data
//     }
//   } catch (error) {
//     dispatch(setLoading(false))
//     return error
//   }
// })

// question by subject api
export const questionBySubject = createAsyncThunk('questionBySubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await questionBySubjectApi(values)
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

export const GetSubjectByQuestions = createAsyncThunk('GetSubjectByQuestions', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetSubjectByQuestionsApi(values)
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

export const createQuiz = createAsyncThunk('createQuiz', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    // console.log('values', Object.fromEntries(values))
    const result = await createQuizApi(values)
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

export const updateQuiz = createAsyncThunk('updateQuiz', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await updateQuizApi(values)
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

// Quiz Category
export const GetAllQuizCategory = createAsyncThunk('GetAllQuizCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllQuizCategoryApi(values)
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

export const CreateQuizCategory = createAsyncThunk('CreateQuizCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await CreateQuizCategoryApi(values)
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

export const UpdateQuizCategory = createAsyncThunk('UpdateQuizCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateQuizCategoryApi(values)
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

export const DeleteQuizCategory = createAsyncThunk('DeleteQuizCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteQuizCategoryApi({ _id: values })
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

export const GetQuizCategoryById = createAsyncThunk('GetQuizCategoryById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetQuizCategoryByIdApi({ _id: values })
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

export const getAllQuizCategoryDropdown = createAsyncThunk(
  'getAllQuizCategoryDropdown',
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const result = await getAllQuizCategoryDropdownApi(values)
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
  }
)

const QuizSlice = createSlice({
  name: 'QuizSlice',
  initialState,
  reducers: {
    // your other reducers
    clearAllSubjectQuestion: state => {
      state.allSubjectQuestion = []
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllQuestionBank.fulfilled, (state, action) => {
      state.allQuestionBank = action.payload?.data
    })
    builder.addCase(CreateQuestionBank.fulfilled, (state, action) => {
      state.addQuestionBank = action.payload?.data
    })
    builder.addCase(GetAllQuiz.fulfilled, (state, action) => {
      state.allQuiz = action.payload?.data
    })
    builder.addCase(questionBySubject.fulfilled, (state, action) => {
      state.allSubjectQuestion = action.payload?.data
    })
    builder.addCase(getQuizById.fulfilled, (state, action) => {
      state.quizById = action.payload?.Data
    })
    builder.addCase(GetAllQuizCategory.fulfilled, (state, action) => {
      state.allQuizcategory = action.payload?.data
    })
    builder.addCase(CreateQuizCategory.fulfilled, (state, action) => {
      state.addQuizcategory = action.payload?.data
    })
    builder.addCase(GetSubjectByQuestions.fulfilled, (state, action) => {
      state.subjectByQuestions = action.payload?.data
    })
    builder.addCase(getAllQuizCategoryDropdown.fulfilled, (state, action) => {
      state.getAllQuizCategoryDropdown = action.payload?.data
    })
  }
})

export const { clearAllSubjectQuestion /* your other action creators */ } = QuizSlice.actions

export default QuizSlice.reducer
