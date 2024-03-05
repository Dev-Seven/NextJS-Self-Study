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
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'
import Banner from 'src/pages/Common/Banner'
import { AddAppBanner, AddMapImage, GetAppBannerById, UpdateAppBanner } from 'src/store/slices/AdminSlice'
import { appBannerSchema, mapImageSchema } from 'src/schemas'
import { getAllSubjectdropdown } from 'src/store/slices/LearningSlice'

const MapImage = ({ popperPlacement }) => {
  // ** State
  const [preview, setPreview] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // ** State
  const [imageData, setImageData] = useState('')
  const [imgPrw, setImgPrw] = useState(false)

  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const AllSubject = useSelector(state => state.LearningSlice.getAllSubjectdropdown)

  const params = router.query.MapImage
  const id = localStorage.getItem('id')

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

  useEffect(() => {
    dispatch(getAllSubjectdropdown())
  }, [dispatch])

  // useEffect(() => {
  //   if (id) {
  //     dispatch(GetAppBannerById(id)).then(res => {
  //       if (res?.payload?.data) {
  //         let updateData = res?.payload?.data
  //         setImageData(updateData?.BannerImage)
  //         fetch(updateData?.BannerImage)
  //           .then(res => {
  //             res.blob()
  //           })
  //           .then(blob => {
  //             let file = new File([blob], `${updateData.BannerImage}`)
  //             formik.setFieldValue('MapImage', file)
  //             setImgSrc(updateData?.BannerImage)
  //             setdbImage(true)
  //             setPreview(true)
  //           })
  //       }
  //     })
  //   }
  // }, [dispatch, id])
  // ** formik implementation

  const initialValues = {
    MapImage: '',
    SubjectId: '',
    MapImageName: ''
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: mapImageSchema,
    onSubmit: values => {
      let data = new FormData()
      data.append('MapImage', values.MapImage)
      data.append('SubjectId', values.SubjectId)
      data.append('MapImageName', values.MapImageName)

      const action = AddMapImage(data)

      dispatch(action).then(res => {
        if (res.payload?.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/mapImage')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  useEffect(() => {
    if (formik.values.isActive === true) {
      setSecondDialogOpen(true)
    }
  }, [formik.values.isActive])

  return (
    <>
      <div>
        {isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <Card>
            <CardHeader title='Map Image' />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit} autocomplete='off'>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        placeholder='Map Image Name'
                        label='Map Image Name'
                        name='MapImageName'
                        type='text'
                        value={formik.values.MapImageName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: params == 'ViewSubject' ? true : false }}
                      />
                      {formik.errors.MapImageName && formik.touched.MapImageName ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.MapImageName}
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
                        label='Subject'
                        name='SubjectId'
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                        value={formik.values.SubjectId}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        MenuProps={MenuProps}
                        disabled={params == 'ViewQuizCategory'}
                      >
                        {AllSubject.map(item => (
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
                      name='Map Image'
                      size='(347px X 150px)'
                      formikName='MapImage'
                      formik={formik}
                      id={id}
                      imgPrw={imgPrw}
                      imgSrc={imgSrc}
                      setImgSrc={setImgSrc}
                      setImgPrw={setImgPrw}
                      setIsEdit={setIsEdit}
                      view={params == 'ViewAppBanner' ? true : false}
                      edit={params == 'EditAppBanner' ? true : false}
                    />
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                        Save
                      </Button>
                      <Link prefetch={false} href='/mapImage' style={{ textDecoration: 'none' }}>
                        <Button size='large' onClick={() => localStorage.removeItem('id')} variant='contained'>
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
    </>
  )
}

export default MapImage
