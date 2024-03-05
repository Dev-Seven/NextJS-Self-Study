/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable lines-around-comment */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import PickersComponent from 'src/views/pages/datepicker/PickersComponent'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import styled from '@emotion/styled'
import { useDropzone } from 'react-dropzone'
import { addSubject, getSubjectById, updateSubjectById } from 'src/store/slices/LearningSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { addSubjectSchema, addSubjectWithoutPrice } from 'src/schemas'
import Toast from 'src/pages/Common/Toast'
import Banner from 'src/pages/Common/Banner'

const AddSubject = ({ popperPlacement }) => {
  const [dateClear, setDateClear] = useState(new Date())

  // ** State
  const theme = useTheme()
  const [files, setFiles] = useState([])
  const [preview, setPreview] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // ** Hook

  /* ╭────────────────────────────╮ */
  /* │    Second Banner           │ */
  /* ╰────────────────────────────╯ */
  // ** State
  const [inputValue, setInputValue] = useState('')
  const [imageData, setImageData] = useState('')
  const [imgPrw, setImgPrw] = useState(false)
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)
  const [updatedImg, setUpdatedImg] = useState()
  const dispatch = useDispatch()
  const router = useRouter()

  const params = router.query.AddSubject
  const id = localStorage.getItem('id')

  // useEffect(() => {
  //   if (!id) {
  //     router.replace(
  //       {
  //         query: '/Learning/Subject/AddSubject/?n'
  //       },
  //       '/Learning/Subject/AddSubject/'
  //     )
  //   }
  // }, [id])

  // useEffect(() => {
  //   if (id) {
  //     dispatch(getSubjectById(id)).then(res => {
  //       let updateData = res.payload.data
  //       // if (!updateData?.BannerImage || updateData?.BannerImage) {
  //       fetch(updateData?.BannerImage)
  //         .then(res => {
  //           res.blob()
  //         })
  //         .then(blob => {
  //           let file = new File([blob], `${updateData?.BannerImage}`)
  //           console.log('file', file)
  //           formik.setFieldValue('BannerImage', file)
  //           formik.setFieldValue('SubjectName', updateData?.SubjectName)
  //           formik.setFieldValue('Price', updateData?.Price)
  //           formik.setFieldValue('IsPaid', updateData?.IsPaid)
  //           formik.setFieldValue('EffectiveDate', moment(updateData?.EffectiveDate).toDate())
  //           setImgSrc(updateData?.BannerImage)
  //           setdbImage(true)
  //           setPreview(true)
  //           console.log('fomrik', formik.values)
  //         })
  //       // }
  //     })
  //   }
  // }, [id])

  useEffect(() => {
    if (id) {
      dispatch(getSubjectById(id)).then(res => {
        if (res.payload.data) {
          let updateData = res.payload.data
          setImageData(updateData?.BannerImage)

          fetch(updateData?.BannerImage)
            .then(res => {
              res.blob()
            })
            .then(blob => {
              let file = new File([blob], `${updateData.BannerImage}`)

              formik.setFieldValue('SubjectName', updateData?.SubjectName)
              formik.setFieldValue('Price', updateData?.Price)
              formik.setFieldValue('IsPaid', updateData?.IsPaid)
              formik.setFieldValue('EffectiveDate', moment(updateData?.EffectiveDate).add(1, 'day').toDate())
              formik.setFieldValue('BannerImage', file)

              setImgSrc(updateData?.BannerImage)
              setdbImage(true)
              setPreview(true)
            })
        }
      })
    }
  }, [dispatch, id])

  const handleInputImageChange = e => {
    const reader = new FileReader()
    const { files } = e.target
    if (files && files.length !== 0) {
      reader.onload = () => setUpdatedImg(reader.result)
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }

    // if (e.target.files[0]) {
    //   setPicture(e.target.files[0]);
    //   const reader = new FileReader();
    //   reader.addEventListener("load", () => {
    //     setImgSrc(reader.result);
    //   });
    //   reader.readAsDataURL(e.target.files[0]);
    // }
  }

  // dispatch(addSubject())

  // ** formik implementation

  const initialValues = {
    SubjectName: '',
    Price: '',
    EffectiveDate: '',
    BannerImage: '',
    IsPaid: false
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema:
      secondDialogOpen === true ? (params == 'EditSubject' ? null : addSubjectSchema) : addSubjectWithoutPrice,
    onSubmit: values => {
      const momentDateWithTime = moment(values.EffectiveDate)
        .set({
          hour: 5,
          minute: 30
        })
        .toISOString()
      let data = new FormData()
      data.append('SubjectName', values.SubjectName)
      data.append('EffectiveDate', momentDateWithTime)
      data.append('Price', values.Price)
      data.append('BannerImage', isEdit ? values.BannerImage : imageData)
      data.append('IsPaid', values.IsPaid)
      if (params == 'EditSubject') {
        data.append('_id', id)
      }

      const action = params == 'EditSubject' ? updateSubjectById(data) : addSubject(data)

      dispatch(action).then(res => {
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Learning/Subject')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })

      // if (!id) {
      //   dispatch(addSubject(data)).then(res => {
      //     if (res?.payload?.status === 200) {
      //       toast.success(res?.payload?.message, {
      //         style: {
      //           padding: '16px',
      //           color: theme.palette.primary.main,
      //           border: `1px solid ${theme.palette.primary.main}`
      //         },
      //         iconTheme: {
      //           primary: theme.palette.primary.main,
      //           secondary: theme.palette.primary.contrastText
      //         }
      //       })
      //       router.push('/Learning/Subject')
      //     } else {
      //       toast.error(res?.payload?.message, {
      //         style: {
      //           padding: '16px',
      //           color: theme.palette.primary.main,
      //           border: `1px solid ${theme.palette.primary.main}`
      //         },
      //         iconTheme: {
      //           primary: theme.palette.primary.main,
      //           secondary: theme.palette.primary.contrastText
      //         }
      //       })
      //     }
      //   })
      // } else {
      //   dispatch(updateSubjectById(data)).then(res => {
      //     if (res?.payload?.status === 200) {
      //       toast.success(res?.payload?.message, {
      //         style: {
      //           padding: '16px',
      //           color: theme.palette.primary.main,
      //           border: `1px solid ${theme.palette.primary.main}`
      //         },
      //         iconTheme: {
      //           primary: theme.palette.primary.main,
      //           secondary: theme.palette.primary.contrastText
      //         }
      //       })
      //       router.push('/Learning/Subject')
      //     } else {
      //       toast.error(res?.payload?.message, {
      //         style: {
      //           padding: '16px',
      //           color: theme.palette.primary.main,
      //           border: `1px solid ${theme.palette.primary.main}`
      //         },
      //         iconTheme: {
      //           primary: theme.palette.primary.main,
      //           secondary: theme.palette.primary.contrastText
      //         }
      //       })
      //     }
      //   })
      // }
    }
  })

  useEffect(() => {
    if (formik.values.IsPaid === true) {
      setSecondDialogOpen(true)
    }
  }, [formik.values.IsPaid])

  return (
    <>
      <div>
        {isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <Card>
            <CardHeader
              title={
                params == 'EditSubject' ? 'Edit Subject' : params == 'ViewSubject' ? 'View Subject' : 'Add Subject'
              }
            />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit} autocomplete='off'>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        placeholder='Subject'
                        label='Subject'
                        name='SubjectName'
                        type='text'
                        value={formik.values.SubjectName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: params == 'ViewSubject' ? true : false }}
                      />
                      {formik.errors.SubjectName && formik.touched.SubjectName ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.SubjectName}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4 style={{ margin: '0', padding: '0 10px' }}>Subject Type :-</h4>
                      <RadioGroup
                        aria-label='Subject Type'
                        name='IsPaid'
                        value={
                          formik.values.IsPaid == 'true'
                            ? (formik.values.IsPaid = true)
                            : formik.values.IsPaid == 'false'
                            ? (formik.values.IsPaid = false)
                            : null
                        }
                        row
                        onChange={e => {
                          params == 'ViewSubject' ? null : formik.setFieldValue('IsPaid', e.target.value)
                        }}
                      >
                        <FormControlLabel
                          value={'false'}
                          checked={formik.values.IsPaid === false}
                          control={<Radio color='primary' />}
                          label='Free'
                          labelPlacement='end'
                          // disabled={params == 'ViewSubject'}
                        />
                        <FormControlLabel
                          value={'true'}
                          checked={formik.values.IsPaid === true}
                          control={<Radio color='primary' />}
                          label='Paid'
                          labelPlacement='end'
                          // disabled={params == 'ViewSubject'}
                        />
                      </RadioGroup>
                    </div>
                    {formik.errors.isActive && formik.touched.isActive ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.isActive}
                      </FormHelperText>
                    ) : null}
                  </Grid>

                  {formik.values.IsPaid &&
                    (params == 'EditSubject' ? null : (
                      <>
                        <Grid item xs={12} sm={6}>
                          <DatePickerWrapper>
                            <EditorWrapper>
                              <DatePicker
                                showYearDropdown
                                showMonthDropdown
                                id='picker-clear'
                                dateFormat='d/MM/yyyy'
                                name='EffectiveDate'
                                placeholderText='Effective Date'
                                readOnly={params == 'ViewSubject' ? true : false}
                                selected={formik.values.EffectiveDate}
                                popperPlacement={popperPlacement}
                                customInput={<PickersComponent label='Effective Date' />}
                                onChange={date => {
                                  setDateClear(date)
                                  formik.setFieldValue('EffectiveDate', date)
                                }}
                              />
                              {formik.errors.EffectiveDate && formik.touched.EffectiveDate ? (
                                <FormHelperText sx={{ color: 'error.main' }} style={{ marginLeft: '14px' }}>
                                  {formik.errors.EffectiveDate}
                                </FormHelperText>
                              ) : null}
                            </EditorWrapper>
                          </DatePickerWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <TextField
                              placeholder='Price'
                              label='Price'
                              type='number'
                              name='Price'
                              aria-describedby='validation-basic-first-name'
                              InputProps={{
                                startAdornment: <InputAdornment position='start'>₹</InputAdornment>,
                                readOnly: params == 'ViewSubject' ? true : false
                              }}
                              value={formik.values.Price}
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                            />
                            {formik.errors.Price && formik.touched.Price ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                {formik.errors.Price}
                              </FormHelperText>
                            ) : null}
                          </FormControl>
                        </Grid>
                      </>
                    ))}

                  <Grid item xs={12} sm={12}>
                    <Banner
                      name='Subject Banner'
                      size='(144px X 87px)'
                      formikName='BannerImage'
                      formik={formik}
                      id={id}
                      imgPrw={imgPrw}
                      imgSrc={imgSrc}
                      setImgSrc={setImgSrc}
                      setImgPrw={setImgPrw}
                      setIsEdit={setIsEdit}
                      view={params == 'ViewSubject' ? true : false}
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      {params == 'AddSubject' ? (
                        <>
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Save
                          </Button>
                          <Link prefetch={false} href='/Learning/Subject' style={{ textDecoration: 'none' }}>
                            <Button size='large' onClick={() => localStorage.removeItem('id')} variant='contained'>
                              Cancel
                            </Button>
                          </Link>
                        </>
                      ) : params == 'ViewSubject' ? (
                        <Link prefetch={false} href='/Learning/Subject' style={{ textDecoration: 'none' }}>
                          <Button size='large' onClick={() => localStorage.removeItem('id')} variant='contained'>
                            Cancel
                          </Button>
                        </Link>
                      ) : (
                        <>
                          <Button
                            size='large'
                            onClick={formik.handleSubmit}
                            variant='contained'
                            style={{ marginRight: '10px' }}
                          >
                            Update
                          </Button>
                          <Link prefetch={false} href='/Learning/Subject' style={{ textDecoration: 'none' }}>
                            <Button size='large' onClick={() => localStorage.removeItem('id')} variant='contained'>
                              Cancel
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}

export default AddSubject
