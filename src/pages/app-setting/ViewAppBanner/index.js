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
  Radio,
  RadioGroup,
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
import { AddAppBanner, GetAppBannerById, UpdateAppBanner } from 'src/store/slices/AdminSlice'
import { appBannerSchema } from 'src/schemas'

const AppBanner = ({ popperPlacement }) => {
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

  // const params = router.query.AppBanner
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]
  const id = localStorage.getItem('id')

  useEffect(() => {
    if (id) {
      dispatch(GetAppBannerById(id)).then(res => {
        if (res?.payload?.data) {
          let updateData = res?.payload?.data
          setImageData(updateData?.BannerImage)
          fetch(updateData?.BannerImage)
            .then(res => {
              res.blob()
            })
            .then(blob => {
              let file = new File([blob], `${updateData.BannerImage}`)
              formik.setFieldValue('isActive', updateData?.isActive)
              formik.setFieldValue('Sequence', updateData?.Sequence)
              formik.setFieldValue('BannerImage', file)
              setImgSrc(updateData?.BannerImage)
              setdbImage(true)
              setPreview(true)
            })
        }
      })
    }
  }, [dispatch, id])
  // ** formik implementation

  const initialValues = {
    BannerImage: '',
    Sequence: '',
    isActive: true
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appBannerSchema,
    onSubmit: values => {
      let data = new FormData()
      data.append('BannerImage', isEdit ? values.BannerImage : imageData)
      data.append('isActive', values.isActive)
      data.append('Sequence', values.Sequence)
      if (params == 'EditAppBanner') {
        data.append('_id', id)
      }

      const action = params == 'EditAppBanner' ? UpdateAppBanner(data) : AddAppBanner(data)

      dispatch(action).then(res => {
        if (res.payload?.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/app-setting/')
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
            <CardHeader title={id ? (params == 'ViewAppBanner' ? 'View Slider' : 'Edit Slider') : 'Add Slider'} />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit} autocomplete='off'>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        placeholder='Sequence'
                        label='Sequence'
                        name='Sequence'
                        type='number'
                        value={formik.values.Sequence}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />

                      {formik.errors.Sequence && formik.touched.Sequence ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Sequence}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                      <RadioGroup
                        aria-label='isActive'
                        name='isActive'
                        value={
                          formik.values.isActive == 'true'
                            ? (formik.values.isActive = true)
                            : formik.values.isActive == 'false'
                            ? (formik.values.isActive = false)
                            : null
                        }
                        row
                        onChange={e => {
                          formik.setFieldValue('isActive', e.target.value)
                        }}
                      >
                        <FormControlLabel
                          value={'true'}
                          checked={formik.values.isActive === true}
                          control={<Radio color='primary' />}
                          label='Active'
                          labelPlacement='end'
                          disabled={params == 'ViewShortsTopic' ? true : false}
                        />
                        <FormControlLabel
                          value={'false'}
                          checked={formik.values.isActive === false}
                          control={<Radio color='primary' />}
                          label='InActive'
                          labelPlacement='end'
                          disabled={params == 'ViewShortsTopic' ? true : false}
                        />
                      </RadioGroup>
                    </div>
                    {formik.errors.isActive && formik.touched.isActive ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.isActive}
                      </FormHelperText>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Banner
                      name='App Slider'
                      size='(347px X 150px)'
                      formikName='BannerImage'
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
                      {params == 'AppBanner' ? (
                        <>
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Save
                          </Button>
                          <Link prefetch={false} href='/app-setting/' style={{ textDecoration: 'none' }}>
                            <Button size='large' onClick={() => localStorage.removeItem('id')} variant='contained'>
                              Cancel
                            </Button>
                          </Link>
                        </>
                      ) : params == 'ViewAppBanner' ? (
                        <Link prefetch={false} href='/app-setting/' style={{ textDecoration: 'none' }}>
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
                          <Link prefetch={false} href='/app-setting/' style={{ textDecoration: 'none' }}>
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

export default AppBanner
