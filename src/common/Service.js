/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 06-03-2023                   ADD Login api                              DHRUV
// 1002,                 07-03-2023                   get all user and roles api                 DHRUV
// 1003,                 09-03-2023                   Forgot Password API                        DHRUV
// 1004,                 09-03-2023                   Create Admin User API                      DHRUV
// 1003,                 09-03-2023                   CREATE ROLES API ADDED                     ADITYA
// 1004,                 10-03-2023                   DELETE ROLES API ADDED                     ADITYA
// 1005,                 13-03-2023                   GET ALL SUBJECT API                        ADITYA
// 1006,                 15-03-2023                   GET ALL Map API                            Dhruv
// 1007                  16-03-2023                   GET CATEGORY BY SUBJECT                    ADITYA
// 1007                  16-03-2023                   ADD CATEGORY                               ADITYA
// 1008                  17-03-2023                   DELETE CATEGORY API                        ADITYA
// 1009                  20-03-2023                   TOPIC TAGS APIS                            DHRUV
// 1010                  21-03-2023                   DELETE USER BY ADMIN API                   DHRUV
// 1011                  24-03-2023                   CREATE TOPIC API                           ADITYA
// 1012                  03-04-2023                   GET ALL CALENDER EVENTS
import axios from 'axios'
import { AUTH, GET, POST } from './HTTP'

// export const base_url = 'http://67.205.148.222:9006/'
export const base_url = process.env.NEXT_PUBLIC_BASE_URL

export const img_url = process.env.NEXT_PUBLIC_IMG_URL

// export const img_url = 'http://67.205.148.222:9006/image/'

// 1001 START
export const loginAPI = data => AUTH(`${base_url}admin-user/signIn`, data)

// 1001 END

// 1003 START
export const ForgotPasswordAPI = data => AUTH(`${base_url}admin-user/forgotPassword`, data)

// 1003 END

// 1002 START
export const GetAllUserAPI = data => POST(`${base_url}admin-user/getAllAdmin`, data)

export const GetAllRolesAPI = data => POST(`${base_url}role/getAllRole`, data)

export const getRolesById = data => POST(`${base_url}role/getRoleById`, data)

export const editRolesApi = data => POST(`${base_url}role/updateRole`, data)

export const GetAllActiveRoleApi = data => POST(`${base_url}role/dropDown/getAllRole`, data)

// 1002 END

export const GetAllAppUserAPI = data => POST(`${base_url}user/getAllUser`, data)

export const getAppUserByIdApi = data => POST(`${base_url}user/GetUserById`, data)

export const editAppUserByAdminApi = data => POST(`${base_url}user/updateUserByAdmin`, data)

// 1004 START
export const createAdminAPI = data => POST(`${base_url}admin-user/createAdmin`, data)

// 1004 END

export const UpdatedAdminProfileApi = data => POST(`${base_url}admin-user/updatedAdminProfile`, data)

export const UpdateAdminAPI = data => POST(`${base_url}admin-user/updatedAdmin`, data)

export const GetAdminByIdAPI = data => POST(`${base_url}admin-user/getuserById`, data)

export const DeletedAdminApi = data => POST(`${base_url}admin-user/deletedAdmin`, data)

//1003 START

export const createRolesApi = data => POST(`${base_url}role/addRole`, data)

export const deleteRolesApi = data => POST(`${base_url}role/deleteRole`, data)

// 1003 END

export const GetAllCategoryApi = data => POST(`${base_url}category/GetAllCategory`, data)

export const addSubjectsApi = data => POST(`${base_url}subject/createSubject`, data)

export const getAllSubjectsApi = data => POST(`${base_url}subject/GetAllSubject`, data)

export const getSubjectByIdApi = data => POST(`${base_url}subject/GetSubjectById`, data)

export const updateSubjectApi = data => POST(`${base_url}subject/updateSubject`, data)

export const deleteSubjectByIdApi = data => POST(`${base_url}subject/DeleteSubject`, data)

// 1006 START
export const GetAllMapApi = data => POST(`${base_url}map/getAllMap`, data)

export const CreateMapApi = data => POST(`${base_url}map/createMap`, data)

export const UpdateMapApi = data => POST(`${base_url}map/updateMap`, data)

export const DeleteMapApi = data => POST(`${base_url}map/deleteMap`, data)

export const GetMapByIdApi = data => POST(`${base_url}map/getMapById`, data)

export const GetMapBySubjectApi = data => POST(`${base_url}map/getMapBySubject`, data)

// 1006 END

// 1007 START
export const getCategoryBySubjectApi = data => POST(`${base_url}category/getCategoryBySubject`, data)

