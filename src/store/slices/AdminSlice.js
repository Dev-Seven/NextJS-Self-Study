/* eslint-disable padding-line-between-statements */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 07-03-2023                Login and Table api                           DHRUV
// 1002,                 09-03-2023                Create Admin User api                         DHRUV
// 1003,                 07-03-2023                get all user and roles api                    DHRUV
// 1002                  09-03-2023                CREATE ROLES API ADDED                        ADITYA
// 1004                  09-03-2023                DELETE ROLES API ADDED                        ADITYA
// 1005                  09-03-2023                EDIT ROLES API ADDED                          ADITYA
// 1006                  04-04-2023                GET POPULAR TOPICS API                        ADITYA

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  AddAppBannerApi,
  AddMapImageApi,
  createAdminAPI,
  createRolesApi,
  CreateSupportSubjectApi,
  DeleteAppBannerApi,
  DeletedAdminApi,
  DeleteMapImageApi,
  deleteRolesApi,
  deleteSupportRequestApi,
  DeleteSupportSubjectApi,
  editRolesApi,
  GetAdminByIdAPI,
  GetAllActiveRoleApi,
  GetAllAppBannerApi,
  getAllDashboardQuizApi,
  getAllDashboardRevenueApi,
  getAllDashboardSubjectApi,
  getAllDashboardTopicApi,
  getAllDashboardUserApi,
  GetAllMapImageApi,
  getAllNotificationApi,
  GetAllPaymentApi,
  GetAllRolesAPI,
  getAllSupportRequestApi,
  GetAllSupportSubjectApi,
  GetAllUserAPI,
  GetAppBannerByIdApi,
  getPopularQuizApi,
  getPopularSubjectsApi,
  getPopularTopicsApi,
  getRolesById,
  GetSupportRequestByIdApi,
  GetSupportSubjectByIdApi,
  notificationApi,
  threeMonthsRevenueApi,
  threeMonthsUserApi,
  UpdateAdminAPI,
  UpdateAppBannerApi,
  UpdatedAdminProfileApi,
  UpdateSupportRequestApi,
  UpdateSupportSubjectApi
} from 'src/common/Service'
import { setLoading } from './LayoutSlice'

// 1001 START
const initialState = {
  loading: false,
  allUsers: [],
  allUser: [],
  allRoles: [],
  addAdminUser: [],
  createAdminRoles: [],
  deleteAdminRoles: [],
  editAdminRoles: [],
  popularTopics: [],
  popularSubjects: [],
  popularQuiz: [],
  threeMonths: [],
  threeMonthsRevenue: [],
  allDashboardUser: [],
  allDashboardSubjects: [],
  allDashboardTopics: [],
  allDashboardQuizes: [],
  allDashboardRevenue: [],
  allSupportRequest: [],
  allSupportSubject: [],
  addSupportSubject: [],
  UpdatedAdminProfile: [],
  GetAllActiveRole: [],
  GetAllPayment: [],
  getAllNotification: [],
  GetAllAppBanner: [],
  AddAppBanner: [],
  GetAllMapImage: [],
  AddMapImage: []

  // GetAllLogs: []
}

// 1003 START
export const GetAllUser = createAsyncThunk('GetAllUser', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllUserAPI(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    dispatch(setLoading(true))

    return error
  }
})

