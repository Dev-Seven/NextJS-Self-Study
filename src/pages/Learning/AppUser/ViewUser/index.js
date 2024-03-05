/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 09-03-2023                COUNTRY CODE ADDED IN PHONE                  ADITYA
// 1002                  09-03-2023                CHANGE KEY NAME AND CALL API                 DHRUV
// 1003                  10-03-2023                GET ALL ROLES API                            DHRUV

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
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
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { img_url } from 'src/common/Service'
import { editAppUserByAdmin, getAppUserById } from 'src/store/slices/LearningSlice'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'

// 1002 START

// 1002 END

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const EditUser = () => {
  // ** State
  const [info, setInfo] = useState('')
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const dispatch = useDispatch()

  const userData = useSelector(state => state?.LearningSlice?.appUserById)
  // console.log('🚀 ~ file: EditUser.js:96 ~ userData:', userData)

  const router = useRouter()
  // const { id, view } = router.query

  // const params = router.query.EditUser
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]
  const id = localStorage.getItem('AppUser')

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getAppUserById(id)).then(res => {
  //       if (res.payload.data) {
  //         let updateData = res.payload.data

  //         fetch(updateData.ProfileImage)
  //           .then(res => {
  //             res.blob()
  //           })
  //           .then(blob => {
  //             let file = new File([blob], `${updateData.ProfileImage}`)
  //             formik.setFieldValue('FirstName', updateData.FirstName)
  //             formik.setFieldValue('LastName', updateData.LastName)
  //             formik.setFieldValue('Email', updateData.Email)
  //             formik.setFieldValue('UserName', updateData.UserName)
  //             formik.setFieldValue('MobileNo', updateData.MobileNo)
  //             formik.setFieldValue('CountryCode', updateData.CountryCode)
  //             formik.setFieldValue('RoleId', updateData.RoleId)
  //             formik.setFieldValue('ProfileImage', file)
  //           })
  //         setImgSrc(updateData.ProfileImage)
  //         setdbImage(true)
  //         setPreview(true)
  //       }
  //     })
  //   }
  // }, [dispatch, id])

  // 1002 START

  useEffect(() => {
    dispatch(getAppUserById(id)).then(res => {
      if (id) {
        let updateData = res?.payload?.data
        formik.setFieldValue('AdminStatus', updateData?.AdminStatus)
        formik.setFieldValue('ProfileImage', updateData?.ProfileImage)
      }
    })
  }, [dispatch])

  const initialValues = {
    Email: userData?.Email,
    FirstName: userData?.FirstName,
    LastName: userData?.LastName,
    UserName: userData?.UserName,
    MobileNo: userData?.MobileNo,
    ProfileImage: userData?.ProfileImage,
    AdminStatus: info,
    _id: id
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: values => {
      const data = { AdminStatus: values.AdminStatus, _id: values?._id }
      dispatch(editAppUserByAdmin(data)).then(res => {
        if (res?.payload?.status === 200) {
          Toast({ response: res, update: true }) // toast the success message
          router.push('/Learning/AppUser')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          {params == 'ViewUser' ? (
            <Card>
              <CardHeader title='View User' />
              <Divider />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='FirstName'
                          label='First Name'
                          type='text'
                          placeholder='Dhruv'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.FirstName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                      {formik.errors.FirstName && formik.touched.FirstName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.FirstName}</FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='LastName'
                          label='Last Name'
                          placeholder='Samani'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.LastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.LastName && formik.touched.LastName ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.LastName}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='UserName'
                          type='text'
                          label='User Name'
                          placeholder='UserName'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.UserName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.UserName && formik.touched.UserName ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.UserName}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='Email'
                          type='Email'
                          label='Email'
                          placeholder='abc@Email.com'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.Email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.Email && formik.touched.Email ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Email}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    {/* 1001 START */}
                    <Grid item xs={12} sm={6}>
                      <div
                        className='phone_input-div'
                        style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}
                      >
                        <FormControl className='mobilnumber-input'>
                          <TextField
                            type='tel'
                            label='Mobil No.'
                            placeholder='1234568790'
                            name='MobileNo'
                            inputProps={{ maxLength: 10 }}
                            InputProps={{ readOnly: true, disableUnderline: true }}
                            value={formik.values.MobileNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.MobileNo && formik.errors.MobileNo ? (
                            <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.MobileNo}</FormHelperText>
                          ) : null}
                        </FormControl>
                      </div>
                    </Grid>

                    {formik.errors.RoleId && formik.touched.RoleId ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        {formik.errors.RoleId}
                      </FormHelperText>
                    ) : null}
                    <Grid item xs={12} sm={6}>
                      <div className='status-container' style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                        <RadioGroup
                          aria-label='Status'
                          name='AdminStatus'
                          value={
                            formik.values.AdminStatus == 'true'
                              ? (formik.values.AdminStatus = true)
                              : formik.values.AdminStatus == 'false'
                              ? (formik.values.AdminStatus = false)
                              : null
                          }
                          row
                        >
                          <FormControlLabel
                            value={'true'}
                            checked={formik.values.AdminStatus === true}
                            control={<Radio color='primary' />}
                            label='Active'
                            labelPlacement='end'
                          />
                          <FormControlLabel
                            value={'false'}
                            checked={formik.values.AdminStatus === false}
                            control={<Radio color='primary' />}
                            label='InActive'
                            labelPlacement='end'
                          />
                        </RadioGroup>
                      </div>
                      {formik.errors.AdminStatus && formik.touched.AdminStatus ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.AdminStatus}
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Profile Photo</h4>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {userData?.ProfileImage === '' ? (
                            <ImgStyled
                              src='https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
                              alt='dbImage'
                              name='ProfileImage'
                            />
                          ) : (
                            <ImgStyled src={`${img_url}${userData?.ProfileImage}`} alt='dbImage' name='ProfileImage' />
                          )}
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link prefetch={false} href='/Learning/AppUser/' style={{ textDecoration: 'none' }}>
                          <Button size='large' variant='contained' style={{ marginRight: '10px' }}>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          ) : isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <Card>
              <CardHeader title='Edit User' />
              <Divider />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          name='FirstName'
                          label='First Name'
                          type='text'
                          placeholder='Dhruv'
                          value={formik.values.FirstName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                      {formik.errors.FirstName && formik.touched.FirstName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.FirstName}</FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          name='LastName'
                          label='Last Name'
                          placeholder='Carter'
                          value={formik.values.LastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.LastName && formik.touched.LastName ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.LastName}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.UserName}
                          name='UserName'
                          type='text'
                          label='User Name'
                          placeholder='UserName'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.UserName && formik.touched.UserName ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.UserName}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.Email}
                          name='Email'
                          type='Email'
                          label='Email'
                          placeholder='abc@Email.com'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.Email && formik.touched.Email ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Email}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    {/* 1001 START */}
                    <Grid item xs={12} sm={6}>
                      <div
                        className='phone_input-div'
                        style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}
                      >
                        <FormControl className='mobilnumber-input'>
                          <TextField
                            InputProps={{ readOnly: true, disableUnderline: true }}
                            type='tel'
                            label='Mobil No.'
                            placeholder='1234568790'
                            name='MobileNo'
                            inputProps={{ maxLength: 10 }}
                            value={formik.values.MobileNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.MobileNumber && formik.errors.MobileNumber ? (
                            <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.MobileNumber}</FormHelperText>
                          ) : null}
                        </FormControl>
                      </div>
                    </Grid>
                    {/* 1001 END */}

                    <Grid item xs={12} sm={6}>
                      <div className='status-container' style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                        <RadioGroup
                          aria-label='Status'
                          name='AdminStatus'
                          value={
                            formik.values.AdminStatus == 'true'
                              ? (formik.values.AdminStatus = true)
                              : formik.values.AdminStatus == 'false'
                              ? (formik.values.AdminStatus = false)
                              : null
                          }
                          row
                          onChange={e => {
                            formik.setFieldValue('AdminStatus', e.target.value)
                          }}
                        >
                          <FormControlLabel
                            value={'true'}
                            checked={formik.values.AdminStatus === true}
                            control={<Radio color='primary' />}
                            label='Active'
                            labelPlacement='end'
                          />
                          <FormControlLabel
                            value={'false'}
                            checked={formik.values.AdminStatus === false}
                            control={<Radio color='primary' />}
                            label='InActive'
                            labelPlacement='end'
                          />
                        </RadioGroup>
                      </div>
                      {formik.errors.AdminStatus && formik.touched.AdminStatus ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.AdminStatus}
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Profile Photo</h4>
                      <FormControl fullWidth>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ImgStyled
                            src={
                              userData?.ProfileImage === ''
                                ? 'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
                                : `${img_url}${userData?.ProfileImage}`
                            }
                            alt='Static Image'
                            name='ProfileImage'
                          />
                          {/* {console.log('Image', userData.ProfileImage)} */}
                          <div></div>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Button
                          size='large'
                          onClick={() => localStorage.removeItem('AppUser')}
                          type='submit'
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Update
                        </Button>
                        <Link
                          prefetch={false}
                          onClick={() => localStorage.removeItem('AppUser')}
                          href='/Learning/AppUser/'
                          style={{ textDecoration: 'none' }}
                        >
                          <Button size='large' variant='contained'>
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
      )}
    </>
  )
}

export default EditUser

// 1002 END