export const addCategoryApi = data => POST(`${base_url}category/createCategory`, data)

export const getCategoryByIdApi = data => POST(`${base_url}category/getCategoryById`, data)

export const editCategoryApi = data => POST(`${base_url}category/updateCategory`, data)

// 1007 END

//1008 START

export const deleteCategoryApi = data => POST(`${base_url}category/deleteCategory`, data)

//1008 END

//1009 START
// Topic Tag
export const GetAllTopicTagApi = data => POST(`${base_url}topic-tag/getAllTopicTag`, data)

export const CreateTopicTagApi = data => POST(`${base_url}topic-tag/createTopicTag`, data)

export const DeleteTopicTagApi = data => POST(`${base_url}topic-tag/deleteTopicTag`, data)

export const GetTopicTagByIdApi = data => POST(`${base_url}topic-tag/getTopicTagById`, data)

export const UpdateTopicTagApi = data => POST(`${base_url}topic-tag/updateTopicTag`, data)

//1009 END

// 1010 START
export const DeleteUserByAdminApi = data => POST(`${base_url}user/deleteUserByAdmin`, data)

export const ResetDeviceLoginCountApi = data => POST(`${base_url}user/resetDeviceLoginCount`, data)

//1010 END

//1011 START
export const createTopicApi = data => POST(`${base_url}topic/CreateTopic`, data)

export const getAllTopicApi = ({ page, take, searchStr }) =>
  POST(`${base_url}topic/GetAllTopic`, { page, take, searchStr })

export const editTopicApi = data => POST(`${base_url}topic/UpdateTopic`, data)

export const getTopicByIdApi = data => POST(`${base_url}topic/getTopicById`, data)

export const deleteTopicApi = data => POST(`${base_url}topic/DeleteTopic`, data)

export const NewsImageUploadApi = data => POST(`${base_url}topic/newsImageUpload`, data)

export const TopicLinkImageUploadApi = data => POST(`${base_url}topic/topicLinkImageUpload`, data)

export const RelatedTopicImageUploadApi = data => POST(`${base_url}topic/relatedTopicImageUpload`, data)

export const getAllRelatedTopicApi = data => POST(`${base_url}topic/RelatedTopic`, data)

// topic link apis

export const deleteTopicLinkApi = data => POST(`${base_url}topic-link/deleteTopicLink`, data)

export const editTopicLinkApi = data => POST(`${base_url}topic-link/updateTopicLink`, data)

// Shorts Category
export const GetAllShortCatApi = data => POST(`${base_url}short-category/getAllShortCat`, data)

export const CreateShortCategoryApi = data => POST(`${base_url}short-category/createShortCategory`, data)

export const GetShortCatByIdApi = data => POST(`${base_url}short-category/getShortCatById`, data)

export const UpdateShortCategoryApi = data => POST(`${base_url}short-category/updateShortCategory`, data)

export const DeleteShortCategoryApi = data => POST(`${base_url}short-category/deleteShortCategory`, data)

//1011 END

//1012 START

// Important Dates Apis
export const getAllEvents = data => POST(`${base_url}important-date/eventDatesByBetweenDates`, data)

export const AddImportantDateApi = data => POST(`${base_url}important-date/addImportantDate`, data)

export const UpdateImportantDateApi = data => POST(`${base_url}important-date/updateImportantDate`, data)

export const DeleteImportantDateApi = data => POST(`${base_url}important-date/deleteImportantDate`, data)

export const GetImportantDateByIdApi = data => POST(`${base_url}important-date/getImportantDateById`, data)

// import dates category APIS
export const addDatesCategoryApi = data => POST(`${base_url}important-date-category/addImportantDateCategory`, data)

export const getAllDatesCategoryApi = data =>
  POST(`${base_url}important-date-category/getAllImportantDateCategory`, data)

export const editDateCategoryApi = data => POST(`${base_url}important-date-category/updateImportantDateCategory`, data)

export const importantDatesCategoryByIdApi = data =>
  POST(`${base_url}important-date-category/getImportantDateCategoryById`, data)

export const deleteDateCategoryApi = data =>
  POST(`${base_url}important-date-category/deleteImportantDateCategory`, data)

// dashboard Apis

export const getPopularTopicsApi = data => POST(`${base_url}dashboard/popularTopic`, data)

export const getPopularSubjectsApi = data => POST(`${base_url}dashboard/popularSubjects`, data)

export const getPopularQuizApi = data => POST(`${base_url}dashboard/popularQuiz`, data)

export const threeMonthsUserApi = data => POST(`${base_url}dashboard/lastThreeMonthUsers`, data)

