/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 07-03-2023                Login and Table api                           DHRUV
// 1002,                 09-03-2023                GET ALL APP USER                              DHRUV
// 1003,                 13-03-2023                GET ALL SUBJECT API                           ADITYA
//
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addCategoryApi,
  addSubjectsApi,
  CreateMapApi,
  DeleteMapApi,
  deleteCategoryApi,
  deleteSubjectByIdApi,
  GetAllAppUserAPI,
  GetAllCategoryApi,
  GetAllMapApi,
  getAllSubjectsApi,
  getSubjectByIdApi,
  UpdateMapApi,
  updateSubjectApi,
  GetMapByIdApi,
  getCategoryBySubjectApi,
  GetAllTopicTagApi,
  CreateTopicTagApi,
  DeleteTopicTagApi,
  GetTopicTagByIdApi,
  UpdateTopicTagApi,
  DeleteUserByAdminApi,
  getCategoryByIdApi,
  createTopicApi,
  getAllTopicApi,
  editTopicApi,
  getTopicByIdApi,
  NewsImageUploadApi,
  editAppUserByAdminApi,
  getAppUserByIdApi,
  GetMapBySubjectApi,
  deleteTopicApi,
  RelatedTopicImageUploadApi,
  GetAllSubscriptionApi,
  DeleteSubscriptionApi,
  CreateSubcriptionApi,
  GetSubscriptionByIdApi,
  UpdateSubscriptionApi,
  GetAllCouponApi,
  addCouponApi,
  deleteCouponApi,
  editCouponApi,
  getCouponByIdApi,
  GetAllSubjectPriceApi,
  AddSubjectPriceApi,
  UpdateSubjectPriceApi,
  DeleteSubjectPriceApi,
  GetSubjectPriceByIdApi,
  getAllRelatedTopicApi,
  GetPaidSubjectApi,
  deleteTopicLinkApi,
  editTopicLinkApi,
  editCategoryApi,
  getAllSubjectdropdownApi,
  getAllTopicDropdownTagApi,
  AllCustomSubscriptionApi,
  UpdateCustomSubscriptionByAdminApi,
  ResetDeviceLoginCountApi,
  TopicLinkImageUploadApi
} from 'src/common/Service'
import { setLoading, setMessage } from './LayoutSlice'

// 1001 START
const initialState = {
  allUsers: [],
  allSubjects: [],
  addSubject: [],
  getSubjectId: [],
  allCategory: [],
  allMap: [],
  allTags: [],
  addMap: [],
  mapBySubject: [],
  getSubjectCategory: [],
  addCategories: [],
  addTopicTag: [],
  catgeoryId: [],
  topic: [],
  getAllTopics: [],
  getTopicsById: [],
  newsImageUplode: [],
  topicLinkImageUpload: [],
  AppUserUpdate: [],
  appUserById: [],
  RelatedTopicImageUpload: [],
  allRelatedTopic: [],
  allSubscription: [],
  addSubscription: [],
  allOffers: [],
  couponById: [],
  allSubjectPrice: [],
  addSubjectPrice: [],
  GetPaidSubject: [],
  getAllSubjectdropdown: [],
  getAllTopicDropdownTag: [],
  AllCustomSubscription: [],
  relatedTopics: [],
  maptopics: [],
  imagesTopic: []
}

