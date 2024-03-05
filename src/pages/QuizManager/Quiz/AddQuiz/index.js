/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable lines-around-comment */
import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { FormikProvider, useFormik } from 'formik'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import 'react-datepicker/dist/react-datepicker.css'
import styled from '@emotion/styled'
import { addQuizSchema } from 'src/schemas'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Editor from '../../../Editor'
import QuestionBySubject from '../QuestionBySubject'
import { useRouter } from 'next/router'
import {
  clearAllSubjectQuestion,
  createQuiz,
  GetAllQuizCategory,
  getAllQuizCategoryDropdown,
  getQuizById,
  updateQuiz
} from 'src/store/slices/QuizSlice'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { img_url } from 'src/common/Service'
import Toast from 'src/pages/Common/Toast'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 250,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ImgLogo = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const AddQuiz = ({ popperPlacement }) => {
  const dispatch = useDispatch()
  const AllSubject = useSelector(state => state.LearningSlice.allSubjects)
  // ** State
  const [open, setOpen] = useState(false)
  const [imageData, setImageData] = useState('')
  const [imageData1, setImageData1] = useState('')
  const [imageData2, setImageData2] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isEdit1, setIsEdit1] = useState(false)
  const [isEdit2, setIsEdit2] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [imgUndefined, setImgUndefined] = useState(false)
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [imgSrc2, setImgSrc2] = useState('/admin/images/Banner.png')
  const [BannerSrc, setBannerSrc] = useState('/admin/images/Banner.png')
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [imgPrw, setImgPrw] = useState(false)
  const [imgPrw2, setImgPrw2] = useState(false)
  // console.log('🚀  imgPrw:', imgPrw)
  const [imgPrw1, setImgPrw1] = useState(false)
  const [getQuizData, setQuizData] = useState([])
  const [data, setData] = useState([''])
  const router = useRouter()
  const theme = useTheme()

  const _id = localStorage.getItem('id')
  const id = localStorage.getItem('subjectID')
  const params = router.query.AddQuiz

  const Question = localStorage.getItem('Question')

  // const quizById = useSelector(state => state.QuizSlice?.quizById)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const QuizCategory = useSelector(state => state.QuizSlice.getAllQuizCategoryDropdown)
  const quizById = useSelector(state => state.QuizSlice.quizById)

  const subId = quizById?.SubjectId

  const handleData = childData => {
    setData(childData)
  }

  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        if (file.target.id == 'account-settings-upload-image') {
          setBannerSrc(reader.result)
          setImgPrw1(true)
        } else if (file.target.id == 'account-settings-upload-image2') {
          setImgPrw2(true)
          setImgSrc2(reader.result)
        } else {
          setImgSrc(reader.result)
          setImgPrw(true)
        }
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
    // if (_id) {
    //   setImgPrw(true)
    //   setImgPrw1(true)
    // }
  }

  const initialValues = {
    QuizName: '',
    Description: '',
    Instruction: '',
    Score: '0',
    BannerImage: '',
    Logo: '',
    Question: [],
    Status: true,
    QuizCategoryId: '',
    ListingIcon: ''
  }

  useEffect(() => {
    dispatch(getQuizById(_id)).then(res => {
      if (res?.payload?.status === 200) {
        const quizById = res?.payload?.Data
        localStorage.setItem('Question', JSON.stringify(quizById?.questionIds))
        // console.log('🚀 ~ file: [AddQuiz].js:152 ~ dispatch ~ quizById:', quizById)
        setImageData(quizById?.BannerImage)
        setImageData1(quizById?.Logo)
        setImageData2(quizById?.ListingIcon)
        setQuizData(quizById)
        let arrayOfObjects = res?.payload?.Data?.Question
        const idArray = []
        arrayOfObjects?.map(obj => {
          idArray.push(obj?._id)
        })
        fetch(quizById?.BannerImage)
          .then(res => {
            res.blob()
          })
          .then(blob => {
            let file = new File([blob], `${quizById.BannerImage}`)
            let fileLogo = new File([blob], `${quizById.Logo}`)
            let fileIcon = new File([blob], `${quizById.ListingIcon}`)
            formik.setFieldValue('QuizName', quizById?.QuizName)
            formik.setFieldValue('Description', quizById?.Description)
            formik.setFieldValue('Instruction', quizById?.Instruction)
            formik.setFieldValue('BannerImage', file)
            formik.setFieldValue('Logo', fileLogo)
            formik.setFieldValue('ListingIcon', fileIcon)
            formik.setFieldValue('Question', idArray)
            formik.setFieldValue('Status', quizById?.Status)
            formik.setFieldValue('QuizCategoryId', quizById?.QuizCategoryId)
            formik.setFieldValue('Score', quizById?.Score)
            if (quizById?.BannerImage === undefined) {
              setBannerSrc(
                'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
              )
              setImgPrw(true)
              setImgPrw1(true)
              setImgSrc(
                'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
              )
            } else {
              setBannerSrc(quizById?.BannerImage)
              setImgSrc(quizById?.Logo)
            }
            if (quizById?.ListingIcon === undefined) {
              setImgPrw2(true)
              setImgSrc2(
                'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
              )
            } else {
              setImgSrc2(quizById?.ListingIcon)
            }
          })
      }
    })
  }, [dispatch, _id])

  // ** for submitting form values
  const handleSubmit = async values => {
    let data = new FormData()
    // data.append('SubjectId', id)
    function addBorderCollapseToTable(htmlContent) {
      let parser = new DOMParser()
      let doc = parser.parseFromString(htmlContent, 'text/html')
      let tables = doc.querySelectorAll('figure.table table')

      tables.forEach(table => {
        table.style.borderCollapse = 'collapse'
      })

      return new XMLSerializer().serializeToString(doc)
    }
    data.append('QuizName', formik?.values?.QuizName)
    data.append('Description', formik?.values?.Description)
    data.append('Instruction', addBorderCollapseToTable(formik?.values?.Instruction))
    // data.append('BannerImage', formik?.values?.BannerImage)
    data.append('BannerImage', isEdit ? formik?.values.BannerImage : imageData)
    data.append('Logo', isEdit1 ? formik?.values.Logo : imageData1)
    data.append('ListingIcon', isEdit2 ? formik?.values.ListingIcon : imageData2)
    data.append('Score', formik?.values?.Score)
    data.append('Question', Question)
    data.append('QuizCategoryId', formik?.values?.QuizCategoryId || '')
    data.append('Status', formik?.values?.Status)
    if (_id) {
      data.append('_id', _id)
      data.append('SubjectId', getQuizData?.SubjectId?.trim())
    } else {
      data.append('SubjectId', id)
    }
    // console.log('quiz data', Object.fromEntries(data))

    const action = _id ? updateQuiz(data) : createQuiz(data)

    dispatch(action).then(res => {
      if (res?.payload?.status === 200) {
        if (_id) {
          Toast({ response: res, update: true }) // toast the success message
        } else {
          Toast({ response: res }) // toast the success message
        }
        dispatch(clearAllSubjectQuestion())
        router.push('/QuizManager/Quiz')
        localStorage.removeItem('Question')
        localStorage.removeItem('subjectID')
        localStorage.removeItem('id')
      } else {
        Toast({ response: res, error: true }) // toast the error message
      }
    })
  }

  // ** formik state to handle form data
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: addQuizSchema,
    onSubmit: values => {
      // console.log('🚀 ~ file: AddQuiz.js:284 ~ AddQuiz ~ values:', values)
      handleSubmit(values)
    }
  })

  useEffect(() => {
    if (_id) {
      dispatch(getAllQuizCategoryDropdown({ SubjectId: subId }))
    } else {
      dispatch(getAllQuizCategoryDropdown({ SubjectId: id }))
    }
  }, [quizById])

  useEffect(() => {
    setEditorLoaded(true)
  }, [setEditorLoaded])

  return (
    <>
      {params == 'ViewQuiz' ? (
        <div>
          <Card>
            <CardHeader title='View Quiz' />
            <Divider />
            <CardContent>
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          // placeholder='Dhruv'
                          label='Quiz Name'
                          type='text'
                          name='QuizName'
                          aria-describedby='validation-basic-first-name'
                          value={formik?.values?.QuizName}
                          onBlur={formik?.handleBlur}
                          onChange={formik?.handleChange}
                          InputProps={{ readOnly: true, disableUnderline: true }}
                        />
                        {formik?.errors.QuizName && formik?.touched.QuizName ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik?.errors.QuizName}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                        <RadioGroup
                          disabled
                          aria-label='Status'
                          name='Status'
                          value={
                            formik.values.Status == 'true'
                              ? (formik.values.Status = true)
                              : formik.values.Status == 'false'
                              ? (formik.values.Status = false)
                              : null
                          }
                          row
                        >
                          <FormControlLabel
                            value={'true'}
                            checked={formik.values.Status === true}
                            control={<Radio color='primary' />}
                            label='Active'
                            labelPlacement='end'
                          />
                          <FormControlLabel
                            value={'false'}
                            checked={formik.values.Status === false}
                            control={<Radio color='primary' />}
                            label='InActive'
                            labelPlacement='end'
                          />
                        </RadioGroup>
                      </div>
                      {formik?.errors.Status && formik?.touched.Status ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik?.errors.Status}
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          // placeholder='Dhruv'
                          label='Description'
                          type='text'
                          name='Description'
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.Description}
                          onBlur={formik?.handleBlur}
                          onChange={formik?.handleChange}
                        />
                        {formik?.errors.Description && formik?.touched.Description ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik?.errors.Description}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                          Quiz Category
                        </InputLabel>
                        <Select
                          readOnly
                          label='Quiz Category'
                          name='QuizCategoryId'
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                          value={formik.values.QuizCategoryId}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        >
                          {QuizCategory.map(item => (
                            <MenuItem key={item} value={`${item._id}`}>
                              {item.QuizCategoryName}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.errors.QuizCategoryId && formik.touched.QuizCategoryId ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.QuizCategoryId}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Quiz Instruction</h4>
                        <Editor
                          value={formik?.values?.Instruction}
                          name='Instruction'
                          editorLoaded={editorLoaded}
                          onChange={v => {
                            formik.setFieldValue('Instruction', v)
                          }}
                        />
                        {formik?.errors.Instruction && formik?.touched.Instruction ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik?.errors.Instruction}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Quiz Logo</h4>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {_id && imgPrw === false ? (
                            <ImgStyled src={`${img_url}${imgSrc}`} alt='db Pic' />
                          ) : imgPrw === true ? (
                            <ImgStyled src={imgSrc} alt='preivie Pic' />
                          ) : (
                            <ImgStyled src={imgSrc} alt='Profile Pic' />
                          )}
                          <div>
                            <Typography sx={{ mt: 5, color: 'error.main' }}>
                              {formik?.touched.Logo && formik?.errors.Logo ? <div>{formik?.errors.Logo}</div> : null}
                            </Typography>
                          </div>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Quiz Banner</h4>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {_id && imgPrw === false ? (
                            <ImgStyled src={`${img_url}${BannerSrc}`} alt='db Pic' />
                          ) : imgPrw === true ? (
                            <ImgStyled src={BannerSrc} alt='undefined Pic' />
                          ) : (
                            <ImgStyled src={BannerSrc} alt='Profile Pic' />
                          )}
                          <div>
                            <Typography sx={{ mt: 5, color: 'error.main' }}>
                              {formik?.touched?.BannerImage && formik?.errors?.BannerImage ? (
                                <div>{formik?.errors?.BannerImage}</div>
                              ) : null}
                            </Typography>
                          </div>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Quiz Icon</h4>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {_id && imgPrw2 === false ? (
                            <ImgStyled src={`${img_url}${imgSrc2}`} alt='db Pic' />
                          ) : imgPrw2 === true ? (
                            <ImgStyled src={imgSrc2} alt='preivie Pic' />
                          ) : (
                            <ImgStyled
                              src={!formik?.errors?.ListingIcon ? `${imgSrc2}` : '/admin/images/Banner.png'}
                              alt='Profile Pic'
                            />
                          )}
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <QuestionBySubject onData={handleData} quizById={getQuizData} formik={formik} />
                      </FormControl>
                      {formik?.errors.Question && formik?.touched.Question ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik?.errors.Question}
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    {/* <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <TextField
                          label='Quiz Total Score'
                          type='number'
                          name='Score'
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik?.values?.Score}
                          onBlur={formik?.handleBlur}
                          onChange={formik?.handleChange}
                        />
                        {formik?.errors.Score && formik?.touched.Score ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik?.errors.Score}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid> */}

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link prefetch={false} href='/QuizManager/Quiz' style={{ textDecoration: 'none' }}>
                          <Button
                            size='large'
                            onClick={() => {
                              localStorage.removeItem('id'),
                                localStorage.removeItem('Question'),
                                localStorage.removeItem('subjectID')
                              dispatch(clearAllSubjectQuestion())
                            }}
                            variant='contained'
                            style={{ marginRight: '10px' }}
                          >
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </FormikProvider>
              {/* )}
          </Formik> */}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <Card>
            <CardHeader title={_id ? 'Edit Quiz' : 'Add Quiz'} />
            <Divider />
            <CardContent>
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          value={formik?.values?.QuizName}
                          onBlur={formik?.handleBlur}
                          onChange={formik?.handleChange}
                          placeholder='Quiz Name'
                          label='Quiz Name'
                          type='text'
                          name='QuizName'
                          aria-describedby='validation-basic-first-name'
                        />
                        {formik?.errors.QuizName && formik?.touched.QuizName ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik?.errors.QuizName}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ margin: '0', padding: '0 10px' }}> Status :- </h4>
                        <RadioGroup
                          disabled
                          aria-label='Status'
                          name='Status'
                          value={
                            formik.values.Status == 'true'
                              ? (formik.values.Status = true)
                              : formik.values.Status == 'false'
                              ? (formik.values.Status = false)
                              : null
                          }
                          row
                          onChange={e => {
                            formik.setFieldValue('Status', e.target.value)
                          }}
                        >
                          <FormControlLabel
                            value={'true'}
                            checked={formik.values.Status === true}
                            control={<Radio color='primary' />}
                            label='Active'
                            labelPlacement='end'
                          />
                          <FormControlLabel
                            value={'false'}
                            checked={formik.values.Status === false}
                            control={<Radio color='primary' />}
                            label='InActive'
                            labelPlacement='end'
                          />
                        </RadioGroup>
                      </div>
                      {formik?.errors.Status && formik?.touched.Status ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik?.errors.Status}
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          value={formik.values.Description}
                          onBlur={formik?.handleBlur}
                          onChange={formik?.handleChange}
                          placeholder='Description'
                          label='Description'
                          type='text'
                          name='Description'
                          aria-describedby='validation-basic-first-name'
                        />
                        {formik?.errors.Description && formik?.touched.Description ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik?.errors.Description}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                          Quiz Category
                        </InputLabel>
                        <Select
                          label='Quiz Category'
                          name='QuizCategoryId'
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                          value={formik.values.QuizCategoryId}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        >
                          {QuizCategory?.map(item => (
                            <MenuItem key={item} value={`${item._id}`}>
                              {item.QuizCategoryName}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.errors.QuizCategoryId && formik.touched.QuizCategoryId ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.QuizCategoryId}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Quiz Instruction</h4>
                        <Editor
                          value={formik?.values?.Instruction}
                          name='Instruction'
                          editorLoaded={editorLoaded}
                          onChange={v => {
                            formik.setFieldValue('Instruction', v)
                          }}
                        />
                        {formik?.errors.Instruction && formik?.touched.Instruction ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik?.errors.Instruction}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Quiz Logo & Banner</h4>
                      <Typography sx={{ color: 'red' }} style={{ fontSize: '13px' }}>
                        Note :- you can upload only .jpg, .jpeg and .png file format and file max size (144px X 87px)
                        should be up to 2 MB.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {_id && imgPrw === false ? (
                            <ImgStyled src={`${img_url}${imgSrc}`} alt='db Pic' />
                          ) : imgPrw === true ? (
                            <ImgStyled src={imgSrc} alt='preivie Pic' />
                          ) : (
                            <ImgStyled
                              src={!formik?.errors?.Logo ? `${imgSrc}` : '/admin/images/Banner.png'}
                              alt='Profile Pic'
                            />
                          )}
                          <div>
                            <ButtonStyled
                              component='label'
                              variant='contained'
                              htmlFor='account-settings-upload-image1'
                            >
                              Upload Logo
                              <input
                                hidden
                                type='file'
                                name='Logo'
                                value={inputValue}
                                accept='image/png, image/jpeg, image/jpg'
                                onChange={event => {
                                  handleInputImageChange(event)
                                  setIsEdit1(true)
                                  // setImgPrw(true)
                                  // params == 'EditQuiz' ? setImgPrw(false) : null
                                  formik.setFieldValue('Logo', event.currentTarget.files[0])
                                }}
                                id='account-settings-upload-image1'
                              />
                            </ButtonStyled>

                            {/* <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                            Reset
                          </ResetButtonStyled> */}

                            {formik?.errors.Logo && formik?.touched.Logo ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik?.errors.Logo}
                              </FormHelperText>
                            ) : null}
                          </div>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {_id && imgPrw1 === false ? (
                            <ImgStyled src={`${img_url}${BannerSrc}`} alt='db Pic' />
                          ) : imgPrw1 === true ? (
                            <ImgStyled src={BannerSrc} alt='undefined Pic' />
                          ) : (
                            <ImgStyled
                              src={!formik.errors.BannerSrc ? `${BannerSrc}` : '/admin/images/Banner.png'}
                              alt='Profile Pic'
                            />
                          )}
                          <div>
                            <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                              Upload Banner
                              <input
                                hidden
                                type='file'
                                name='BannerImage'
                                value={inputValue}
                                accept='image/png, image/jpeg'
                                onChange={event => {
                                  handleInputImageChange(event)
                                  setIsEdit(true)
                                  // setImgPrw(true)
                                  // params == 'EditQuiz' ? setImgPrw(false) : null
                                  formik.setFieldValue('BannerImage', event.currentTarget.files[0])
                                }}
                                id='account-settings-upload-image'
                              />
                            </ButtonStyled>
                            {/* <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                            Reset
                          </ResetButtonStyled> */}

                            {formik?.errors.BannerImage && formik?.touched.BannerImage ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik?.errors.BannerImage}
                              </FormHelperText>
                            ) : null}
                          </div>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Quiz Icon</h4>
                      <Typography sx={{ color: 'red' }} style={{ fontSize: '13px' }}>
                        Note :- you can upload only .jpg, .jpeg and .png file format and file max size (144px X 87px)
                        should be up to 2 MB.
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {_id && imgPrw2 === false ? (
                            <ImgStyled src={`${img_url}${imgSrc2}`} alt='db Pic' />
                          ) : imgPrw2 === true ? (
                            <ImgStyled src={imgSrc2} alt='preivie Pic' />
                          ) : (
                            <ImgStyled
                              src={!formik?.errors?.ListingIcon ? `${imgSrc2}` : '/admin/images/Banner.png'}
                              alt='Profile Pic'
                            />
                          )}
                          <div>
                            <ButtonStyled
                              component='label'
                              variant='contained'
                              htmlFor='account-settings-upload-image2'
                            >
                              Upload Icon
                              <input
                                hidden
                                type='file'
                                name='ListingIcon'
                                value={inputValue}
                                accept='image/png, image/jpeg, image/jpg'
                                onChange={event => {
                                  handleInputImageChange(event)
                                  setIsEdit2(true)
                                  // setImgPrw(true)
                                  // params == 'EditQuiz' ? setImgPrw(false) : null
                                  formik.setFieldValue('ListingIcon', event.currentTarget.files[0])
                                }}
                                id='account-settings-upload-image2'
                              />
                            </ButtonStyled>

                            {/* <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                            Reset
                          </ResetButtonStyled> */}

                            {formik?.errors.ListingIcon && formik?.touched.ListingIcon ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik?.errors.ListingIcon}
                              </FormHelperText>
                            ) : null}
                          </div>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <QuestionBySubject onData={handleData} quizById={getQuizData} formik={formik} />
                      </FormControl>
                      {formik?.errors.Question && formik?.touched.Question ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik?.errors.Question}
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    {/* <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <TextField
                          label='Quiz Total Score'
                          type='number'
                          name='Score'
                          aria-describedby='validation-basic-first-name'
                          // disabled
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik?.values?.Score}
                          onBlur={formik?.handleBlur}
                          onChange={formik?.handleChange}
                        />
                        {formik?.errors.Score && formik?.touched.Score ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik?.errors.Score}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid> */}

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        {!_id ? (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Save
                          </Button>
                        ) : (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Update
                          </Button>
                        )}
                        <Link prefetch={false} href='/QuizManager/Quiz' style={{ textDecoration: 'none' }}>
                          <Button
                            size='large'
                            onClick={() => {
                              localStorage.removeItem('id'),
                                localStorage.removeItem('Question'),
                                localStorage.removeItem('subjectID')
                              dispatch(clearAllSubjectQuestion())
                            }}
                            variant='contained'
                          >
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </FormikProvider>
              {/* )}
          </Formik> */}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default AddQuiz