export const threeMonthsRevenueApi = data => POST(`${base_url}dashboard/lastThreeMonthRevenue`, data)

export const getAllDashboardUserApi = data => POST(`${base_url}dashboard/activeUsers`, data)

export const getAllDashboardSubjectApi = data => POST(`${base_url}dashboard/totalSubject`, data)

export const getAllDashboardTopicApi = data => POST(`${base_url}dashboard/totalTopics`, data)

export const getAllDashboardQuizApi = data => POST(`${base_url}dashboard/totalQuiz`, data)

export const getAllDashboardRevenueApi = data => POST(`${base_url}dashboard/totalRevenue`, data)

// Support REquest

export const getAllSupportRequestApi = data => POST(`${base_url}dashboard/getAllSupportRequest`, data)

export const GetSupportRequestByIdApi = data => POST(`${base_url}support-request/getSupportRequestById`, data)

export const UpdateSupportRequestApi = data => POST(`${base_url}support-request/updateSupportRequest`, data)

export const deleteSupportRequestApi = data => POST(`${base_url}support-request/deleteSupportRequest`, data)

// Shorts
export const GetAllShortsApi = data => POST(`${base_url}shorts/getAllShorts`, data)

export const CreateShortsApi = data => POST(`${base_url}shorts/createShorts`, data)

export const GetShortbyIdApi = data => POST(`${base_url}shorts/getShortbyId`, data)

export const UpdateShortsApi = data => POST(`${base_url}shorts/updateShorts`, data)

export const DeleteShortsApi = data => POST(`${base_url}shorts/deleteShorts`, data)

export const GetShortCatBySubjectApi = data => POST(`${base_url}short-category/dropDown/getAllShortCat`, data)

// Support Subject
export const GetAllSupportSubjectApi = data => POST(`${base_url}support-subject/GetAllSupportSubject`, data)

export const GetSupportSubjectByIdApi = data => POST(`${base_url}support-subject/GetSupportSubjectById`, data)

export const CreateSupportSubjectApi = data => POST(`${base_url}support-subject/createSupportSubject`, data)

export const UpdateSupportSubjectApi = data => POST(`${base_url}support-subject/updateSupportSubject`, data)

export const DeleteSupportSubjectApi = data => POST(`${base_url}support-subject/deleteSupportSubject`, data)

// Subscription
export const GetAllSubscriptionApi = data => POST(`${base_url}subscription/GetAllSubscription`, data)

export const DeleteSubscriptionApi = data => POST(`${base_url}subscription/DeleteSubscription`, data)

export const CreateSubcriptionApi = data => POST(`${base_url}subscription/CreateSubcription`, data)

export const GetSubscriptionByIdApi = data => POST(`${base_url}subscription/GetSubscriptionById`, data)

export const UpdateSubscriptionApi = data => POST(`${base_url}subscription/UpdateSubscription`, data)

// Offers Apis
export const GetAllCouponApi = data => POST(`${base_url}coupon/getAllCoupon`, data)

export const addCouponApi = data => POST(`${base_url}coupon/createCoupon`, data)

export const deleteCouponApi = data => POST(`${base_url}coupon/deleteCoupon`, data)

export const editCouponApi = data => POST(`${base_url}coupon/updateCoupon`, data)

export const getCouponByIdApi = data => POST(`${base_url}coupon/getCouponById`, data)

// Question Bank
export const getAllQuestionBankApi = data => POST(`${base_url}questionBank/getAllQuestionBank`, data)

export const CreateQuestionBankApi = data => POST(`${base_url}questionBank/CreateQuestionBank`, data)

export const GetQuestionByIdApi = data => POST(`${base_url}questionBank/GetQuestionById`, data)

export const UpdateQuestionBankApi = data => POST(`${base_url}questionBank/UpdateQuestionBank`, data)

export const DeleteQuestionBankApi = data => POST(`${base_url}questionBank/deleteQuestionBank`, data)

// Quiz

export const GetAllQuizApi = data => POST(`${base_url}quiz/GetAllQuiz`, data)

export const DeleteQuizApi = data => POST(`${base_url}quiz/DeleteQuiz`, data)

export const createQuizApi = data => POST(`${base_url}quiz/createQuiz`, data)

export const getQuizByIdApi = data => POST(`${base_url}quiz/getQuizById`, data)

export const updateQuizApi = data => POST(`${base_url}quiz/UpdateQuiz`, data)

export const questionBySubjectApi = data => POST(`${base_url}questionBank/getQuestionBySubject`, data)

export const GetSubjectByQuestionsApi = data => POST(`${base_url}questionBank/getSubjectByQuestions`, data)

// Subject Price API

