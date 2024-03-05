/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
// 1001 === 03.03.2023 === Add Shorts Topic Form === Dhruv ===

// 1001 START
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material'
import { addShortsCategorySchema } from 'src/schemas'
import { useFormik } from 'formik'
import { getAllSubject, getAllSubjectdropdown } from 'src/store/slices/LearningSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { CreateShortCategory, GetShortCatById, UpdateShortCategory } from 'src/store/slices/ShortsSlice'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'
import Banner from 'src/pages/Common/Banner'

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

const AddShortsTopic = () => {
  // ** State
  const [info, setInfo] = useState('')
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const AllSubject = useSelector(state => state.LearningSlice.getAllSubjectdropdown)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [imgPrw, setImgPrw] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [imgPath, setImgPath] = useState('')

  // const { id, view } = router.query

  const params = router.query.AddShortsTopic
  const id = localStorage.getItem('id')

  useEffect(() => {
    dispatch(getAllSubjectdropdown())
  }, [])

  const initialValues = {
    ShortCategoryName: '',
    SubjectId: '',
    Status: true,
    BannerImage: ''
  }

  useEffect(() => {
    if (id) {
      dispatch(GetShortCatById(id)).then(res => {
        if (res?.payload?.data) {
          let updateData = res?.payload?.data
          setImgPath(updateData?.BannerImage)
          fetch(updateData?.BannerImage)
            .then(res => {
              res.blob()
            })
            .then(blob => {
              let file = new File([blob], `${updateData?.BannerImage}`)
              formik.setFieldValue('ShortCategoryName', updateData?.ShortCategoryName),
                formik.setFieldValue('SubjectId', updateData?.SubjectId),
                formik.setFieldValue('Status', updateData?.Status),
                formik.setFieldValue('BannerImage', file)
            })
          setImgSrc(updateData?.BannerImage)
          setImgPrw(true)
        }
      })
    }
  }, [dispatch, id])

  // ** formik to handle form state
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: addShortsCategorySchema,
    onSubmit: values => {
      const { SubjectId, ShortCategoryName, BannerImage, Status } = values
      let data = new FormData()
      data.append('ShortCategoryName', ShortCategoryName)
      data.append('SubjectId', SubjectId)
      data.append('BannerImage', isEdit ? BannerImage : imgPath)
      data.append('Status', Status)
      if (params == 'EditShortsTopic') {
        data.append('_id', id)
      }
      const action = id ? UpdateShortCategory(data) : CreateShortCategory(data)

      dispatch(action).then(res => {
        if (res?.payload?.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Short/shortsTopic')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })

      // if (id) {
      //   dispatch(UpdateShortCategory(Object.assign(values, { _id: id }))).then(res => {
      //     if (res.payload?.status === 200) {
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
      //       router.push('/Short/ShortsTopic')
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
      //   dispatch(CreateShortCategory(values)).then(res => {
      //     if (res.payload.status === 200) {
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
      //       router.push('/Short/ShortsTopic')
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

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader
              title={
                params == 'EditShortsTopic'
                  ? 'Edit Media Category'
                  : params == 'ViewShortsTopic'
                  ? 'View Media Category'
                  : 'Add Media category'
              }
            />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='ShortCategoryName'
                        label='Media Category'
                        type='text'
                        placeholder='Media Category'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.ShortCategoryName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: params == 'ViewShortsTopic' ? true : false }}
                      />
                      {formik.errors.ShortCategoryName && formik.touched.ShortCategoryName ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.ShortCategoryName}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                        Subject
                      </InputLabel>
                      <Select
                        readOnly={params == 'ViewShortsTopic' ? true : false}
                        label='Subject'
                        name='SubjectId'
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                        value={formik.values.SubjectId}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        MenuProps={MenuProps}
                      >
                        {AllSubject?.map(item => (
                          <MenuItem key={item} value={`${item._id}`}>
                            {item.SubjectName}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.errors.SubjectId && formik.touched.SubjectId ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.SubjectId}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Banner
                      name='Media Category Banner'
                      size='(144px X 87px)'
                      formikName='BannerImage'
                      formik={formik}
                      id={id}
                      imgPrw={imgPrw}
                      imgSrc={imgSrc}
                      setImgSrc={setImgSrc}
                      setImgPrw={setImgPrw}
                      setIsEdit={setIsEdit}
                      view={params == 'ViewShortsTopic' ? true : false}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                      <RadioGroup
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
                          params == 'ViewShortsTopic' ? null : formik.setFieldValue('Status', e.target.value)
                        }}
                      >
                        <FormControlLabel
                          value={'true'}
                          checked={formik.values.Status === true}
                          control={<Radio color='primary' />}
                          label='Active'
                          labelPlacement='end'
                          // disabled={params == 'ViewShortsTopic' ? true : false}
                        />
                        <FormControlLabel
                          value={'false'}
                          checked={formik.values.Status === false}
                          control={<Radio color='primary' />}
                          label='InActive'
                          labelPlacement='end'
                          // disabled={params == 'ViewShortsTopic' ? true : false}
                        />
                      </RadioGroup>
                    </div>
                    {formik.errors.Status && formik.touched.Status ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.Status}
                      </FormHelperText>
                    ) : null}
                  </Grid>

                  {params == 'ViewShortsTopic' ? (
                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link prefetch={false} href='/Short/shortsTopic/' style={{ textDecoration: 'none' }}>
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
                        <Link prefetch={false} href='/Short/shortsTopic/' style={{ textDecoration: 'none' }}>
                          <Button size='large' type='submit' variant='contained'>
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

export default AddShortsTopic