export const GetAllRoles = createAsyncThunk('GetAllRoles', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllRolesAPI(values)

    if (result?.data.status === 200 || result?.payload?.status === 200) {
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

// 1003 END

// 1002 START
export const createAdminUser = createAsyncThunk('createAdminUser', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await createAdminAPI(values)

    if (result?.data.status === 200) {
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

// 1002 END

export const GetAdminByIdUser = createAsyncThunk('GetAdminByIdUser', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAdminByIdAPI({ _id: values })

    if (result?.data.status === 200) {
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

export const updateAdminUser = createAsyncThunk('updateAdminUser', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateAdminAPI(values)

    if (result?.data.status === 200) {
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

export const DeletedAdmin = createAsyncThunk('DeletedAdmin', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeletedAdminApi({ _id: values })
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

//1002 START

//create Roles Api
export const createRoles = createAsyncThunk('createAdminRoles', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await createRolesApi(values)
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

//1002 END

//1004 START

//deleteRoles Api
export const deleteRoles = createAsyncThunk('deleteAdminRoles', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const deletedRole = await deleteRolesApi({ _id: values })
    if (deletedRole?.data?.status === 200) {
      dispatch(setLoading(false))

      return deletedRole.data
    } else {
      throw deleteRoles.data
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

//1004 END

//1005 START
//edit roles Api

export const editRoles = createAsyncThunk('editAdminRoles', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const editRole = await editRolesApi(values)
    if (editRoles?.data?.status === 200) {
      dispatch(setLoading(false))

      return editRole.data
    } else {
      throw editRole.data
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

//1005 END

export const getAdminRolesById = createAsyncThunk('getAdminRolesById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getRolesById({ _id: values })

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

// 1006 START

export const getPopularTopics = createAsyncThunk('getPopularTopics', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getPopularTopicsApi(values)

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

export const getPopularSubjects = createAsyncThunk('getPopularSubjects', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getPopularSubjectsApi(values)

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

//**************** popular quiz api *****************//
export const getPopularQuiz = createAsyncThunk('getPopularQuiz', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getPopularQuizApi(values)

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

export const threeMonthsUsers = createAsyncThunk('threeMonthsUsers', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await threeMonthsUserApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const threeMonthsRevenue = createAsyncThunk('threeMonthsRevenue', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await threeMonthsRevenueApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const getAllDashboardUser = createAsyncThunk('getAllDashboardUser', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllDashboardUserApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const getAllDashboardSubject = createAsyncThunk('getAllDashboardSubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllDashboardSubjectApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})
export const getAllDashboardTopic = createAsyncThunk('getAllDashboardTopic', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllDashboardTopicApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const getAllDashboardQuiz = createAsyncThunk('getAllDashboardQuiz', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllDashboardQuizApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const getAllDashboardRevenue = createAsyncThunk('getAllDashboardRevenue', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllDashboardRevenueApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const getAllSupportRequest = createAsyncThunk('getAllSupportRequest', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllSupportRequestApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})
export const GetAllSupportSubject = createAsyncThunk('GetAllSupportSubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllSupportSubjectApi(values)

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
export const CreateSupportSubject = createAsyncThunk('CreateSupportSubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await CreateSupportSubjectApi(values)

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
export const UpdateSupportSubject = createAsyncThunk('UpdateSupportSubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateSupportSubjectApi(values)

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
export const GetSupportSubjectById = createAsyncThunk('GetSupportSubjectById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetSupportSubjectByIdApi({ _id: values })

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
export const DeleteSupportSubject = createAsyncThunk('DeleteSupportSubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteSupportSubjectApi({ _id: values })

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
export const GetSupportRequestById = createAsyncThunk('GetSupportRequestById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetSupportRequestByIdApi({ _id: values })

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
export const deleteSupportRequest = createAsyncThunk('deleteSupportRequest', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await deleteSupportRequestApi({ _id: values })

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
export const UpdateSupportRequest = createAsyncThunk('UpdateSupportRequest', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateSupportRequestApi(values)

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
export const UpdatedAdminProfile = createAsyncThunk('UpdatedAdminProfile', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdatedAdminProfileApi(values)

    if (result?.data.status === 200) {
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
export const GetAllActiveRole = createAsyncThunk('GetAllActiveRole', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllActiveRoleApi(values)

    if (result?.data.status === 200) {
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
export const GetAllPayment = createAsyncThunk('GetAllPayment', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllPaymentApi(values)

    // console.log('🚀 ~ file: AdminSlice.js:679 ~ GetAllPayment ~ result:', result)

    if (result?.data.status === 200) {
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

export const getAllNotification = createAsyncThunk('getAllNotification', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllNotificationApi(values)

    // console.log('🚀 ~ file: AdminSlice.js:679 ~ GetAllPayment ~ result:', result)

    if (result?.data.status === 200) {
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

export const GetAllAppBanner = createAsyncThunk('GetAllAppBanner', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllAppBannerApi(values)

    // console.log('🚀 ~ file: AdminSlice.js:705 ~ GetAllAppBanner ~ result:', result)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const GetAllMapImage = createAsyncThunk('GetAllMapImage', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllMapImageApi(values)

    // console.log('🚀 ~ file: AdminSlice.js:705 ~ GetAllAppBanner ~ result:', result)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const SendNotification = createAsyncThunk('SendNotification', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await notificationApi(values)
    if (result?.data?.status === 200) {
      dispatch(setLoading(false))

      return result
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const AddAppBanner = createAsyncThunk('AddAppBanner', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await AddAppBannerApi(values)

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

export const AddMapImage = createAsyncThunk('AddMapImage', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await AddMapImageApi(values)

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

export const GetAppBannerById = createAsyncThunk('GetAppBannerById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAppBannerByIdApi({ _id: values })
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

export const DeleteAppBanner = createAsyncThunk('DeleteAppBanner', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteAppBannerApi({ _id: values })

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
export const DeleteMapImage = createAsyncThunk('DeleteMapImage', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await DeleteMapImageApi({ _id: values })

    if (result?.data?.status === 200) {
      dispatch(removeDeletedMapImage(values))
      // dispatch(setLoading(false))

      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))

    return error
  }
})

export const UpdateAppBanner = createAsyncThunk('UpdateAppBanner', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateAppBannerApi(values)

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

// export const GetAllLogs = createAsyncThunk('GetAllLogs', async (values, { dispatch }) => {
//   try {
//     dispatch(setLoading(true))
//     const result = await GetAllLogsApi(values)

//     if (result?.data?.status === 200) {
//       dispatch(setLoading(false))

//       return result
//     } else {
//       throw result
//     }
//   } catch (error) {
//     dispatch(setLoading(false))

//     return error
//   }
// })

const AdminSlice = createSlice({
  name: 'AdminSlice',
  initialState,
  reducers: {
    removeDeletedMapImage: (state, action) => {
      const deletedId = action.payload
      state.GetAllMapImage = state.GetAllMapImage.filter(image => image._id !== deletedId)
    }
  },
  extraReducers: builder => {
    // 1003 START
    builder.addCase(GetAllUser.fulfilled, (state, action) => {
      state.allUser = action.payload?.data
    })
    builder.addCase(GetAllRoles.fulfilled, (state, action) => {
      state.allRoles = action.payload?.data
    })

    // 1003 END

    // 1002 Start
    builder.addCase(createAdminUser.fulfilled, (state, { payload }) => {
      state.addAdminUser = payload?.data
    })

    // 1002 END
    builder.addCase(createRoles.fulfilled, (state, action) => {
      state.createAdminRoles = action.payload?.data
    })

    builder.addCase(GetAdminByIdUser.fulfilled, state => {
      state.loading = true
    })

    builder.addCase(deleteRoles.fulfilled, (state, action) => {
      state.deleteAdminRoles = action.payload?.data
    })

    builder.addCase(editRoles.fulfilled, (state, action) => {
      state.editAdminRoles = action.payload?.data
    })
    builder.addCase(getPopularTopics.fulfilled, (state, action) => {
      state.popularTopics = action.payload?.data
    })
    builder.addCase(getPopularSubjects.fulfilled, (state, action) => {
      state.popularSubjects = action.payload?.data
    })
    builder.addCase(getPopularQuiz.fulfilled, (state, action) => {
      state.popularQuiz = action.payload?.data
    })
    builder.addCase(threeMonthsUsers.fulfilled, (state, action) => {
      state.threeMonths = action.payload?.data
    })
    builder.addCase(threeMonthsRevenue.fulfilled, (state, action) => {
      state.threeMonthsRevenue = action.payload?.data
    })
    builder.addCase(getAllDashboardUser.fulfilled, (state, action) => {
      state.allDashboardUser = action.payload?.data
    })
    builder.addCase(getAllDashboardSubject.fulfilled, (state, action) => {
      state.allDashboardSubjects = action.payload?.data
    })
    builder.addCase(getAllDashboardTopic.fulfilled, (state, action) => {
      state.allDashboardTopics = action.payload?.data
    })
    builder.addCase(getAllDashboardQuiz.fulfilled, (state, action) => {
      state.allDashboardQuizes = action.payload?.data
    })
    builder.addCase(getAllDashboardRevenue.fulfilled, (state, action) => {
      state.allDashboardRevenue = action.payload?.data
    })
    builder.addCase(getAllSupportRequest.fulfilled, (state, action) => {
      state.allSupportRequest = action.payload?.data
    })
    builder.addCase(GetAllSupportSubject.fulfilled, (state, action) => {
      state.allSupportSubject = action.payload.data
    })
    builder.addCase(CreateSupportSubject.fulfilled, (state, action) => {
      state.addSupportSubject = action.payload.data
    })
    builder.addCase(UpdatedAdminProfile.fulfilled, (state, action) => {
      state.UpdatedAdminProfile = action.payload.data
    })
    builder.addCase(GetAllActiveRole.fulfilled, (state, action) => {
      state.GetAllActiveRole = action.payload.data
    })
    builder.addCase(GetAllPayment.fulfilled, (state, action) => {
      state.GetAllPayment = action.payload.data
    })
    builder.addCase(getAllNotification.fulfilled, (state, action) => {
      state.getAllNotification = action.payload.data
    })
    builder.addCase(GetAllAppBanner.fulfilled, (state, action) => {
      state.GetAllAppBanner = action.payload.data?.data
    })
    builder.addCase(AddAppBanner.fulfilled, (state, action) => {
      state.AddAppBanner = action?.payload?.data
    })
    builder.addCase(AddMapImage.fulfilled, (state, action) => {
      state.AddMapImage = action.payload.data
    })
    builder.addCase(GetAllMapImage.fulfilled, (state, action) => {
      state.GetAllMapImage = action.payload.data?.data
    })

    // builder.addCase(GetAllLogs.fulfilled, (state, action) => {
    //   state.GetAllLogs = action.payload.data
    // })
  }
})

export const { removeDeletedMapImage } = AdminSlice.actions

// 1001 END
export default AdminSlice.reducer
