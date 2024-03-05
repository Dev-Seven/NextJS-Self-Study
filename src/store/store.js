// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 06-03-2023                  ADD Auth Slice                            DHRUV
// 1002,                 07-03-2023                  ADD Admin Slice                           DHRUV

import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/AuthSlice'

// 1002 START
import AdminSlice from './slices/AdminSlice'

// 1002 END
import CalendarSlice from './slices/CalendarSlice'

// 1001 START
import AuthSlice from './slices/AuthSlice'

// 1001 END
import LearningSlice from './slices/LearningSlice'

import LayoutSlice from './slices/LayoutSlice'

import TopicSlice from './slices/TopicSlice'

import ShortsSlice from './slices/ShortsSlice'

import QuizSlice from './slices/QuizSlice'
import MasterSlice from './slices/MasterSlice'

export const store = configureStore({
  reducer: {
    // 1002 START
    AdminSlice: AdminSlice,

    // 1002 END
    CalendarSlice: CalendarSlice,

    // 1001 START
    AuthSlice: AuthSlice,

    // 1001 END

    LearningSlice: LearningSlice,

    LayoutSlice: LayoutSlice,

    TopicSlice: TopicSlice,

    ShortsSlice: ShortsSlice,

    QuizSlice: QuizSlice,

    MasterSlice: MasterSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
