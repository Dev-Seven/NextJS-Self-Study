/* eslint-disable lines-around-comment */
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
import { supportRequestSchema } from 'src/schemas'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { GetSupportRequestById, UpdateSupportRequest } from 'src/store/slices/AdminSlice'
import FallbackSpinner from 'src/@core/components/spinner'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import Toast from 'src/pages/Common/Toast'

const initialValues = {
  UserName: '',
  SupportSubjectName: '',
  Message: '',
  Response: '',
  Email: '',
  MobileNo: '',
  Status: '',
  EmailSubject: ''
}

const AddRequest = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()

  // const { id, view } = router.query
  // const params = router.query.AddRequest
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]
  const id = localStorage.getItem('id')
  const isLoading = useSelector(state => state.LayoutSlice?.isLoading)

  useEffect(() => {
    dispatch(GetSupportRequestById(id)).then(res => {
      if (id) {
        let updateData = res?.payload?.data
        formik.setFieldValue('UserName', updateData?.UserName)
        formik.setFieldValue('SupportSubjectName', updateData?.SupportSubjectName)
        formik.setFieldValue('Message', updateData?.Message)
        formik.setFieldValue('Response', updateData?.Response)
        formik.setFieldValue('Email', updateData?.Email)
        formik.setFieldValue('MobileNo', updateData?.MobileNo)
        formik.setFieldValue('Status', updateData?.Status)
        formik.setFieldValue('EmailSubject', updateData?.EmailSubject)
      }
    })
  }, [dispatch, id])

  // ** formik state to handle form data and submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: supportRequestSchema,
    onSubmit: values => {
      dispatch(UpdateSupportRequest(Object.assign(values, { _id: id }))).then(res => {
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Support/SupportRequest')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
        // if (res?.payload?.status === 200) {
        //   toast.success(res?.payload?.message, {
        //     style: {
        //       padding: '16px',
        //       color: theme.palette.primary.main,
        //       border: `1px solid ${theme.palette.primary.main}`
        //     },
        //     iconTheme: {
        //       primary: theme.palette.primary.main,
        //       secondary: theme.palette.primary.contrastText
        //     }
        //   })
        //   router.push('/Support/SupportRequest')
        // } else {
        //   toast.error(res?.payload?.message, {
        //     style: {
        //       padding: '16px',
        //       color: theme.palette.primary.main,
        //       border: `1px solid ${theme.palette.primary.main}`
        //     },
        //     iconTheme: {
        //       primary: theme.palette.primary.main,
        //       secondary: theme.palette.primary.contrastText
        //     }
        //   })
        // }
      })
    }
  })

  return (
    <>
      {params == 'ViewRequest' ? (
        isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <div>
            <Card>
              <CardHeader title='View Request' />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='UserName'
                          label='Username'
                          type='text'
                          // placeholder='Dhruv'
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.UserName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.UserName && formik.touched.UserName ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.UserName}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='Email'
                          label='Email'
                          type='text'
                          // placeholder='Dhruv'
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.Email}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.Email && formik.touched.Email ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.Email}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='MobileNo'
                          label='Mobile'
                          type='number'
                          // placeholder='Dhruv'
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.MobileNo}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.MobileNo && formik.touched.MobileNo ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.MobileNo}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='SupportSubjectName'
                          label='Subject'
                          type='text'
                          // placeholder='Dhruv'
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.SupportSubjectName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.SupportSubjectName && formik.touched.SupportSubjectName ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.SupportSubjectName}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          name='Message'
                          label='Message'
                          type='text'
                          // placeholder='Dhruv'
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.Message}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.Message && formik.touched.Message ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.Message}
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
                          Status
                        </InputLabel>
                        <Select
                          disabled
                          value={formik.values.Status}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          label='Status'
                          name='Status'
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                        >
                          <MenuItem value='Open'>Open</MenuItem>
                          <MenuItem value='In progress'>In Progress</MenuItem>
                          <MenuItem value='On Hold'>On Hold</MenuItem>
                          <MenuItem value='Resolved'>Resolved</MenuItem>
                          <MenuItem value='Closed'>Closed</MenuItem>
                        </Select>
                        {formik.errors.Status && formik.touched.Status ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.Status}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='EmailSubject'
                          label='Email Subject'
                          type='text'
                          // placeholder='Dhruv'
                          multiline
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.EmailSubject}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.EmailSubject && formik.touched.EmailSubject ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.EmailSubject}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          name='Response'
                          label='Response'
                          type='text'
                          // placeholder='Dhruv'
                          multiline
                          aria-describedby='validation-basic-first-name'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          value={formik.values.Response}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.Response && formik.touched.Response ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.Response}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link prefetch={false} href='/Support/SupportRequest' style={{ textDecoration: 'none' }}>
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
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
        )
      ) : isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader title={id ? 'Edit Request' : 'Add Request'} />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='UserName'
                        label='Username'
                        type='text'
                        // placeholder='Dhruv'
                        InputProps={{ readOnly: true, disableUnderline: true }}
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.UserName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.UserName && formik.touched.UserName ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.UserName}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='Email'
                        label='Email'
                        type='text'
                        InputProps={{ readOnly: true, disableUnderline: true }}
                        // placeholder='Dhruv'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.Email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.Email && formik.touched.Email ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Email}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='MobileNo'
                        label='Mobile'
                        type='number'
                        InputProps={{ readOnly: true, disableUnderline: true }}
                        // placeholder='Dhruv'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.MobileNo}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.MobileNo && formik.touched.MobileNo ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.MobileNo}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='SupportSubjectName'
                        label='Subject'
                        type='text'
                        InputProps={{ readOnly: true, disableUnderline: true }}
                        // placeholder='Dhruv'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.SupportSubjectName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.SupportSubjectName && formik.touched.SupportSubjectName ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.SupportSubjectName}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <TextField
                        name='Message'
                        label='Message'
                        type='text'
                        InputProps={{ readOnly: true, disableUnderline: true }}
                        placeholder='Message'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.Message}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.Message && formik.touched.Message ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Message}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '1rem' }}>Request Reply</h4>
                    <Divider />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel
                        // error={Boolean(errors.select)}
                        id='validation-basic-select'
                        htmlFor='validation-basic-select'
                      >
                        Status
                      </InputLabel>
                      <Select
                        value={formik.values.Status}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        label='Status'
                        name='Status'
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                      >
                        <MenuItem value='Open'>Open</MenuItem>
                        <MenuItem value='In progress'>In Progress</MenuItem>
                        <MenuItem value='On Hold'>On Hold</MenuItem>
                        <MenuItem value='Resolved'>Resolved</MenuItem>
                        <MenuItem value='Closed'>Closed</MenuItem>
                      </Select>
                      {formik.errors.Status && formik.touched.Status ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Status}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        name='EmailSubject'
                        label='Email Subject'
                        type='text'
                        placeholder='Email Subject'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.EmailSubject}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.EmailSubject && formik.touched.EmailSubject ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.EmailSubject}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <TextField
                        multiline
                        name='Response'
                        label='Response'
                        type='text'
                        placeholder='Response'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.Response}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.Response && formik.touched.Response ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Response}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                        Send
                      </Button>
                      <Link prefetch={false} href='/Support/SupportRequest' style={{ textDecoration: 'none' }}>
                        <Button
                          size='large'
                          type='submit'
                          variant='contained'
                          onClick={() => localStorage.removeItem('id')}
                        >
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

export default AddRequest