// 1002 START
export const GetAllAppUser = createAsyncThunk('GetAllAppUser', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllAppUserAPI(values)
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

export const getAppUserById = createAsyncThunk('getAppUserById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAppUserByIdApi({ _id: values })
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

export const editAppUserByAdmin = createAsyncThunk('editAppUserByAdmin', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await editAppUserByAdminApi(values)
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

//1002 END

export const addSubject = createAsyncThunk('addSubjects', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await addSubjectsApi(values)

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

export const getAllSubject = createAsyncThunk('getAllSubjects', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllSubjectsApi(values)

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

export const getSubjectById = createAsyncThunk('getSubjectsById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getSubjectByIdApi({ _id: values })

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

export const deleteSubjectById = createAsyncThunk('deleteSubjectById', async (values, { dispatch }) => {
  try {
    const result = await deleteSubjectByIdApi({ _id: values })

    if (result?.data?.status === 200) {
      return result?.data
    } else {
      throw result?.data
    }
    return result?.data
  } catch (error) {
    return error
  }
})

export const DeleteUserByAdmin = createAsyncThunk('DeleteUserByAdmin', async (values, { dispatch }) => {
  try {
    const result = await DeleteUserByAdminApi({ _id: values })

    if (result?.data?.status === 200) {
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    return error
  }
})

export const ResetDeviceLoginCount = createAsyncThunk('ResetDeviceLoginCount', async (values, { dispatch }) => {
  try {
    const result = await ResetDeviceLoginCountApi({ _id: values })

    if (result?.data?.status === 200) {
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    return error
  }
})

export const updateSubjectById = createAsyncThunk('updateSubjectById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await updateSubjectApi(values)

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

export const GetAllCategory = createAsyncThunk('GetAllCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllCategoryApi(values)

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

export const GetAllMap = createAsyncThunk('GetAllMap', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllMapApi(values)

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

export const CreateMap = createAsyncThunk('CreateMap', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await CreateMapApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const GetMapById = createAsyncThunk('GetMapById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetMapByIdApi({ _id: values })

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

export const UpdateMap = createAsyncThunk('UpdateMap', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateMapApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const DeleteMap = createAsyncThunk('DeleteMap', async (values, { dispatch }) => {
  try {
    const result = await DeleteMapApi({ _id: values })

    if (result?.data?.status === 200) {
      return result?.data
    } else {
      throw result
    }
  } catch (error) {
    return error
  }
})

export const getMapBySubject = createAsyncThunk('getMapBySubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetMapBySubjectApi(values)

    if (result?.data?.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      throw result
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const getCategoryBySubject = createAsyncThunk('getCategoryBySubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getCategoryBySubjectApi(values)

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

export const addCategory = createAsyncThunk('addCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await addCategoryApi(values)

    if (result?.data.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const editCategory = createAsyncThunk('editCategory', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await editCategoryApi(values)

    if (result?.data.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      return result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const deleteCategory = createAsyncThunk('deleteCategory', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await deleteCategoryApi({ _id: values })

    if (result?.data.status === 200) {
      // dispatch(setLoading(false))
      return result?.data
    }
  } catch (error) {
    // dispatch(setLoading(true))
    return error
  }
})

export const getCategoryById = createAsyncThunk('getCategoryById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getCategoryByIdApi({ _id: values })

    if (result?.data.status === 200) {
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

export const GetAllTopicTag = createAsyncThunk('GetAllTopicTag', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllTopicTagApi(values)

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

export const CreateTopicTag = createAsyncThunk('CreateTopicTag', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await CreateTopicTagApi(values)

    if (result?.data?.status === 200) {
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    // dispatch(setLoading(true))
    return error
  }
})

export const UpdateTopicTag = createAsyncThunk('UpdateTopicTag', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await UpdateTopicTagApi(values)

    if (result?.data?.status === 200) {
      return result?.data
    } else {
      throw result?.data
    }
  } catch (error) {
    // dispatch(setLoading(true))
    return error
  }
})

export const DeleteTopicTag = createAsyncThunk('DeleteTopicTag', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await DeleteTopicTagApi({ _id: values })

    if (result?.data.status === 200) {
      // dispatch(setLoading(false))
      return result?.data
    }
  } catch (error) {
    // dispatch(setLoading(true))
    return error
  }
})

export const GetTopicTagById = createAsyncThunk('GetTopicTagById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetTopicTagByIdApi({ _id: values })

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

// ============== Topic Apis ============= //

export const createTopic = createAsyncThunk('createTopic', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await createTopicApi(values)
    // if (result?.data?.status === 200) {
    return result?.data
    // } else {
    //   throw result?.data
    // }
  } catch (error) {
    // dispatch(setLoading(true))
    return error
  }
})

export const getAllTopic = createAsyncThunk('getAllTopic', async ({ page, take, searchStr }, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllTopicApi({ page, take, searchStr })
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

export const editTopic = createAsyncThunk('editTopic', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await editTopicApi(values)
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

export const getTopicById = createAsyncThunk('getTopicById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getTopicByIdApi({ _id: values })
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

export const deleteTopic = createAsyncThunk('deleteTopic', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await deleteTopicApi({ _id: values })

    if (result?.data.status === 200) {
      // dispatch(setLoading(false))
      return result?.data
    }
  } catch (error) {
    // dispatch(setLoading(true))
    return error
  }
})

// delete topic link api
export const deleteTopicLink = createAsyncThunk('deleteTopic', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await deleteTopicLinkApi({ _id: values })

    if (result?.data.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      return result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

// update topic link api

export const editTopicLink = createAsyncThunk('editTopicLink', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await editTopicLinkApi(values)

    if (result?.data.status === 200) {
      dispatch(setLoading(false))
      return result?.data
    } else {
      return result?.data
    }
  } catch (error) {
    dispatch(setLoading(false))
    return error
  }
})

export const NewsImageUpload = createAsyncThunk('NewsImageUpload', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await NewsImageUploadApi(values)

    if (result?.data?.code === 200) {
      // dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    // dispatch(setLoading(false))
    return error
  }
})

export const TopicLinkImageUpload = createAsyncThunk('TopicLinkImageUpload', async (values, { dispatch }) => {
  try {
    // dispatch(setLoading(true))
    const result = await TopicLinkImageUploadApi(values)

    if (result?.data?.code === 200) {
      // dispatch(setLoading(false))
      return result.data
    } else {
      throw result.data
    }
  } catch (error) {
    // dispatch(setLoading(false))
    return error
  }
})

export const RelatedTopicImageUpload = createAsyncThunk('RelatedTopicImageUpload', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await RelatedTopicImageUploadApi(values)

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

export const getAllRelatedTopic = createAsyncThunk('getAllRelatedTopic', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllRelatedTopicApi(values)

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

// Subscription Start
export const GetAllSubscription = createAsyncThunk('GetAllSubscription', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllSubscriptionApi(values)

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

export const AllCustomSubscription = createAsyncThunk('AllCustomSubscription', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await AllCustomSubscriptionApi(values)

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

export const UpdateCustomSubscriptionByAdmin = createAsyncThunk(
  'UpdateCustomSubscriptionByAdmin',
  async (values, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const result = await UpdateCustomSubscriptionByAdminApi(values)

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
  }
)

export const CreateSubcription = createAsyncThunk('CreateSubcription', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await CreateSubcriptionApi(values)

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

export const UpdateSubscription = createAsyncThunk('UpdateSubscription', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateSubscriptionApi(values)

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

export const DeleteSubscription = createAsyncThunk('DeleteSubscription', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteSubscriptionApi({ _id: values })

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

export const GetSubscriptionById = createAsyncThunk('GetSubscriptionById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetSubscriptionByIdApi({ _id: values })

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

// Offers & coupon APis

// ** get all coupons
export const GetAllCoupon = createAsyncThunk('GetAllCoupon', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllCouponApi(values)

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

// ** add coupon

export const addCoupon = createAsyncThunk('addCoupon', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await addCouponApi(values)

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

// ** delete coupon

export const deleteCoupon = createAsyncThunk('deleteCoupon', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await deleteCouponApi({ _id: values })

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

// ** edit coupon

export const editCoupon = createAsyncThunk('editCoupon', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await editCouponApi(values)

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

// ** get coupon by id

export const getCouponById = createAsyncThunk('getCouponById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getCouponByIdApi({ _id: values })

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

export const GetAllSubjectPrice = createAsyncThunk('GetAllSubjectPrice', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetAllSubjectPriceApi(values)

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

export const AddSubjectPricee = createAsyncThunk('AddSubjectPricee', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await AddSubjectPriceApi(values)

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

export const UpdateSubjectPrice = createAsyncThunk('UpdateSubjectPrice', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await UpdateSubjectPriceApi(values)

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

export const GetPaidSubject = createAsyncThunk('GetPaidSubject', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetPaidSubjectApi(values)

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

export const DeleteSubjectPrice = createAsyncThunk('DeleteSubjectPrice', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await DeleteSubjectPriceApi({ _id: values })

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

export const GetSubjectPriceById = createAsyncThunk('GetSubjectPriceById', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await GetSubjectPriceByIdApi({ _id: values })

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

export const getAllSubjectdropdown = createAsyncThunk('getAllSubjectdropdown', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllSubjectdropdownApi(values)

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

export const getAllTopicDropdownTag = createAsyncThunk('getAllTopicDropdownTag', async (values, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const result = await getAllTopicDropdownTagApi(values)

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

const LearningSlice = createSlice({
  name: 'LearningSlice',
  initialState,
  reducers: {
    setRelatedTopics: (state, action) => {
      state.relatedTopics = action.payload
    },
    setMapTopics: (state, action) => {
      state.maptopics = action.payload
    },
    setImagesTopics: (state, action) => {
      state.imagesTopic = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(GetAllAppUser.fulfilled, (state, action) => {
      state.allUsers = action.payload?.data
    })
    builder.addCase(getAllSubject.fulfilled, (state, action) => {
      state.allSubjects = action.payload?.data
    })
    builder.addCase(addSubject.fulfilled, (state, action) => {
      state.addSubject = action.payload?.data
    })
    builder.addCase(GetAllCategory.fulfilled, (state, action) => {
      state.allCategory = action.payload?.data
    })
    builder.addCase(GetAllMap.fulfilled, (state, action) => {
      state.allMap = action.payload?.data
    })
    builder.addCase(CreateMap.fulfilled, (state, action) => {
      state.addMap = action.payload?.data
    })
    builder.addCase(getMapBySubject.fulfilled, (state, action) => {
      state.mapBySubject = action.payload?.data
      state.addMap = action.payload?.data
    })
    builder.addCase(getCategoryBySubject.fulfilled, (state, action) => {
      state.getSubjectCategory = action.payload?.data
    })
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.addCategories = action.payload?.data
    })
    builder.addCase(GetAllTopicTag.fulfilled, (state, action) => {
      state.allTags = action.payload?.data
    })
    builder.addCase(CreateTopicTag.fulfilled, (state, action) => {
      state.addTopicTag = action.payload?.data
    })
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.catgeoryId = action.payload?.data
    })
    builder.addCase(createTopic.fulfilled, (state, action) => {
      state.topic = action.payload?.data
    })
    builder.addCase(getAllTopic.fulfilled, (state, action) => {
      state.getAllTopics = action.payload?.data
    })
    builder.addCase(getTopicById.fulfilled, (state, action) => {
      state.getTopicsById = action.payload?.data
    })
    builder.addCase(NewsImageUpload.fulfilled, (state, action) => {
      state.newsImageUplode = action.payload?.data
    })
    builder.addCase(TopicLinkImageUpload.fulfilled, (state, action) => {
      state.topicLinkImageUpload = action.payload?.data
    })
    builder.addCase(editAppUserByAdmin.fulfilled, (state, action) => {
      state.AppUserUpdate = action.payload?.data
    })
    builder.addCase(getAppUserById.fulfilled, (state, action) => {
      state.appUserById = action.payload?.data
    })
    builder.addCase(RelatedTopicImageUpload.fulfilled, (state, action) => {
      state.RelatedTopicImageUpload = action.payload?.data
    })
    builder.addCase(getAllRelatedTopic.fulfilled, (state, action) => {
      state.allRelatedTopic = action.payload?.data
    })
    builder.addCase(GetAllSubscription.fulfilled, (state, action) => {
      state.allSubscription = action.payload?.data
    })
    builder.addCase(CreateSubcription.fulfilled, (state, action) => {
      state.addSubscription = action.payload?.data
    })
    builder.addCase(GetAllCoupon.fulfilled, (state, action) => {
      state.allOffers = action.payload?.data
    })
    builder.addCase(getCouponById.fulfilled, (state, action) => {
      state.couponById = action.payload?.data
    })
    builder.addCase(GetAllSubjectPrice.fulfilled, (state, action) => {
      state.allSubjectPrice = action.payload?.data
    })
    builder.addCase(AddSubjectPricee.fulfilled, (state, action) => {
      state.addSubjectPrice = action.payload?.data
    })
    builder.addCase(GetPaidSubject.fulfilled, (state, action) => {
      state.GetPaidSubject = action.payload?.data
    })
    builder.addCase(getAllSubjectdropdown.fulfilled, (state, action) => {
      state.getAllSubjectdropdown = action.payload?.data
    })
    builder.addCase(getAllTopicDropdownTag.fulfilled, (state, action) => {
      state.getAllTopicDropdownTag = action.payload?.data
    })
    builder.addCase(AllCustomSubscription.fulfilled, (state, action) => {
      state.AllCustomSubscription = action.payload?.data
    })
  }
})

export const { setRelatedTopics, setMapTopics, setImagesTopics } = LearningSlice.actions

export default LearningSlice.reducer
