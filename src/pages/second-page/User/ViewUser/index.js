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
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { addAdminUserSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { createAdminUser, GetAdminByIdUser, GetAllActiveRole, updateAdminUser } from 'src/store/slices/AdminSlice'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import FallbackSpinner from 'src/@core/components/spinner'
import Banner from 'src/pages/Common/Banner'
import EditIcon from '@mui/icons-material/Edit'

// 1002 START
const initialValues = {
  Email: '',
  FirstName: '',
  LastName: '',
  UserName: '',
  MobileNumber: '',
  ProfileImage: '',
  RoleId: '',
  CountryCode: '91'
}

const AddUser = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/admin/images/avatars/1.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState('')
  const [preview, setPreview] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [imgPrw, setImgPrw] = useState(false)
  const AllRoles = useSelector(state => state.AdminSlice.GetAllActiveRole)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const dispatch = useDispatch()

  // menu props to handle select height
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  const theme = useTheme()
  const router = useRouter()
  // const params = router.query.AddUser
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]

  // console.log('🚀  params:', params)
  const id = localStorage.getItem('id')

  useEffect(() => {
    if (id) {
      dispatch(GetAdminByIdUser(id)).then(res => {
        if (res?.payload?.data) {
          let updateData = res?.payload?.data
          setSecondDialogOpen(updateData?.ProfileImage)

          fetch(updateData.ProfileImage)
            .then(res => {
              res.blob()
            })
            .then(blob => {
              let file = new File([blob], `${updateData?.ProfileImage}`)
              formik.setFieldValue('FirstName', updateData?.FirstName)
              formik.setFieldValue('LastName', updateData?.LastName)
              formik.setFieldValue('Email', updateData?.Email)
              formik.setFieldValue('UserName', updateData?.UserName)
              formik.setFieldValue('MobileNumber', updateData?.MobileNumber)
              formik.setFieldValue('CountryCode', updateData?.CountryCode)
              formik.setFieldValue('RoleId', updateData?.RoleId)
              formik.setFieldValue('ProfileImage', file)
            })
          setImgSrc(updateData?.ProfileImage)
          setdbImage(true)
          setPreview(true)
        }
      })
    }
  }, [dispatch, id])

  useEffect(() => {
    dispatch(GetAllActiveRole())
  }, [dispatch])

  // 1002 START
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: addAdminUserSchema,
    onSubmit: values => {
      let data = new FormData()
      data.append('Email', values.Email)
      data.append('FirstName', values.FirstName)
      data.append('LastName', values.LastName)
      data.append('UserName', values.UserName)
      data.append('MobileNumber', values.MobileNumber)
      data.append('CountryCode', values.CountryCode)
      data.append('ProfileImage', isEdit ? values.ProfileImage : secondDialogOpen)
      data.append('RoleId', values.RoleId)
      if (id) {
        data.append('_id', id)
      }
      if (!id) {
        dispatch(createAdminUser(data)).then(res => {
          if (res?.payload?.status === 200) {
            toast.success(res?.payload?.message, {
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
            router.push('/second-page/User')
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
      } else {
        dispatch(updateAdminUser(data)).then(res => {
          if (res?.payload?.status === 200) {
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
            router.push('/second-page/User')
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
    }
  })

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <Card>
          <CardHeader title={params == 'EditUser' ? 'Edit User' : params == 'ViewUser' ? 'View User' : 'Add User'} />
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
                      placeholder='First Name'
                      value={formik.values.FirstName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      onKeyPress={e => {
                        if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                        } else e.preventDefault()
                      }}
                      InputProps={{ readOnly: params == 'ViewUser' ? true : false }}
                    />
                    {formik.errors.FirstName && formik.touched.FirstName ? (
                      <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.FirstName}</FormHelperText>
                    ) : null}
                  </FormControl>
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
                      InputProps={{ readOnly: params == 'ViewUser' ? true : false }}
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
                      InputProps={{ readOnly: params == 'ViewUser' ? true : false }}
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
                      placeholder='Email'
                      value={formik.values.Email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputProps={{ readOnly: params == 'ViewUser' ? true : false, disableUnderline: true }}
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
                      // inputProps={{
                      //   name: 'CountryCode',
                      //   class: 'countryCode'
                      // }}
                      //inputClass='countryCode'
                      country={'in'}
                      value={formik.values.CountryCode}
                      onChange={phone => {
                        formik.setFieldValue('CountryCode', phone)
                      }}
                      disabled={params == 'ViewUser'}
                    />
                    <FormControl className='mobilnumber-input'>
                      <TextField
                        type='number'
                        label='Mobile Number'
                        placeholder='Mobile Number'
                        name='MobileNumber'
                        value={formik.values.MobileNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ readOnly: params == 'ViewUser' ? true : false, disableUnderline: true }}
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
                    <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                      Role
                    </InputLabel>
                    <Select
                      id='abc'
                      value={formik.values.RoleId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label='Role'
                      name='RoleId'
                      placeholder='Role'
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                      MenuProps={MenuProps}
                      readOnly={params == 'ViewUser' ? true : false}
                    >
                      {AllRoles?.map(item => (
                        <MenuItem key={item} value={`${item._id}`}>
                          {item.RoleName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.errors.RoleId && formik.touched.RoleId ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        {formik.errors.RoleId}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Banner
                    name='Profile Image'
                    formikName='ProfileImage'
                    formik={formik}
                    id={id}
                    imgPrw={imgPrw}
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    setImgPrw={setImgPrw}
                    setIsEdit={setIsEdit}
                    profile={true}
                    view={params == 'ViewUser' ? true : false}
                  />
                </Grid>

                {params == 'ViewUser' ? (
                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      <Link prefetch={false} href='/second-page/User/' style={{ textDecoration: 'none' }}>
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
                      <Link prefetch={false} href='/second-page/User/' style={{ textDecoration: 'none' }}>
                        <Button size='large' variant='contained'>
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
      )}
    </>
  )
}

export default AddUser

// 1002 END
