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
import Editor from '../../Editor'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { img_url } from 'src/common/Service'
import Toast from 'src/pages/Common/Toast'
import { getAllCompanyDetails, updateCompanyDetails } from 'src/store/slices/MasterSlice'
import FallbackSpinner from 'src/@core/components/spinner'

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

const Index = ({ popperPlacement }) => {
  const dispatch = useDispatch()
  // ** State
  const [open, setOpen] = useState(false)
  const [imageData, setImageData] = useState('')
  const [imageData1, setImageData1] = useState('')
  const [imageData2, setImageData2] = useState('')
  const [imageData3, setImageData3] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [isEdit1, setIsEdit1] = useState(false)
  const [isEdit2, setIsEdit2] = useState(false)
  const [isEdit3, setIsEdit3] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [imgUndefined, setImgUndefined] = useState(false)
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [imgSrc2, setImgSrc2] = useState('/admin/images/Banner.png')
  const [imgSrc3, setImgSrc3] = useState('/admin/images/Banner.png')
  const [BannerSrc, setBannerSrc] = useState('/admin/images/Banner.png')
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [imgPrw, setImgPrw] = useState(false)
  const [imgPrw1, setImgPrw1] = useState(false)
  const [imgPrw2, setImgPrw2] = useState(false)
  const [imgPrw3, setImgPrw3] = useState(false)
  const [getQuizData, setQuizData] = useState([])
  const [data, setData] = useState([''])
  const [editCompany, setEditCompany] = useState(false)
  const router = useRouter()
  const theme = useTheme()

  const { companyData } = useSelector(({ MasterSlice }) => MasterSlice)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        if (file.target.id == 'account-settings-upload-image') {
          setBannerSrc(reader.result)
          setImgPrw1(true)
        } else if (file.target.id == 'account-settings-upload-image2') {
          setImgSrc2(reader.result)
          setImgPrw2(true)
        } else if (file.target.id == 'account-settings-upload-image3') {
          setImgPrw3(true)
          setImgSrc3(reader.result)
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
  }

  const initialValues = {
    Email: '',
    CompanyName: '',
    Address: '',
    HSN: '0',
    CIN: '',
    GSTIN: '',
    InvoiceTermCondition: '',
    InvoiceFooterLeft: '',
    InvoiceFooterRight: '',
    CompanyLogo: '',
    InvoiceAuthoriseSignature: '',
    Url: '',
    MobileNo: '',
    appStoreUrl: '',
    playStoreUrl: '',
    EditorImage: '',
    ShortsImage: ''
  }

  useEffect(() => {
    if (companyData) {
      const company = companyData[0]
      setImageData(company?.CompanyLogo)
      setImageData1(company?.InvoiceAuthoriseSignature)
      setImageData2(company?.EditorImage)
      setImageData3(company?.ShortsImage)
      // setQuizData(company)

      fetch(company?.CompanyLogo)
        .then(res => {
          res.blob()
        })
        .then(blob => {
          let file = new File([blob], `${company?.InvoiceAuthoriseSignature}`)
          let fileLogo = new File([blob], `${company?.CompanyLogo}`)
          let fileeditor = new File([blob], `${company?.EditorImage}`)
          let fileshorts = new File([blob], `${company?.ShortsImage}`)
          formik.setFieldValue('CompanyName', company?.CompanyName)
          formik.setFieldValue('Email', company?.Email)
          formik.setFieldValue('MobileNo', company?.MobileNo)
          formik.setFieldValue('InvoiceAuthoriseSignature', file)
          formik.setFieldValue('CompanyLogo', fileLogo)
          formik.setFieldValue('EditorImage', fileeditor)
          formik.setFieldValue('ShortsImage', fileshorts)
          formik.setFieldValue('HSN', company?.HSN)
          formik.setFieldValue('CIN', company?.CIN)
          formik.setFieldValue('GSTIN', company?.GSTIN)
          formik.setFieldValue('Address', company?.Address ? company?.Address : '')
          formik.setFieldValue('Url', company?.Url)
          formik.setFieldValue('InvoiceFooterLeft', company?.InvoiceFooterLeft)
          formik.setFieldValue('InvoiceFooterRight', company?.InvoiceFooterRight)
          formik.setFieldValue('playStoreUrl', company?.playStoreUrl)
          formik.setFieldValue('appStoreUrl', company?.appStoreUrl)
          formik.setFieldValue(
            'InvoiceTermCondition',
            company?.InvoiceTermCondition ? company?.InvoiceTermCondition : ''
          )
          formik.setFieldValue('EditorImage', company?.EditorImage ? company?.EditorImage : '')
          formik.setFieldValue('ShortsImage', company?.ShortsImage ? company?.ShortsImage : '')
          if (company?.InvoiceAuthoriseSignature === '') {
            setBannerSrc(
              'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
            )
            setImgPrw(true)
            setImgPrw1(true)
            setImgSrc(
              'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
            )
          } else {
            setBannerSrc(company?.InvoiceAuthoriseSignature)
            setImgSrc(company?.CompanyLogo)
          }
          if (company?.EditorImage === '') {
            setImgSrc2(
              'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
            )
            setImgPrw2(true)
            setImgPrw3(true)
            setImgSrc3(
              'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
            )
          } else {
            setImgSrc2(company?.EditorImage)
            setImgSrc3(company?.ShortsImage)
          }
        })
    }
  }, [companyData])

  // ** for submitting form values
  const handleSubmit = async values => {
    let data = new FormData()
    function addBorderCollapseToTable(htmlContent) {
      let parser = new DOMParser()
      let doc = parser.parseFromString(htmlContent, 'text/html')
      let tables = doc.querySelectorAll('figure.table table')

      tables.forEach(table => {
        table.style.borderCollapse = 'collapse'
      })

      return new XMLSerializer().serializeToString(doc)
    }
    // data.append('SubjectId', id)
    data.append('CompanyName', formik?.values?.CompanyName)
    data.append('Email', formik?.values?.Email)
    data.append('MobileNo', formik?.values?.MobileNo)
    // data.append('BannerImage', formik?.values?.BannerImage)
    data.append('CompanyLogo', isEdit ? formik?.values.CompanyLogo : imageData)
    data.append('InvoiceAuthoriseSignature', isEdit1 ? formik?.values.InvoiceAuthoriseSignature : imageData1)
    data.append('EditorImage', isEdit2 ? formik?.values.EditorImage : imageData2)
    data.append('ShortsImage', isEdit3 ? formik?.values.ShortsImage : imageData3)
    data.append('Url', formik?.values?.Url)
    data.append('HSN', formik.values.HSN)
    data.append('CIN', formik?.values?.CIN)
    data.append('GSTIN', formik?.values?.GSTIN)
    data.append('InvoiceFooterLeft', formik?.values?.InvoiceFooterLeft)
    data.append('InvoiceFooterRight', formik?.values?.InvoiceFooterRight)
    data.append('Address', addBorderCollapseToTable(formik?.values?.Address))
    data.append('appStoreUrl', formik?.values?.appStoreUrl)
    data.append('playStoreUrl', formik?.values?.playStoreUrl)
    data.append('InvoiceTermCondition', formik?.values?.InvoiceTermCondition)

    // console.log('🚀  data:', Object.fromEntries(data))
    if (companyData) {
      data.append('_id', companyData[0]?._id)
    }

    const action = updateCompanyDetails(data)

    dispatch(action).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, update: true }) // toast the success message
        setImgPrw(false)
        setImgPrw1(false)
        setImgPrw2(false)
        setImgPrw3(false)
        dispatch(getAllCompanyDetails())
      } else {
        Toast({ response: res, error: true }) // toast the error message
      }
    })
    setEditCompany(false)
  }

  // ** formik state to handle form data
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    // validationSchema: addQuizSchema,
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  useEffect(() => {
    dispatch(getAllCompanyDetails())
  }, [dispatch])

  useEffect(() => {
    setEditorLoaded(true)
  }, [setEditorLoaded])

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader title='Company' />
            <Divider />
            <CardContent>
              {/* <FormikProvider value={formik}> */}
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <TextField
                        name='CompanyName'
                        label='Company Name'
                        placeholder='Company Name'
                        type='text'
                        value={formik.values.CompanyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false }}
                      />
                      {formik.errors.CompanyName && formik.touched.CompanyName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.CompanyName}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='Email'
                        type='Email'
                        label='Email'
                        placeholder='Email'
                        value={formik.values.Email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false, disableUnderline: true }}
                      />
                      {formik.errors.Email && formik.touched.Email ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Email}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='MobileNo'
                        label='Mobile No.'
                        placeholder='Mobile No.'
                        type='text'
                        value={formik.values.MobileNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onKeyPress={e => {
                        //   if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                        //   } else e.preventDefault()
                        // }}
                        InputProps={{ readOnly: !editCompany ? true : false }}
                      />
                      {formik.errors.MobileNo && formik.touched.MobileNo ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.MobileNo}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        value={formik.values.Url}
                        name='Url'
                        type='text'
                        label='Url'
                        placeholder='Url'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onKeyPress={e => {
                        //   if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                        //   } else e.preventDefault()
                        // }}
                        InputProps={{ readOnly: !editCompany ? true : false }}
                      />
                      {formik.errors.Url && formik.touched.Url ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Url}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='HSN'
                        type='text'
                        label='HSN'
                        placeholder='HSN'
                        value={formik.values.HSN}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false, disableUnderline: true }}
                      />
                      {formik.errors.HSN && formik.touched.HSN ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.HSN}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='CIN'
                        type='text'
                        label='CIN'
                        placeholder='CIN'
                        value={formik.values.CIN}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false, disableUnderline: true }}
                      />
                      {formik.errors.CIN && formik.touched.CIN ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.CIN}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='GSTIN'
                        type='text'
                        label='GSTIN'
                        placeholder='GSTIN'
                        value={formik.values.GSTIN}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false, disableUnderline: true }}
                      />
                      {formik.errors.GSTIN && formik.touched.GSTIN ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.GSTIN}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='InvoiceFooterLeft'
                        type='text'
                        label='InvoiceFooterLeft'
                        placeholder='InvoiceFooterLeft'
                        value={formik.values.InvoiceFooterLeft}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false, disableUnderline: true }}
                      />
                      {formik.errors.InvoiceFooterLeft && formik.touched.InvoiceFooterLeft ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.InvoiceFooterLeft}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='InvoiceFooterRight'
                        type='text'
                        label='InvoiceFooterRight'
                        placeholder='InvoiceFooterRight'
                        value={formik.values.InvoiceFooterRight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false, disableUnderline: true }}
                      />
                      {formik.errors.InvoiceFooterRight && formik.touched.InvoiceFooterRight ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.InvoiceFooterRight}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <TextField
                        name='appStoreUrl'
                        type='text'
                        label='App Store Url'
                        placeholder='App Store Url'
                        value={formik.values.appStoreUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false, disableUnderline: true }}
                      />
                      {formik.errors.appStoreUrl && formik.touched.appStoreUrl ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.appStoreUrl}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <TextField
                        name='playStoreUrl'
                        type='text'
                        label='Play Store Url'
                        placeholder='Play Store Url'
                        value={formik.values.playStoreUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: !editCompany ? true : false, disableUnderline: true }}
                      />
                      {formik.errors.playStoreUrl && formik.touched.playStoreUrl ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.playStoreUrl}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Company Address</h4>
                      <Editor
                        value={formik?.values?.Address}
                        name='Address'
                        editorLoaded={editorLoaded}
                        onChange={v => {
                          formik.setFieldValue('Address', v)
                        }}
                        // view={!editCompany ? true : false}
                      />
                      {formik?.errors.Address && formik?.touched.Address ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik?.errors.Address}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Terms & Conditions</h4>
                      <Editor
                        value={formik?.values?.InvoiceTermCondition}
                        name='InvoiceTermCondition'
                        editorLoaded={editorLoaded}
                        onChange={v => {
                          formik.setFieldValue('InvoiceTermCondition', v)
                        }}
                        // view={!editCompany ? true : false}
                      />
                      {formik?.errors.InvoiceTermCondition && formik?.touched.InvoiceTermCondition ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik?.errors.InvoiceTermCondition}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Company Images</h4>
                    <Typography sx={{ color: 'red' }} style={{ fontSize: '13px' }}>
                      Note :- you can upload only .jpg, .jpeg and .png file format and file max size (144px X 87px)
                      should be up to 2 MB.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {imgPrw === false ? (
                          <ImgStyled src={`${img_url}${imgSrc}`} alt='db Pic' />
                        ) : imgPrw === true ? (
                          <ImgStyled src={imgSrc} alt='preivie Pic' />
                        ) : (
                          <ImgStyled
                            src={!formik?.errors?.Logo ? `${imgSrc}` : '/admin/images/Banner.png'}
                            alt='Profile Pic'
                          />
                        )}
                        {editCompany ? (
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
                                name='CompanyLogo'
                                value={inputValue}
                                accept='image/png, image/jpeg, image/jpg'
                                onChange={event => {
                                  handleInputImageChange(event)
                                  setIsEdit(true)
                                  // setImgPrw(true)
                                  // params == 'EditQuiz' ? setImgPrw(false) : null
                                  formik.setFieldValue('CompanyLogo', event.currentTarget.files[0])
                                }}
                                id='account-settings-upload-image1'
                              />
                            </ButtonStyled>

                            {/* <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                            Reset
                          </ResetButtonStyled> */}

                            {formik?.errors.CompanyLogo && formik?.touched.CompanyLogo ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik?.errors.CompanyLogo}
                              </FormHelperText>
                            ) : null}
                          </div>
                        ) : null}
                      </Box>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {imgPrw1 === false ? (
                          <ImgStyled src={`${img_url}${BannerSrc}`} alt='db Pic' />
                        ) : imgPrw1 === true ? (
                          <ImgStyled src={BannerSrc} alt='undefined Pic' />
                        ) : (
                          <ImgStyled
                            src={!formik.errors.BannerSrc ? `${BannerSrc}` : '/admin/images/Banner.png'}
                            alt='Profile Pic'
                          />
                        )}
                        {editCompany ? (
                          <div>
                            <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                              Upload Signature
                              <input
                                hidden
                                type='file'
                                name='InvoiceAuthoriseSignature'
                                value={inputValue}
                                accept='image/png, image/jpeg'
                                onChange={event => {
                                  handleInputImageChange(event)
                                  setIsEdit1(true)
                                  // setImgPrw(true)
                                  // params == 'EditQuiz' ? setImgPrw(false) : null
                                  formik.setFieldValue('InvoiceAuthoriseSignature', event.currentTarget.files[0])
                                }}
                                id='account-settings-upload-image'
                              />
                            </ButtonStyled>
                            {/* <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                            Reset
                          </ResetButtonStyled> */}

                            {formik?.errors.InvoiceAuthoriseSignature && formik?.touched.InvoiceAuthoriseSignature ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik?.errors.InvoiceAuthoriseSignature}
                              </FormHelperText>
                            ) : null}
                          </div>
                        ) : null}
                      </Box>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Editor and Shorts Images</h4>
                    <Typography sx={{ color: 'red' }} style={{ fontSize: '13px' }}>
                      Note :- you can upload only .jpg, .jpeg and .png file format and file max size (144px X 87px)
                      should be up to 2 MB.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {imgPrw3 === false ? (
                          <ImgStyled src={`${img_url}${imgSrc3}`} alt='db Pic' />
                        ) : imgPrw3 === true ? (
                          <ImgStyled src={imgSrc3} alt='preivie Pic' />
                        ) : (
                          <ImgStyled
                            src={!formik?.errors?.ShortsImage ? `${imgSrc3}` : '/admin/images/Banner.png'}
                            alt='Profile Pic'
                          />
                        )}
                        {editCompany ? (
                          <div>
                            <ButtonStyled
                              component='label'
                              variant='contained'
                              htmlFor='account-settings-upload-image3'
                            >
                              Shorts Image
                              <input
                                hidden
                                type='file'
                                name='ShortsImage'
                                value={inputValue}
                                accept='image/png, image/jpeg, image/jpg'
                                onChange={event => {
                                  handleInputImageChange(event)
                                  setIsEdit3(true)
                                  // setImgPrw(true)
                                  // params == 'EditQuiz' ? setImgPrw(false) : null
                                  formik.setFieldValue('ShortsImage', event.currentTarget.files[0])
                                }}
                                id='account-settings-upload-image3'
                              />
                            </ButtonStyled>

                            {/* <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                            Reset
                          </ResetButtonStyled> */}

                            {formik?.errors.ShortsImage && formik?.touched.ShortsImage ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik?.errors.ShortsImage}
                              </FormHelperText>
                            ) : null}
                          </div>
                        ) : null}
                      </Box>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {imgPrw2 === false ? (
                          <ImgStyled src={`${img_url}${imgSrc2}`} alt='db Pic' />
                        ) : imgPrw2 === true ? (
                          <ImgStyled src={imgSrc2} alt='undefined Pic' />
                        ) : (
                          <ImgStyled
                            src={!formik.errors.EditorImage ? `${imgSrc2}` : '/admin/images/Banner.png'}
                            alt='Profile Pic'
                          />
                        )}
                        {editCompany ? (
                          <div>
                            <ButtonStyled
                              component='label'
                              variant='contained'
                              htmlFor='account-settings-upload-image2'
                            >
                              Editor Image
                              <input
                                hidden
                                type='file'
                                name='EditorImage'
                                value={inputValue}
                                accept='image/png, image/jpeg'
                                onChange={event => {
                                  handleInputImageChange(event)
                                  setIsEdit2(true)
                                  // setImgPrw(true)
                                  // params == 'EditQuiz' ? setImgPrw(false) : null
                                  formik.setFieldValue('EditorImage', event.currentTarget.files[0])
                                }}
                                id='account-settings-upload-image2'
                              />
                            </ButtonStyled>
                            {/* <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                            Reset
                          </ResetButtonStyled> */}

                            {formik?.errors.EditorImage && formik?.touched.EditorImage ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik?.errors.EditorImage}
                              </FormHelperText>
                            ) : null}
                          </div>
                        ) : null}
                      </Box>
                    </FormControl>
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      {!editCompany ? (
                        <Button
                          size='large'
                          variant='contained'
                          style={{ marginRight: '10px' }}
                          onClick={() => setEditCompany(true)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <Button
                          size='large'
                          onClick={formik.handleSubmit}
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Update
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default Index
