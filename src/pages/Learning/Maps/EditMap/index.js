/* eslint-disable lines-around-comment */
/* eslint-disable padding-line-between-statements */
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
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { MapsSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { CreateMap, getAllSubjectdropdown, GetMapById, UpdateMap } from 'src/store/slices/LearningSlice'
import { useSelector } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import Editor from '../../../Editor'
import MapPreview from '../MapPreview'
import ClearIcon from '@mui/icons-material/Clear'
import Toast from 'src/pages/Common/Toast'
import Banner from 'src/pages/Common/Banner'
import styled from '@emotion/styled'
import { img_url } from 'src/common/Service'

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

const ImgStyled = styled('img')(({ theme }) => ({
  width: 150,
  height: 150,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const AddMap = ({ content }) => {
  // 1001 START
  const dispatch = useDispatch()
  const router = useRouter()
  const AllSubject = useSelector(state => state.LearningSlice.getAllSubjectdropdown)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [imgSrc1, setImgSrc1] = useState('/admin/images/Banner.png')
  const [preview, setPreview] = useState(false)
  const [preview1, setPreview1] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const [dbImage1, setdbImage1] = useState(false)

  const [imageData, setImageData] = useState('')
  const [imageData1, setImageData1] = useState('')
  const [imgPrw, setImgPrw] = useState(false)
  const [imgPrw1, setImgPrw1] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isEdit1, setIsEdit1] = useState(false)

  const [editorLoaded, setEditorLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [mapStyle, setMapStyle] = useState('')

  const id = localStorage.getItem('id')
  // const params = router.query.AddMap
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]

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

  useEffect(() => {
    dispatch(getAllSubjectdropdown())
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(GetMapById(id)).then(res => {
        if (res?.payload?.data) {
          let updateData = res?.payload?.data

          setImageData(updateData?.BannerImage)
          setImageData1(updateData?.ListingIcon)
          fetch(updateData?.BannerImage)
            .then(res => {
              res.blob()
            })
            .then(blob => {
              let file = new File([blob], `${updateData?.BannerImage}`)
              let fileIcon = new File([blob], `${updateData?.ListingIcon}`)

              formik.setFieldValue('MapTitle', updateData?.MapTitle)
              formik.setFieldValue('SubjectId', updateData?.SubjectId)
              formik.setFieldValue('content', updateData?.content)
              formik.setFieldValue('StyleLink', updateData?.StyleLink)
              formik.setFieldValue('BannerImage', file)
              formik.setFieldValue('ListingIcon', fileIcon)
            })
          setMapStyle(updateData?.StyleLink)
          setImgSrc(updateData?.BannerImage)
          setImgSrc1(updateData?.ListingIcon)
          setdbImage(true)
          setdbImage1(true)
          setImgPrw1(true)
          setPreview1(true)
          setPreview(true)
        }
      })
    }
  }, [dispatch, id])

  // formik initialValues

  const initialValues = {
    MapTitle: '',
    SubjectId: '',
    content: '',
    StyleLink: '',
    BannerImage: '',
    ListingIcon: ''
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: MapsSchema,
    onSubmit: values => {
      // console.log('🚀  values:', values)
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
      data.append('MapTitle', values.MapTitle)
      data.append('SubjectId', values.SubjectId)
      data.append('content', addBorderCollapseToTable(values.content))
      data.append('StyleLink', values.StyleLink)
      data.append('BannerImage', isEdit ? values.BannerImage : imageData)
      data.append('ListingIcon', isEdit1 ? values.ListingIcon : imageData1)
      if (id) {
        data.append('_id', id)
      }
      // console.log('🚀  data:', Object.fromEntries(data))

      const action = id ? UpdateMap(data) : CreateMap(data)

      dispatch(action).then(res => {
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Learning/Maps')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  // 1001 END

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 6
  }

  return (
    <div>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <Card>
          <CardHeader title={params == 'EditMap' ? 'Edit map' : params == 'ViewMap' ? 'View Map' : 'Add Map'} />
          <Divider />
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      value={formik.values.MapTitle}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      label='Map Title'
                      type='text'
                      name='MapTitle'
                      placeholder='Map Title'
                      aria-describedby='validation-basic-first-name'
                      InputProps={{ readOnly: params == 'ViewMap' ? true : false }}
                    />
                    {formik.errors.MapTitle && formik.touched.MapTitle ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.MapTitle}
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
                      type='select'
                      value={formik.values.SubjectId}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      MenuProps={MenuProps}
                      label='Subject'
                      name='SubjectId'
                      labelId='validation-basic-select'
                      aria-describedby='validation-basic-select'
                      readOnly={params == 'ViewMap' ? true : false}
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

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      value={formik.values.StyleLink}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      label='Style Link'
                      type='url'
                      multiline
                      name='StyleLink'
                      placeholder='Style Link'
                      aria-describedby='validation-basic-first-name'
                      InputProps={{ readOnly: params == 'ViewMap' ? true : false }}
                    />
                    {formik.errors.StyleLink && formik.touched.StyleLink ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.StyleLink}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Map Content</h4>
                    <Editor
                      value={formik?.values?.content}
                      name='content'
                      editorLoaded={editorLoaded}
                      onChange={v => {
                        formik?.setFieldValue('content', v)
                      }}
                      onBlur={() => {
                        formik?.setFieldTouched('content', true)
                      }}
                      view={params == 'ViewMap' ? true : false}
                    />
                    {formik.errors.content && formik.touched.content ? (
                      <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.content}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Banner
                    name='Map Banner'
                    size='(144px X 87px)'
                    formikName='BannerImage'
                    formik={formik}
                    id={id}
                    imgPrw={imgPrw}
                    imgSrc={imgSrc}
                    setImgSrc={setImgSrc}
                    setImgPrw={setImgPrw}
                    setIsEdit={setIsEdit}
                    view={params == 'ViewMap' ? true : false}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Map Icon</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {/* {console.log('🚀  imgPrw1:', imgPrw1)} */}
                      {imgPrw1 === false ? (
                        <ImgStyled src={imgSrc1} alt='defaultImage' name='TopicBanner' />
                      ) : dbImage1 ? (
                        <ImgStyled src={`${img_url}${imgSrc1}`} alt='dbImage1' name='TopicBanner' />
                      ) : (
                        <ImgStyled src={`data:image/jpeg;base64,${imgSrc1}`} alt='PreviewImage' name='TopicBanner' />
                      )}

                      {params == 'ViewMap' ? (
                        ''
                      ) : (
                        <div>
                          <Typography
                            sx={{ color: 'red' }}
                            style={{ fontSize: '13px', marginBottom: '25px', maxWidth: '320px' }}
                          >
                            Note :- you can upload only .jpg, .jpeg and .png file format and file max size (80px X 80px)
                            should be up to 2 MB.
                          </Typography>
                          <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image1'>
                            Upload Icon
                            <input
                              hidden
                              type='file'
                              name='ListingIcon'
                              accept='image/png, image/jpeg , image/jpg'
                              onChange={e => {
                                formik.setFieldValue('ListingIcon', e.target.files[0])
                                readImage(e, setImgSrc1)
                                setImgPrw1(true)
                                setdbImage1(false)
                                setIsEdit1(true)
                              }}
                              id='account-settings-upload-image1'
                            />
                          </ButtonStyled>
                          <Typography sx={{ color: 'text.warning' }}>
                            {formik.touched.ListingIcon && formik.errors.ListingIcon ? (
                              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                {formik.errors.ListingIcon}
                              </FormHelperText>
                            ) : null}
                          </Typography>
                        </div>
                      )}
                    </Box>
                  </FormControl>
                </Grid>

                {params == 'ViewMap' ? (
                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      <Button size='large' onClick={handleOpen} variant='contained' style={{ marginRight: '10px' }}>
                        Map Preview
                      </Button>
                      <Link prefetch={false} href='/Learning/Maps' style={{ textDecoration: 'none' }}>
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
                        <>
                          <Button size='large' onClick={handleOpen} variant='contained' style={{ marginRight: '10px' }}>
                            Map Preview
                          </Button>
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Update
                          </Button>
                        </>
                      )}
                      <Link prefetch={false} href='/Learning/Maps' style={{ textDecoration: 'none' }}>
                        <Button size='large' onClick={() => localStorage.removeItem('id')} variant='contained'>
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

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Box style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
              <ClearIcon style={{ color: 'black', fontSize: '2rem', cursor: 'pointer' }} onClick={handleClose} />
            </Box>
            <MapPreview mapStyle={mapStyle} />
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default AddMap
