/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 06-03-2023                  Change key name                             DHRUV
// 1002,                 09-03-2023                  Change key name of add Admin User           DHRUV

import * as Yup from 'yup'

const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png']
const FILE_SIZE = 2000000
const phoneNumberRegEx = /^[0-1]{2}[0-9]{9}/

// Login Schema
export const loginSchema = Yup.object({
  // 1001 START
  Email: Yup.string().email().max(50, 'Entered text is too long').required('Email is required'),
  Password: Yup.string()
    .min(8, 'Minimum 8 characters required')
    .max(15, 'Entered text is too long')
    .required('Password is required')

  // 1001 END
})

// Forgot Password Schema
export const forgotPasswordSchema = Yup.object({
  Email: Yup.string().max(50, 'Entered text is too long').email().required('Email is required')
})

export const roleSchema = Yup.object({
  RoleName: Yup.string().max(150, 'Entered text is too long').required('Role is required')
})

const roleCheckSchema = Yup.object().shape({
  assets: Yup.array().min(1).of(Yup.string().required()).required()
})

// 1002 START
// Admin User Schema
export const addAdminUserSchema = Yup.object({
  FirstName: Yup.string().max(50, 'Entered text is too long').required('First Name is required'),
  LastName: Yup.string().max(50, 'Entered text is too long').required('Last Name is required'),
  UserName: Yup.string().max(200, 'Entered text is too long').required('User Name is required'),
  Email: Yup.string().email().max(50, 'Entered text is too long').required('Email is required'),
  RoleId: Yup.string().required('Please select the Role'),
  MobileNumber: Yup.string().required('Mobile Number is required'),
  ProfileImage: Yup.mixed()
    .required('Profile Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

// 1002 END

// Subject Schema
export const addSubjectSchema = Yup.object({
  SubjectName: Yup.string().max(50, 'Entered text is too long').required('Please select the Subject'),
  Price: Yup.string().max(15, 'Entered text is too long').required('Price is required'),
  EffectiveDate: Yup.date().required('Effective Date is required'),
  BannerImage: Yup.mixed()
    .required('Banner Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

export const addSubjectWithoutPrice = Yup.object({
  SubjectName: Yup.string().max(200, 'Entered text is too long').required('Please select the Subject'),
  // Price: Yup.string().required('Please enter Price'),
  // EffectiveDate: Yup.date().required('Date is Required !'),
  BannerImage: Yup.mixed()
    .required('Banner Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

// Question Bank Schema
export const QuestionBankSchema = Yup.object({
  // SubjectId: Yup.string().required('Please select the Subject'),
  ScorePoints: Yup.string().required('Score Point is required'),
  NegativePoints: Yup.string().required('Negative Point is required'),
  Question: Yup.string().required('Question is required'),
  Explanation: Yup.string().required('Explanation is required'),
  // AnswerOption: Yup.array().max(200, 'Entered text is too long').required('Answer Option is required'),
  AnswerOption: Yup.array().of(
    Yup.object().shape({
      option: Yup.string().max(300, 'Entered text is too long').required('Answer Option is required')
    })
  ),
  Status: Yup.string().required('Status is required')
})

// Quiz Schema
export const addQuizSchema = Yup.object({
  QuizName: Yup.string().max(200, 'Entered text is too long').required('Quiz Name is required'),
  Instruction: Yup.string().required('Quiz Instruction is required'),
  Description: Yup.string().max(1000, 'Entered text is too long').required('Quiz Description is required'),
  // Score: Yup.string().required('Score is required'),
  // QuizCategoryId: Yup.string().required('Please select a quiz category'),
  Status: Yup.string().required('Please Select Status'),
  // Question: Yup.array().min(1).required('Question is required'),
  BannerImage: Yup.mixed()
    .required('Banner Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000),
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
  Logo: Yup.mixed()
    .required('Logo File is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
})

// Quiz Category Schema
export const addQuizCategorySchema = Yup.object({
  QuizCategoryName: Yup.string().max(200, 'Entered text is too long').required('Quiz Category is required'),
  SubjectId: Yup.string().required('Please select the Subject'),
  Status: Yup.string().required('Please Select Status')
})

// Compose Email Schema
export const composeEmailSchema = Yup.object({
  emailSubject: Yup.string().max(200, 'Entered text is too long').required('Email Please select the Subject'),
  emailTo: Yup.string().email().max(50, 'Entered text is too long').required('Email is required')

  // emailCc: Yup.string().email().required('Please enter email')
})

// Support Request Schema
export const supportRequestSchema = Yup.object({
  UserName: Yup.string().max(200, 'Entered text is too long').required('User name is required'),
  EmailSubject: Yup.string().max(200, 'Entered text is too long').required('Please select the Subject'),
  // SupportSubjectName: Yup.string().max(200, 'Entered text is too long').required('Please select the Subject'),
  Message: Yup.string().required('Message is required'),
  Response: Yup.string().required('Response is required'),
  Email: Yup.string().email().max(50, 'Entered text is too long').required('Email is required'),
  MobileNo: Yup.string().required('Please enter Mobile No.'),
  Status: Yup.string().required('Please Select Status')
})

// Support Subject Schema
export const supportSubjectSchema = Yup.object({
  SupportSubject: Yup.string().max(200, 'Entered text is too long').required('Support Subject is required'),
  Status: Yup.string().required('Status is required')
})

// Subscription Schema
export const SubscriptionSchema = Yup.object({
  SubscriptionTitle: Yup.string().max(200, 'Entered text is too long').required('Subscription Title is required'),
  SubjectId: Yup.array().required('Please select the Subject'),
  Duration: Yup.string().required('Please select the Subscription plan'),
  Amount: Yup.string().max(15, 'Entered text is too long').required('Subscription Amount  is required'),
  SubscriptionDetail: Yup.string().required('Subscription Content  is required'),
  StartDate: Yup.date().required('Start Date is required'),
  EndDate: Yup.date()
    .min(Yup.ref('StartDate'), 'End date must be grater than Start Date !')
    .required('End Date is required')
  // BannerImage: Yup.mixed().required('Banner Image is required')
  // .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

// Offer Coupon Schema
export const offerCouponSchema = Yup.object({
  CouponTitle: Yup.string().max(200, 'Entered text is too long').required('Coupon Title is required'),
  DescountType: Yup.string().required('Discount Type is required'),
  MaxUser: Yup.string().required('Max Users  is required'),
  DescountValue: Yup.string().max(15, 'Entered text is too long').required('Discount Value  is required'),
  BannerImage: Yup.mixed()
    .required('Offer Banner is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024),
  CouponCode: Yup.string().required('Coupon Code  is required'),
  StartDate: Yup.date().required('Start Date is required'),
  EndDate: Yup.date()
    .required('End Date is required')
    .min(Yup.ref('StartDate'), 'End date must be grater than start date')
})

// Offer Coupon Schema
export const offerWithAmount = Yup.object({
  CouponTitle: Yup.string().max(200, 'Entered text is too long').required('Coupon Title is required'),
  DescountType: Yup.string().required('Discount Type is required'),
  MaxUser: Yup.string().required('Max Users  is required'),
  DescountValue: Yup.string().max(15, 'Entered text is too long').required('Discount Amount  is required'),
  BannerImage: Yup.mixed()
    .required('Offer Banner is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024),
  CouponCode: Yup.string().required('Coupon Code  is required'),
  StartDate: Yup.date().required('Start Date is required'),
  EndDate: Yup.date()
    .required('End Date is required')
    .min(Yup.ref('StartDate'), 'End date must be grater than start date')
})

// Shorts Topic Schema
export const addShortsCategorySchema = Yup.object({
  ShortCategoryName: Yup.string().max(200, 'Entered text is too long').required('Media Category is required'),
  SubjectId: Yup.string().required('Please select the Subject'),
  Status: Yup.string().required('Status is required'),
  BannerImage: Yup.mixed()
    .required('Media Category Image is required')
    .test('fileSize', 'File more than 2 MB not allowed', value => value && value.size <= 2000000)
})

//  Short Schema
export const addShortSchema = Yup.object({
  StreamLink: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(\/[\w.-]*)*$/,
      'Enter a correct YouTube URL'
    )
    .required('Streaming Link is required'),
  Title: Yup.string().required('Media Title is required'),
  isShort: Yup.string().required('Type is required'),
  StartDate: Yup.date().required('Publish Start Date is required'),
  // EndDate: Yup.date()
  //   .min(Yup.ref('StartDate'), 'Publish End date must be greater than start date')
  //   .required('Publish End Date is required'),
  BannerImage: Yup.mixed()
    .required('Media Image is required')
    .test('fileSize', 'File more than 2 MB not allowed', value => value && value.size <= 2000000)
})

//  Short Schema
export const addShortwithDescriptionSchema = Yup.object({
  Description: Yup.string().required('Media Content is required'),
  // StreamLink: Yup.string().required('Streaming Link is required'),
  Title: Yup.string().required('Media Title is required'),
  // ShortCatId: Yup.string().required('Media Category is required'),
  isShort: Yup.string().required('Type is required'),
  StartDate: Yup.date().required('Publish Start Date is required'),
  // EndDate: Yup.date()
  //   .min(Yup.ref('StartDate'), 'Publish End date must be grater than start date')
  //   .required('Publish End Date is required'),
  BannerImage: Yup.mixed()
    .required('Media Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

// Maps Schema
export const MapsSchema = Yup.object({
  MapTitle: Yup.string().max(200, 'Entered text is too long').required('Map Title is required'),
  SubjectId: Yup.string().required('Please select the Subject'),
  // CategoryId: Yup.string().required('Category is required'),
  StyleLink: Yup.string().max(500, 'Entered text is too long').required('Style Link is required'),
  content: Yup.string().required('Map Contect  is required'),
  BannerImage: Yup.mixed()
    .nullable()
    .required('Map Banner is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000),
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type)),
  ListingIcon: Yup.mixed()
    .nullable()
    .required('Map Icon is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

export const TopicTagSchema = Yup.object({
  TopicTagName: Yup.string().max(200, 'Entered text is too long').required('Topic Tag is required')
})

export const TopicSchema = Yup.object({
  TopicName: Yup.string().max(200, 'Entered text is too long').required('Topic  Name is required'),
  // TopicDescription: Yup.string().max(300, 'Entered text is too long').required('Topic Description is required'),
  TopicContent: Yup.string().required('Editor Value  is required'),
  TopicTagId: Yup.string().required('Topic Tag is required'),
  CategoryId: Yup.string().required('Category is required'),
  TopicBanner: Yup.mixed()
    .required('Topic Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000),
  ListingIcon: Yup.mixed()
    .required('Topic Icon is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
  // TopicVideo: Yup.mixed().required('Video File is required')
  // .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

export const TopicLinkSchema = Yup.object({
  TopicLinktitle: Yup.string().max(200, 'Entered text is too long').required('Topic  Name is required'),
  TopicLinkContent: Yup.string().required('Topic Link Content  is required'),
  TopicLinkBanner: Yup.mixed()
    .required('Banner Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

export const TopicNewsSchema = Yup.object({
  TopicNewstitle: Yup.string().max(200, 'Entered text is too long').required('Topic  Name is required'),
  TopicNewsContent: Yup.string().required('News Content  is required'),
  NewsImage: Yup.mixed()
    .required('Banner Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2000000)
  // .test('fileFormat', 'Unsupported Format', value => value && SUPPORTED_FORMATS.includes(value.type))
})

export const SelectSubject = Yup.object({
  SubjectId: Yup.string().required('Please select the Subject')
})

export const calendarSchema = Yup.object({
  EventTitle: Yup.string().max(200, 'Entered text is too long').required('Event Title is required'),
  isRepeat: Yup.string().required('required'),
  importantDateCategoryId: Yup.string().required('Please select the Category'),
  Description: Yup.string().required('Description is required')
})

export const subjectPriceSchema = Yup.object({
  SubjectId: Yup.string().required('Please select the Subject'),
  Price: Yup.string().max(15, 'Entered text is too long').required('Price is required'),
  StartDate: Yup.date().required('Effective Date is required')
})

// category schema
export const categorySchema = Yup.object({
  CategoryName: Yup.string().max(200, 'Entered text is too long').required('Category is required'),
  BannerImage: Yup.mixed()
    .required('Category Banner is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024)
})

// topic link child schema
export const topicLinkChildSchema = Yup.object({
  TopicLinkFlowchart: Yup.string().required('Flowchart Title is required'),
  TopicLinkEditorContent: Yup.string().required('Flowchart Description is required')
  // NewsImage: Yup.mixed()
  //   .required('Flowchart Link Image is required')
  //   .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024)
})

//topic link main content schema
export const topicLinkMainSchema = Yup.object({
  TopicLinktitle: Yup.string().required('Topic Link Title is required'),
  colorCode: Yup.string().required('Color Code is required'),
  TopicLinkContent: Yup.string().required('Topic Link Description is required'),
  relatedTopicImage: Yup.mixed()
    .required('Topic Link Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024),
  NewsIcon: Yup.mixed()
    .required('Topic Link Icon is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024)
})

// topic news schema
export const topicNewsSchema = Yup.object({
  TopicNewstitle: Yup.string().required('News title is required'),
  TopicNewsPaper: Yup.string().required('News paper is required'),
  TopicNewsContent: Yup.string().required('Description is required'),
  NewsDate: Yup.date().required('News Date is required'),
  NewsImage: Yup.mixed()
    .required('Topic News Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024)
})

// change password schema
export const changepasswordschema = Yup.object({
  OldPassword: Yup.string().required('Old Password is required'),
  NewPassword: Yup.string().required('New Password is required')
})

// Date Category
export const dateCategorySchema = Yup.object({
  importantDateCategoryName: Yup.string().required('Date Category is required'),
  colorCode: Yup.string().required('Color Code is required')
})

// App Banner Image
export const appBannerSchema = Yup.object({
  Sequence: Yup.number().required('Sequence is required'),
  BannerImage: Yup.mixed()
    .required('App Slider Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024)
})

export const mapImageSchema = Yup.object({
  MapImageName: Yup.string().max(200, 'Entered text is too long').required('Map Image Name is required'),
  SubjectId: Yup.string().required('Please select the Subject'),
  MapImage: Yup.mixed()
    .required('Map Image is required')
    .test('fileSize', 'File more than 2 MB not Allowed', value => value && value.size <= 2 * 1024 * 1024)
})

// Tax Schema
export const addTaxSchema = Yup.object({
  lable: Yup.string().max(200, 'Entered text is too long').required('Lable is required'),
  percentage: Yup.string().required('percentage is required'),
  isActive: Yup.string().required('Please Select Status')
})

// Notification
export const notificationSchema = Yup.object({
  title: Yup.string().max(200, 'Entered text is too long').required('Title is required'),
  message: Yup.string().required('Message is required')
})
