/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { UpdatedAdminProfile } from 'src/store/slices/AdminSlice'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { img_url } from 'src/common/Service'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import FallbackSpinner from 'src/@core/components/spinner'
import EditIcon from '@mui/icons-material/Edit'

// 1002 START
const initialValues = {
  Email: '',
  FirstName: '',
  LastName: '',
  UserName: '',
  MobileNumber: '',
  ProfileImage: '',
  CountryCode: '91'
}

// 1002 END

const ImgStyled = styled('img')(({ theme }) => ({
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

const Profile = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/admin/images/avatars/1.png')
  const [preview, setPreview] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const dispatch = useDispatch()

  async function readImage(e, func) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      let binaryData = e.target.result
      let base64String = window.btoa(binaryData)
      func(base64String)
    }

    let image = reader.readAsBinaryString(file)

    return image
  }

  const userdata = JSON.parse(localStorage.getItem('data'))
  const permission = JSON.parse(localStorage.getItem('permission'))

  const theme = useTheme()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (userdata) {
      formik.setFieldValue('FirstName', userdata.FirstName)
      formik.setFieldValue('LastName', userdata.LastName)
      formik.setFieldValue('Email', userdata.Email)
      formik.setFieldValue('UserName', userdata.UserName)
      formik.setFieldValue('MobileNumber', userdata.MobileNumber)
      formik.setFieldValue('CountryCode', userdata.CountryCode)
      formik.setFieldValue('ProfileImage', userdata.ProfileImage)
      formik.setFieldValue('RoleId', userdata.RoleId)
      formik.setFieldValue('RoleName', userdata.RoleName)
      setImgSrc(userdata.ProfileImage)
      setdbImage(true)
      setPreview(true)
    }
  }, [dispatch, id])

  // 1002 START
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    // validationSchema: addAdminUserSchema,
    onSubmit: values => {
      let data = new FormData()
      data.append('Email', values.Email)
      data.append('FirstName', values.FirstName)
      data.append('LastName', values.LastName)
      data.append('UserName', values.UserName)
      data.append('MobileNumber', values.MobileNumber)
      data.append('CountryCode', values.CountryCode)
      data.append('ProfileImage', values.ProfileImage)
      data.append('RoleName', userdata.RoleName)
      data.append('RoleId', userdata.RoleId)
      if (userdata) {
        data.append('_id', userdata._id)
      }
      dispatch(UpdatedAdminProfile(data)).then(res => {
        if (res.payload.status === 200) {
          toast.success(res?.payload?.message, {
            style: {
              padding: '12px',
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`
            },
            icon: <EditIcon style={{ color: '#787EFF' }} />,
            iconTheme: {
              primary: theme.palette.primary.main,
              secondary: theme.palette.primary.contrastText
            }
          })
          localStorage.setItem('data', JSON.stringify(res?.payload?.data))
        } else {
          toast.error(res?.payload?.message, {
            style: {
              padding: '12px',
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`
            },
            iconTheme: {
              primary: theme.palette.primary.main,
              secondary: theme.palette.primary.contrastText
            }
          })
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
          <Card>
            <CardHeader title='User Profile' />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='FirstName'
                        label='First Name'
                        type='text'
                        placeholder='First Name'
                        value={formik.values.FirstName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyPress={e => {
                          if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                          } else e.preventDefault()
                        }}
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
                        placeholder='Last Name'
                        type='text'
                        value={formik.values.LastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyPress={e => {
                          if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                          } else e.preventDefault()
                        }}
                      />
                      {formik.errors.LastName && formik.touched.LastName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.LastName}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        value={formik.values.UserName}
                        name='UserName'
                        type='text'
                        label='User Name'
                        placeholder='User Name'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyPress={e => {
                          if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                          } else e.preventDefault()
                        }}
                      />
                      {formik.errors.UserName && formik.touched.UserName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.UserName}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        value={formik.values.Email}
                        name='Email'
                        type='Email'
                        label='Email'
                        placeholder='Email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: true, disableUnderline: true }}
                      />
                      {formik.errors.Email && formik.touched.Email ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Email}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  {/* 1001 START */}
                  <Grid item xs={12} sm={6}>
                    <div className='phone_input-div' style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                      <PhoneInput
                        country={'in'}
                        value={formik.values.CountryCode}
                        onChange={phone => {
                          formik.setFieldValue('CountryCode', phone)
                        }}
                      />

                      <FormControl className='mobilnumber-input'>
                        <TextField
                          type='tel'
                          label='Mobile Number'
                          placeholder='Mobile Number'
                          name='MobileNumber'
                          inputProps={{ maxLength: 10 }}
                          value={formik.values.MobileNumber}
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
                    <FormControl fullWidth>
                      <TextField
                        value={formik.values.RoleName}
                        name='RoleName'
                        type='text'
                        label='Role'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: true, disableUnderline: true }}
                      />
                      {formik.errors.RoleName && formik.touched.RoleName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.RoleName}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Profile Image</h4>
                    <Typography sx={{ color: 'red' }} style={{ fontSize: '13px' }}>
                      Note :- you can upload only .jpg, .jpeg and .png file format and file max size should be up to 2
                      MB.
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {preview === false ? (
                          <ImgStyled loading='eager' src={imgSrc} alt='defaultImage' name='ProfileImage' />
                        ) : dbImage === true ? (
                          <ImgStyled loading='eager' src={`${img_url}${imgSrc}`} alt='dbImage' name='ProfileImage' />
                        ) : (
                          <ImgStyled
                            loading='eager'
                            src={
                              !formik.errors.ProfileImage
                                ? `data:image/jpeg;base64,${imgSrc}`
                                : '/admin/images/avatars/1.png'
                            }
                            alt='PreviewImage'
                            name='ProfileImage'
                          />
                        )}
                        <div>
                          <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                            Upload Photo
                            <input
                              hidden
                              type='file'
                              name='ProfileImage'
                              accept='image/png, image/jpeg , image/jpg'
                              onChange={e => {
                                formik.setFieldValue('ProfileImage', e.target.files[0])
                                readImage(e, setImgSrc)
                                setPreview(true)
                                setdbImage(false)
                              }}
                              id='account-settings-upload-image'
                            />
                          </ButtonStyled>
                          <Typography sx={{ color: 'text.warning' }}>
                            {formik.touched.ProfileImage && formik.errors.ProfileImage ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                {formik.errors.ProfileImage}
                              </FormHelperText>
                            ) : null}
                          </Typography>
                        </div>
                      </Box>
                    </FormControl>
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
                      <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                        Update
                      </Button>
                      <Link
                        prefetch={false}
                        href={permission.dashboard.dashboard === true ? '/home' : '/WelcomePage'}
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
        </div>
      )}
    </>
  )
}

export default Profile