export const GetAllSubjectPriceApi = data => POST(`${base_url}subject/getAllSubjectPrice`, data)

export const GetSubjectPriceByIdApi = data => POST(`${base_url}subject/getSubjectPriceById`, data)

export const AddSubjectPriceApi = data => POST(`${base_url}subject/addSubjectPrice`, data)

export const UpdateSubjectPriceApi = data => POST(`${base_url}subject/updateSubjectPrice`, data)

export const DeleteSubjectPriceApi = data => POST(`${base_url}subject/deleteSubjectPrice`, data)

export const GetPaidSubjectApi = data => POST(`${base_url}subject/GetPaidSubject`, data)

// Quiz Category

export const GetAllQuizCategoryApi = data => POST(`${base_url}quiz-category/getAllQuizCategory`, data)

export const CreateQuizCategoryApi = data => POST(`${base_url}quiz-category/createQuizCategory`, data)

export const UpdateQuizCategoryApi = data => POST(`${base_url}quiz-category/updateQuizCategory`, data)

export const DeleteQuizCategoryApi = data => POST(`${base_url}quiz-category/deleteQuizCategory`, data)

export const GetQuizCategoryByIdApi = data => POST(`${base_url}quiz-category/getQuizCategoryById`, data)

// Payments
export const GetAllPaymentApi = data => POST(`${base_url}payment/getAllPayment`, data)

// Open api for Dropdown
export const getAllSubjectdropdownApi = data => POST(`${base_url}subject/dropDown/GetAllSubject`, data)

export const getAllTopicDropdownTagApi = data => POST(`${base_url}topic-tag/dropDown/getAllTopicTag`, data)

export const getAllQuizCategoryDropdownApi = data => POST(`${base_url}quiz-category/dropDown/getAllQuizCategory`, data)

export const getAllImportantDateCategoryDropdownApi = data =>
  POST(`${base_url}important-date-category/dropDown/getAllImportantDateCategory`, data)

// App Banneer Api
export const GetAllAppBannerApi = data => POST(`${base_url}app-banner/getAllAppBanner`, data)

export const DeleteAppBannerApi = data => POST(`${base_url}app-banner/deleteAppBanner`, data)

export const UpdateAppBannerApi = data => POST(`${base_url}app-banner/updateAppBanner`, data)

export const AddAppBannerApi = data => POST(`${base_url}app-banner/addAppBanner`, data)

export const GetAppBannerByIdApi = data => POST(`${base_url}app-banner/getAppBannerById`, data)

// All user custome subscription
export const AllCustomSubscriptionApi = data => POST(`${base_url}subscription/allCustomSubscription`, data)

export const UpdateCustomSubscriptionByAdminApi = data =>
  POST(`${base_url}subscription/updateCustomSubscriptionByAdmin`, data)

export const logoutApi = data => POST(`${base_url}user/logout`, data)

// App Banneer Api
export const GetAllMapImageApi = data => POST(`${base_url}map-images/get-all-map-images`, data)

export const AddMapImageApi = data => POST(`${base_url}map-images/add-map-image`, data)

export const DeleteMapImageApi = data => POST(`${base_url}map-images/delete-map-image`, data)

//** Get All Notification */
export const getAllNotificationApi = data => POST(`${base_url}notification/getAllNotification`, data)

// ** Company Apis

export const getAllCompanyDetailsApi = data => POST(`${base_url}company/getAllCompanyDetail`, data)

export const updateCompanyDetailsApi = data => POST(`${base_url}company/updateCompanyDetail`, data)
//** Tax module api */

export const getAllServiceTaxApi = data => POST(`${base_url}service-tax/getAllServiceTax`, data)

export const addServiceTaxApi = data => POST(`${base_url}service-tax/addServiceTax`, data)

export const updateServiceTaxApi = data => POST(`${base_url}service-tax/updateServiceTax`, data)

export const getServiceTaxByIdApi = data => POST(`${base_url}service-tax/getServiceTaxById`, data)

export const deleteServiceTaxApi = data => POST(`${base_url}service-tax/deleteServiceTax`, data)

export const getAllActiveServiceTaxApi = data => POST(`${base_url}service-tax/getAllActiveServiceTax`, data)

//** State module apis */
export const getAllStateApi = data => POST(`${base_url}state/getAllState`, data)

export const getStateByIdApi = data => POST(`${base_url}state/getStateById`, data)

export const updateStateTaxApi = data => POST(`${base_url}state/updateStateTax`, data)

//** Change password api */
export const changePasswordApi = data => POST(`${base_url}admin-user/changePassword`, data)

//** Notification */
export const notificationApi = data => POST(`${base_url}notification/sendNotification`, data)
