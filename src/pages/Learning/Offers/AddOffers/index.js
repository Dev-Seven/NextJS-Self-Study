/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { offerCouponSchema, offerWithAmount } from 'src/schemas'
import EditorControlled from 'src/views/pages/editor/TextEditor'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import 'react-datepicker/dist/react-datepicker.css'
import PickersComponent from 'src/views/pages/datepicker/PickersComponent'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import CardSnippet from 'src/@core/components/card-snippet'
import styled from '@emotion/styled'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { generateCode, JSONToFormData } from 'src/store/Utilities/Functions'
import { addCoupon, editCoupon, getCouponById } from 'src/store/slices/LearningSlice'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import { img_url } from 'src/common/Service'
import { useTheme } from '@mui/material/styles'
import Toast from 'src/pages/Common/Toast'
import Banner from 'src/pages/Common/Banner'

/* ╭────────────────────────────╮ */
/* │    banner uplode star      │ */
/* ╰────────────────────────────╯ */
// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

// second uploder
const ImgStyled = styled('img')(({ theme }) => ({
  width: 250,
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

const AddOffers = ({ popperPlacement }) => {
  // ** State
  const [files, setFiles] = useState([])
  const [dateClear, setDateClear] = useState(new Date())
  const [code, setCode] = useState('')
  const [imgPrw, setImgPrw] = useState(false)
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const theme = useTheme()
  const dispatch = useDispatch()
  const router = useRouter()

  // ** To retrieve data from the query params
  const id = localStorage.getItem('id')
  const params = router.query.AddOffers

  // ** selectors to retrieve data from redux
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const couponById = useSelector(state => state.LearningSlice?.couponById)

  // second uploder state
  // ** State
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [apiImgPath, setApiImgPath] = useState('')
  const [preview, setPreview] = useState(null)

  // ** useEffect to handle form data during edit
  useEffect(() => {
    if (id) {
      dispatch(getCouponById(id)).then(res => {
        const dataById = res?.payload?.data
        setApiImgPath(dataById?.BannerImage)
        if (dataById) {
          fetch(dataById?.BannerImage)
            .then(res => {
              res.blob()
            })
            .then(blob => {
              let file = new File([blob], `${dataById?.BannerImage}`)
              formik.setFieldValue('CouponTitle', dataById?.CouponTitle)
              formik.setFieldValue('DescountType', dataById?.DescountType)
              formik.setFieldValue('MaxUser', dataById?.MaxUser)
              formik.setFieldValue('DescountValue', dataById?.DescountValue)
              formik.setFieldValue('StartDate', moment(dataById?.StartDate).local().toDate())
              formik.setFieldValue('EndDate', moment(dataById?.EndDate).local().toDate())
              formik.setFieldValue('CouponCode', dataById?.CouponCode)
              formik.setFieldValue('BannerImage', file)
              setSelectedStartDate(moment(dataById?.StartDate).local().toDate())
              setSelectedEndDate(moment(dataById?.EndDate).local().toDate())
              setImgSrc(dataById?.BannerImage)
            })
        }
      })
    }
  }, [dispatch, id])

  // ** function to generate random new code on click
  const handleClick = () => {
    const newCode = generateCode()
    setCode(newCode)
    formik.setFieldValue('CouponCode', newCode.toUpperCase())
  }

  // ** function to handle form Submit
  const handleSubmit = async (values, actions) => {
    let data = new FormData()
    data.append('CouponTitle', values.CouponTitle)
    data.append('DescountType', values.DescountType)
    data.append('MaxUser', values.MaxUser)
    data.append('DescountValue', values.DescountValue)
    data.append('StartDate', moment(values.StartDate).toISOString())
    data.append('EndDate', moment(values.EndDate).toISOString())
    data.append('CouponCode', values.CouponCode)
    data.append('BannerImage', isEdit ? values.BannerImage : apiImgPath)
    if (id) {
      data.append('_id', id)
    }

    const action = id ? editCoupon(data) : addCoupon(data)

    dispatch(action).then(res => {
      if (res.payload.status === 200) {
        if (id) {
          Toast({ response: res, update: true }) // toast the success message
        } else {
          Toast({ response: res }) // toast the success message
        }
        router.push('/Learning/Offers')
      } else {
        Toast({ response: res, error: true }) // toast the error message
      }
    })
  }

  // ** implementation of formik
  const initialValues = {
    CouponTitle: '',
    DescountType: 'Fix',
    MaxUser: '',
    DescountValue: '',
    StartDate: '',
    EndDate: '',
    CouponCode: '',
    BannerImage: null
  }

  // ** formik to handle form state
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: open ? offerCouponSchema : offerWithAmount,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  useEffect(() => {
    if (formik?.values?.DescountType === 'Percentage') {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [formik?.values?.DescountType])

  return (
    <div>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <Card>
          <CardHeader title={id ? (params == 'ViewOffers' ? 'View Offer' : 'Edit Offer') : 'Add Offer'} />
          <Divider />
          <CardContent>
            <form onSubmit={formik.handleSubmit} autoComplete='off'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      placeholder='Coupon Title'
                      label='Coupon Title'
                      name='CouponTitle'
                      type='text'
                      aria-describedby='validation-basic-first-name'
                      value={formik.values.CouponTitle}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      InputProps={{ readOnly: params == 'ViewOffers' ? true : false, disableUnderline: true }}
                    />
                    {formik.errors.CouponTitle && formik.touched.CouponTitle ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.CouponTitle}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      value={formik.values.MaxUser}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      // error={Boolean(formik.errors.MaxUsers)}
                      placeholder='Maximum Number of Users'
                      label='Maximum Number of Users'
                      type='number'
                      name='MaxUser'
                      aria-describedby='validation-basic-first-name'
                      InputProps={{ readOnly: params == 'ViewOffers' ? true : false, disableUnderline: true }}
                    />
                    {formik.errors.MaxUser && formik.touched.MaxUser ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.MaxUser}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      // error={Boolean(errors.select)}
                      id='validation-basic-select'
                      htmlFor='validation-basic-select'
                    >
                      Discount Type
                    </InputLabel>
                    <Select
                      value={formik.values.DescountType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      // error={Boolean(errors.select)}
                      label='Discount Type'
                      name='DescountType'
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                      readOnly={params == 'ViewOffers' ? true : false}
                    >
                      <MenuItem name='descountOption' value='Fix' selected='true'>
                        Rupee
                      </MenuItem>
                      <MenuItem name='descountOption' value='Percentage'>
                        Percentage
                      </MenuItem>
                    </Select>
                    {formik.errors.DescountType && formik.touched.DescountType ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.DescountType}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                {formik?.values?.DescountType === 'Percentage' ? (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        value={formik.values.DescountValue}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        // error={Boolean(formik.errors.offerPrice)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>%</InputAdornment>,
                          readOnly: params == 'ViewOffers' ? true : false
                        }}
                        placeholder='Value'
                        label='Value'
                        name='DescountValue'
                        type='number'
                        aria-describedby='validation-basic-first-name'
                      />
                      {formik.errors.DescountValue && formik.touched.DescountValue ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.DescountValue}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        value={formik.values.DescountValue}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        // error={Boolean(formik.errors.offerPrice)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
                          readOnly: params == 'ViewOffers' ? true : false
                        }}
                        placeholder='Amount'
                        label='Amount'
                        name='DescountValue'
                        type='number'
                        aria-describedby='validation-basic-first-name'
                      />
                      {formik.errors.DescountValue && formik.touched.DescountValue ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.DescountValue}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                )}

                <Grid item xs={12} sm={3}>
                  <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Offer Validity</h4>
                  <DatePickerWrapper>
                    <EditorWrapper>
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        readOnly={params == 'ViewOffers' ? true : false}
                        id='picker-clear'
                        name='StartDate'
                        dateFormat='d/MM/yyyy'
                        placeholderText='Start Date'
                        selected={selectedStartDate}
                        popperPlacement={popperPlacement}
                        customInput={<PickersComponent label='Start Date' />}
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

                <Grid item xs={12} sm={3} style={{ marginTop: '1.6rem' }}>
                  <DatePickerWrapper>
                    <EditorWrapper>
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        readOnly={params == 'ViewOffers' ? true : false}
                        id='picker-clear'
                        name='EndDate'
                        dateFormat='d/MM/yyyy'
                        placeholderText='End Date'
                        selected={selectedEndDate}
                        popperPlacement={popperPlacement}
                        customInput={<PickersComponent label='End Date' />}
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

                <Grid item xs={12} sm={6} style={{ marginTop: '1.6rem' }}>
                  <FormControl className='addbtn'>
                    <div>
                      {params == 'ViewOffers' ? null : (
                        <Button variant='contained' onClick={handleClick} style={{ height: '53px' }}>
                          Generate
                        </Button>
                      )}
                      <TextField
                        style={{ marginLeft: '8px' }}
                        value={formik.values.CouponCode}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        // error={formik.errors.offerCode}
                        placeholder='Coupon Code'
                        label='Coupon Code'
                        name='CouponCode'
                        type='text'
                        aria-describedby='validation-basic-first-name'
                        aria-readonly
                        InputProps={{ readOnly: true, disableUnderline: true }}
                      />
                    </div>
                    {formik.errors.CouponCode && formik.touched.CouponCode ? (
                      <FormHelperText
                        sx={{ color: 'error.main' }}
                        style={{ marginLeft: '144px' }}
                        id='validation-basic-first-name'
                      >
                        {formik.errors.CouponCode}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Banner
                    name='Offer Banner'
                    formikName='BannerImage'
                    formik={formik}
                    id={id}
                    imgPrw={imgPrw}
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    setImgPrw={setImgPrw}
                    setIsEdit={setIsEdit}
                    view={params == 'ViewOffers' ? true : false}
                  />
                </Grid>

                <Grid item sm={12}>
                  <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                    {params == 'ViewOffers' ? null : !id ? (
                      <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                        Save
                      </Button>
                    ) : (
                      <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                        Update
                      </Button>
                    )}
                    <Link prefetch={false} href='/Learning/Offers' style={{ textDecoration: 'none' }}>
                      <Button size='large' type='submit' variant='contained'>
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AddOffers
