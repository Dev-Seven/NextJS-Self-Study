/* eslint-disable lines-around-comment */
// 1001 === 02.03.2023 === Get Value of form === Dhruv //

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import PickersComponent from 'src/views/pages/datepicker/PickersComponent'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { SubscriptionSchema } from 'src/schemas'
import {
  CreateSubcription,
  getAllSubject,
  GetSubscriptionById,
  UpdateSubscription
} from 'src/store/slices/LearningSlice'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import moment from 'moment'
import FallbackSpinner from 'src/@core/components/spinner'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import Editor from '../../../Editor'
import { JSONToFormData } from 'src/store/Utilities/Functions'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Toast from 'src/pages/Common/Toast'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const AddSubscription = ({ popperPlacement }) => {
  // 1001 START

  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  const [dateClear, setDateClear] = useState(new Date())
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  // const { id, view } = router.query
  const id = localStorage.getItem('id')
  // const params = router.query.AddSubscription
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]

  // Editor start

  const [text, setText] = useState()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [editorLoaded, setEditorLoaded] = useState(false)

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const handleDropdownChange = event => {
    const { value } = event.target
    formik.setFieldValue('SubjectId', value)
  }

  // ** selectors to retrieve data from redux
  const AllSubject = useSelector(state => state.LearningSlice.allSubjects)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  useEffect(() => {
    dispatch(getAllSubject())
  }, [dispatch])

  const onEditorStateChange = function (editorState) {
    setEditorState(editorState)
    let text = editorState.getCurrentContent().getPlainText('\u0001')
    setText(text)
  }

  const [error, setError] = useState()
  const hasText = editorState.getCurrentContent().hasText()

  const initialValues = {
    SubscriptionTitle: '',
    SubjectId: [],
    Amount: '',
    SubscriptionDetail: '',
    StartDate: '',
    EndDate: '',
    Duration: ''
  }

  // ** useEffect to handle form data during edit
  useEffect(() => {
    dispatch(GetSubscriptionById(id)).then(res => {
      if (id) {
        let updateData = res.payload.data
        formik.setFieldValue('SubscriptionTitle', updateData.SubscriptionTitle)
        formik.setFieldValue('SubjectId', updateData.SubjectId)
        formik.setFieldValue('Duration', updateData.Duration)
        formik.setFieldValue('Amount', updateData.Amount)
        formik.setFieldValue('SubscriptionDetail', updateData.SubscriptionDetail)
        formik.setFieldValue('StartDate', moment(updateData.StartDate).local().toDate())
        formik.setFieldValue('EndDate', moment(updateData.EndDate).local().toDate())
        setSelectedStartDate(moment(updateData.StartDate).local().toDate())
        setSelectedEndDate(moment(updateData.EndDate).local().toDate())
      }
    })
  }, [dispatch, id])

  // ** function to handle form submit
  const handleSubmit = async values => {
    let data = new FormData()
    data.append('SubscriptionTitle', values.SubscriptionTitle)
    data.append('SubjectId', JSON.stringify(values.SubjectId))
    data.append('Duration', values.Duration)
    data.append('Amount', values.Amount)
    data.append('StartDate', moment(values.StartDate).toISOString())
    data.append('EndDate', moment(values.EndDate).toISOString())
    data.append('SubscriptionDetail', values.SubscriptionDetail)
    if (id) {
      data.append('_id', id)
    }

    // console.log('🚀 ~ file: [AddSubscription].js:139 ~ handleSubmit ~ data:', Object.fromEntries(data))
    const action = id ? UpdateSubscription(data) : CreateSubcription(data)

    dispatch(action).then(res => {
      if (res?.payload?.status === 200) {
        if (id) {
          Toast({ response: res, update: true }) // toast the success message
        } else {
          Toast({ response: res }) // toast the success message
        }
        router.push('/Subscription-plan/Subscriptions/')
      } else {
        Toast({ response: res, error: true }) // toast the error message
      }
    })
  }

  // ** formik state to handle form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: SubscriptionSchema,
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader title={id ? 'Edit Subscription' : 'Add Subscription'} />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit} autoComplete='off'>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        label='Subscription Title'
                        type='text'
                        name='SubscriptionTitle'
                        placeholder='Subscription Title'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.SubscriptionTitle}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: params == 'ViewSubscription' ? true : false }}
                      />
                      {formik.errors.SubscriptionTitle && formik.touched.SubscriptionTitle ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.SubscriptionTitle}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                        Subscription Plan
                      </InputLabel>
                      <Select
                        value={formik.values.Duration}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label='Subscription Plan'
                        name='Duration'
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                        readOnly={params == 'ViewSubscription' ? true : false}
                      >
                        <MenuItem value='1 Month'>1 Month</MenuItem>
                        <MenuItem value='3 Month'>3 Month</MenuItem>
                        <MenuItem value='6 Month'>6 Month</MenuItem>
                        <MenuItem value='12 Month'>1 Year</MenuItem>
                      </Select>
                      {formik.errors.Duration && formik.touched.Duration ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Duration}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='demo-multiple-name-label'>Subject</InputLabel>
                      <Select
                        multiple
                        label='Subject'
                        name='SubjectId'
                        MenuProps={MenuProps}
                        labelId='demo-multiple-chip-label'
                        id='demo-multiple-chip'
                        onChange={event => handleDropdownChange(event)}
                        value={formik.values.SubjectId}
                        onBlur={formik.handleBlur}
                        readOnly={params == 'ViewSubscription' ? true : false}
                      >
                        {AllSubject?.map(item => (
                          <MenuItem key={item} value={`${item._id}`}>
                            {item.SubjectName}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <Select
                        labelId='demo-multiple-chip-label'
                        id='demo-multiple-chip'
                        multiple
                        name='SubjectId'
                        onBlur={formik.handleBlur}
                        readOnly={params == 'ViewSubscription' ? true : false}
                        value={formik.values.SubjectId}
                        onChange={event => handleDropdownChange(event)}
                        input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map(item => (
                              <Chip key={item} label={item} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {AllSubject.map(item => (
                          <MenuItem key={item} value={`${item._id}`}>
                            {item.SubjectName}
                          </MenuItem>
                        ))}
                      </Select> */}
                      {formik.errors.SubjectId && formik.touched.SubjectId ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.SubjectId}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        label='Subscription Amount'
                        placeholder='Subscription Amount'
                        name='Amount'
                        type='number'
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
                          readOnly: params == 'ViewSubscription' ? true : false
                        }}
                        aria-describedby='validation-basic-last-name'
                        value={formik.values.Amount}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.Amount && formik.touched.Amount ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Amount}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Subscription Validity</h4>
                    <DatePickerWrapper>
                      <EditorWrapper>
                        <DatePicker
                          readOnly={params == 'ViewSubscription' ? true : false}
                          showYearDropdown
                          showMonthDropdown
                          id='picker-clear'
                          name='StartDate'
                          dateFormat='d/MM/yyyy'
                          placeholderText='Start Date'
                          selected={selectedStartDate}
                          popperPlacement={popperPlacement}
                          customInput={<PickersComponent label='Start Date' />}
                          onBlur={formik.handleBlur}
                          type='date'
                          onChange={date => {
                            setDateClear(date)
                            setSelectedStartDate(date)
                            const convertedDate = moment.parseZone(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                            formik.setFieldValue('StartDate', convertedDate)
                          }}
                        />
                        {formik.errors.StartDate && formik.touched.StartDate ? (
                          <FormHelperText sx={{ color: 'error.main' }} style={{ marginLeft: '14px' }}>
                            {formik.errors.StartDate}
                          </FormHelperText>
                        ) : null}
                      </EditorWrapper>
                    </DatePickerWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6} style={{ marginTop: '1.6rem' }}>
                    <DatePickerWrapper>
                      <EditorWrapper>
                        <DatePicker
                          readOnly={params == 'ViewSubscription' ? true : false}
                          showYearDropdown
                          showMonthDropdown
                          id='picker-clear'
                          placeholderText='End Date'
                          name='EndDate'
                          dateFormat='d/MM/yyyy'
                          selected={selectedEndDate}
                          popperPlacement={popperPlacement}
                          customInput={<PickersComponent label='End Date' />}
                          onBlur={formik.handleBlur}
                          type='date'
                          onChange={date => {
                            setDateClear(date)
                            setSelectedEndDate(date)
                            const convertedDate = moment.parseZone(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                            formik.setFieldValue('EndDate', convertedDate)
                          }}
                        />
                        {formik.errors.EndDate && formik.touched.EndDate ? (
                          <FormHelperText sx={{ color: 'error.main' }} style={{ marginLeft: '14px' }}>
                            {formik.errors.EndDate}
                          </FormHelperText>
                        ) : null}
                      </EditorWrapper>
                    </DatePickerWrapper>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Subscription Content</h4>
                      <Editor
                        value={formik?.values?.SubscriptionDetail}
                        name='SubscriptionDetail'
                        editorLoaded={editorLoaded}
                        onChange={v => {
                          formik?.setFieldValue('SubscriptionDetail', v)
                        }}
                        onBlur={() => {
                          formik?.setFieldTouched('SubscriptionDetail', true)
                        }}
                        view={params == 'ViewSubscription' ? true : false}
                      />
                      {formik.errors.SubscriptionDetail && formik.touched.SubscriptionDetail ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.SubscriptionDetail}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  {params == 'ViewSubscription' ? (
                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link
                          prefetch={false}
                          href='/Subscription-plan/Subscriptions/'
                          style={{ textDecoration: 'none' }}
                        >
                          <Button size='large' variant='contained' style={{ marginRight: '10px' }}>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  ) : (
                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        {!id ? (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Save
                          </Button>
                        ) : (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Update
                          </Button>
                        )}
                        <Link
                          prefetch={false}
                          href='/Subscription-plan/Subscriptions/'
                          style={{ textDecoration: 'none' }}
                        >
                          <Button size='large' onClick={() => localStorage.removeItem('id')} variant='contained'>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default AddSubscription
