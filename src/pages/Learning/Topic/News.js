/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable lines-around-comment */
import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { addNewItem, clearSelectedItem, deleteItem, selectItem, updateItem } from 'src/store/slices/TopicSlice'
import { useSelector } from 'react-redux'
import { useFormik, useFormikContext } from 'formik'
import { NewsImageUpload, TopicLinkImageUpload } from 'src/store/slices/LearningSlice'
import { img_url } from 'src/common/Service'
import FallbackSpinner from 'src/@core/components/spinner'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-hot-toast'
import Editor from '../../../../src/pages/Editor'
import { useRouter } from 'next/router'
import { topicNewsSchema } from 'src/schemas'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import PickersComponent from 'src/views/pages/datepicker/PickersComponent'
import DatePicker from 'react-datepicker'
import moment from 'moment'

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

const News = ({ topicById, popperPlacement }) => {
  const [dateClear, setDateClear] = useState(new Date())
  //**State for image */
  const [imageData1, setImageData1] = useState('')
  const [imageData2, setImageData2] = useState('')
  const [isEditImage, setIsEditImage] = useState(false)
  const [isEditImage1, setIsEditImage1] = useState(false)

  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const GettopicbyId = topicById
  const handleOpen = () => setOpen(true)

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
    // setOpen(false)
  }
  const theme = useTheme()
  const router = useRouter()

  const id = localStorage.getItem('SubjectId')
  const _id = localStorage.getItem('id')
  const params = router.query.AddTopic

  const AllNews = useSelector(state => state.TopicSlice.items)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // console.log('All News', AllNews)

  const [open, setOpen] = useState(false)

  // Banner Image STARTS
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [imgSrc1, setImgSrc1] = useState('/admin/images/Banner.png')
  const [preview, setPreview] = useState(false)
  const [preview1, setPreview1] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const [dbImage1, setdbImage1] = useState(false)
  const { setFieldValue, values } = useFormikContext()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setEditorLoaded(true)
  }, [editorLoaded])

  // const setMyArrayField = useArrayToFormikField('TopicNews')

  // Text Editor Start
  // const [editorState, setEditorState] = useState(EditorState.createEmpty())
  // const [text, setText] = useState('')
  // const [error, setError] = useState('')
  //
  // const hasText = editorState.getCurrentContent().hasText()

  // const onEditorStateChange = newEditorState => {
  //   setEditorState(newEditorState)
  //   const text = newEditorState.getCurrentContent().getPlainText('\u0001')
  //   setText(text)
  //   setText(draftToHtml(convertToRaw(editorState.getCurrentContent(text))))
  // }

  // useEffect(() => {
  //   hasText
  //     ? formik.setFieldValue('TopicNewsContent', hasText)
  //     : (setError('error'), formik.setFieldValue('TopicNewsContent', ''))
  // }, [hasText])

  // const getFileBase64 = (file, callback) => {
  //   const reader = new FileReader()
  //   reader.readAsDataURL(file)

  //   reader.onload = () => callback(reader.result)
  // }

  // const imageUploadCallback = file =>
  //   new Promise(resolve => getFileBase64(file, data => resolve({ data: { link: data } })))

  // const config = {
  //   image: { uploadCallback: imageUploadCallback }
  // }

  // Text Editor END
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

  function addBorderCollapseToTable(htmlContent) {
    let parser = new DOMParser()
    let doc = parser.parseFromString(htmlContent, 'text/html')
    let tables = doc.querySelectorAll('figure.table table')

    tables.forEach(table => {
      table.style.borderCollapse = 'collapse'
    })

    return new XMLSerializer().serializeToString(doc)
  }

  async function readImage1(e, func) {
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

  // Banner Image END

  // function useArrayToFormikField(fieldName) {
  //   const [array, setArray] = useState([])
  //   const { setFieldValue } = useFormikContext()

  //   useEffect(() => {
  //     setFieldValue(fieldName, array)
  //   }, [array, fieldName, setFieldValue])
  //   return setArray
  // }

  useEffect(() => {
    setFieldValue('TopicNews', AllNews)
  }, [setFieldValue, AllNews])

  const initialValues = {
    TopicNewstitle: '',
    TopicNewsContent: '',
    NewsImage: '',
    NewsIcon: '',
    NewsDate: '',
    TopicNewsPaper: ''
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: topicNewsSchema,
    onSubmit: values => {
      // console.log('🚀  values:', values)
      // console.log('🚀 ~ file: News.js:267 ~ News ~ values:', values)
      setLoading(true)
      let data = new FormData()
      let data1 = new FormData()
      data.append('NewsImage', !isEditImage ? imageData1 : values.NewsImage)
      data1.append('NewsIcon', !isEditImage1 ? imageData2 : values.NewsIcon)

      if (isEdit) {
        if (isEditImage && isEditImage1) {
          dispatch(NewsImageUpload(data)).then(res => {
            // if we are getting 200 at that image is updated by user
            if (res?.payload?.code === 200) {
              dispatch(TopicLinkImageUpload(data1)).then(res1 => {
                if (res1?.payload?.code === 200) {
                  dispatch(
                    updateItem({
                      ...values,
                      NewsImage: res?.payload?.path,
                      NewsIcon: res1?.payload?.path,
                      TopicNewsContent: addBorderCollapseToTable(values?.TopicNewsContent)
                    })
                  )
                  handleClose()
                  toast.success('News Update Successfully', {
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
                }
              })
              // const newObj = Object.assign(values, { NewsImage: res?.payload?.path })
            }
            setLoading(false)
          })
        } else if (isEditImage && !isEditImage1) {
          dispatch(NewsImageUpload(data)).then(res => {
            // if we are getting 200 at that image is updated by user
            if (res?.payload?.code === 200) {
              dispatch(
                updateItem({
                  ...values,
                  TopicNewsContent: addBorderCollapseToTable(values?.TopicNewsContent),
                  NewsImage: res?.payload?.path,
                  NewsIcon: imgSrc1
                })
              )
              handleClose()
              toast.success('News Update Successfully', {
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
              // const newObj = Object.assign(values, { NewsImage: res?.payload?.path })
            }
            setLoading(false)
          })
        } else if (!isEditImage && isEditImage1) {
          dispatch(TopicLinkImageUpload(data1)).then(res1 => {
            if (res1?.payload?.code === 200) {
              dispatch(
                updateItem({
                  ...values,
                  TopicNewsContent: addBorderCollapseToTable(values?.TopicNewsContent),
                  NewsIcon: res1?.payload?.path,
                  NewsImage: imgSrc
                })
              )
              handleClose()
              toast.success('News Update Successfully', {
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
            }
            setLoading(false)
          })
        } else {
          dispatch(
            updateItem({
              id: values?.id,
              ...values,
              TopicNewsContent: addBorderCollapseToTable(values?.TopicNewsContent),
              NewsImage: imageData1,
              NewsIcon: imageData2
            })
          )
          handleClose()
          toast.success('News Update Successfully', {
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
          setLoading(false)
        }
        setIsEdit(false)
      } else {
        setIsEdit(false)
        dispatch(NewsImageUpload(data)).then(res => {
          if (res?.payload?.code === 200) {
            // const newObj = Object.assign(values, { NewsImage: res?.payload?.path })
            dispatch(TopicLinkImageUpload(data1)).then(res1 => {
              // console.log('All values in news', values)
              if (res1?.payload?.code === 200) {
                dispatch(
                  addNewItem([
                    ...AllNews,
                    {
                      id: Date.now(),
                      ...values,
                      NewsImage: res?.payload?.path,
                      NewsIcon: res1?.payload?.path,
                      TopicNewsContent: addBorderCollapseToTable(values?.TopicNewsContent)
                    }
                  ])
                )
                handleClose()
                toast.success('News Added Successfully', {
                  style: {
                    padding: '12px',
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.primary.main}`
                  },
                  iconTheme: {
                    primary: '#73E028',
                    secondary: 'white'
                  }
                })
              } else {
                toast.error('Somthing Went to Wrong', {
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
            toast.error('Somthing Went to Wrong', {
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
          setLoading(false)
        })
      }
      setIsEditImage(false)
      setIsEditImage1(false)
    }
  })

  useEffect(() => {
    if (selectedEndDate) {
      formik.setFieldValue('NewsDate', moment(values.NewsDate).local().toISOString())
    }
  }, [values])

  const handleDelete = itemId => {
    dispatch(deleteItem(itemId))
    dispatch(clearSelectedItem())
    toast.success('News Delete Successfully', {
      style: {
        padding: '12px',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`
      },
      icon: <DeleteIcon style={{ color: 'red' }} />,
      iconTheme: {
        primary: theme.palette.primary.main,
        secondary: theme.palette.primary.contrastText
      }
    })
  }

  const handleEdit = item => {
    dispatch(selectItem(item))
    setIsEdit(true)
    setImageData1(item?.NewsImage)
    setImageData2(item?.NewsIcon)
    fetch(item?.NewsImage)
      .then(res => {
        res.blob()
      })
      .then(blob => {
        let file = new File([blob], `${item.NewsImage}`)
        fetch(item?.NewsIcon)
          .then(res => {
            res.blob()
          })
          .then(blob1 => {
            let file1 = new File([blob1], `${item.NewsIcon}`)
            formik.setFieldValue('TopicNewstitle', item?.TopicNewstitle)
            formik.setFieldValue('id', item?.id)
            formik.setFieldValue('NewsImage', file)
            formik.setFieldValue('NewsIcon', file1)
            formik.setFieldValue('NewsDate', moment(item?.NewsDate).local().toDate())
            formik.setFieldValue('TopicNewsPaper', item?.TopicNewsPaper)
            formik.setFieldValue('TopicNewsContent', item?.TopicNewsContent)
            setdbImage(true)
            setdbImage1(true)
            setPreview(true)
            setPreview1(true)
            setSelectedEndDate(moment(item?.NewsDate).local().toDate())
          })
      })
    setImgSrc(item?.NewsImage)
    setImgSrc1(item?.NewsIcon)
  }

  const style = {
    position: 'absolute',
    top: '110%',
    left: '68%',
    transform: 'translate(-50%, -50%)',
    width: 820,
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 6
  }

  return (
    <div>
      <Card>
        <CardHeader title='News' />
        {isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <CardContent>
            {params == 'ViewTopic' ? null : (
              <Button
                onClick={() => {
                  formik.resetForm()
                  handleOpen()
                  setPreview(false)
                  setPreview1(false)
                  setdbImage(false)
                  setdbImage1(false)
                  setImgSrc('/admin/images/Banner.png')
                  setImgSrc1('/admin/images/Banner.png')
                  setSelectedEndDate(null)
                }}
                size='large'
                variant='contained'
                style={{ marginRight: '10px' }}
              >
                Add News
              </Button>
            )}
            {/* {topicById
              ? GettopicbyId.TopicNews.map((item, id) => (
                  <div key={id} value={`${item.id}`}>
                    <h3>{item?.TopicNewstitle}</h3>
                    <img
                      src={`${img_url}${item?.NewsImage}`}
                      alt='dbImage'
                      style={{ height: '100px', width: '100px' }}
                      name='BannerImage'
                    />
                    <div dangerouslySetInnerHTML={{ __html: item?.TopicNewsContent }}></div>

                    <Button
                      onClick={() => {
                        handleOpen()
                        handleEdit(item)
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                  </div>
                ))
              : AllNews.map((item, id) => (
                  <div key={id} value={`${item.id}`}>
                    <h3>{item?.TopicNewstitle}</h3>
                    <img
                      src={`${img_url}${item?.NewsImage}`}
                      alt='dbImage'
                      style={{ height: '100px', width: '100px' }}
                      name='BannerImage'
                    />
                    <div dangerouslySetInnerHTML={{ __html: item?.TopicNewsContent }}></div>

                    <Button
                      onClick={() => {
                        handleOpen()
                        handleEdit(item)
                      }}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                  </div>
                ))} */}
            <br />
            <br />
            {AllNews?.map((item, id) => (
              <div key={id} value={`${item.id}`}>
                <Card>
                  <CardContent>
                    <div className='topicLinkMainContent'>
                      <div className='newsImageChild'>
                        <img
                          src={`${img_url}${item?.NewsImage}`}
                          alt='dbImage'
                          style={{ maxWidth: '100px', height: '100px', width: '100px', borderRadius: '4px' }}
                          name='BannerImage'
                        />
                      </div>
                      <div className='topicLinkSubContent' style={{ marginLeft: '15px' }}>
                        <h3 style={{ marginTop: '0', marginBottom: '0' }}>{item?.TopicNewstitle}</h3>
                        <h3 style={{ marginTop: '5px', marginBottom: '0', fontSize: '15px', fontWeight: 'normal' }}>
                          {item?.TopicNewsPaper}
                        </h3>
                        <h3 style={{ marginTop: '5px', marginBottom: '0', fontSize: '15px', fontWeight: 'normal' }}>
                          {moment(item?.NewsDate).format('DD-MM-YYYY')}
                        </h3>
                        {/* <div dangerouslySetInnerHTML={{ __html: item?.TopicNewsContent }}></div> */}
                        {/* <h3>{item?.newObj?.TopicNewsContent}</h3> */}
                        <div>
                          {params == 'ViewTopic' ? (
                            <Button
                              variant='contained'
                              onClick={() => {
                                // console.log('item', item)
                                handleOpen()
                                handleEdit(item)
                              }}
                              style={{ marginRight: '10px', marginTop: '20px' }}
                            >
                              View
                            </Button>
                          ) : (
                            <>
                              {' '}
                              <Button
                                variant='contained'
                                onClick={() => {
                                  // console.log('item', item)
                                  handleOpen()
                                  handleEdit(item)
                                }}
                                style={{ marginRight: '10px', marginTop: '20px' }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant='contained'
                                style={{ marginLeft: '10px', marginTop: '20px' }}
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <br />
              </div>
            ))}
            <div>
              <Modal
                disableEnforceFocus
                open={open}
                onClose={handleClose}
                style={{ overflowY: 'scroll', height: '500px' }}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                className='TopLinkModal'
                // tabIndex={}
                // hideBackdrop={true}
              >
                <Box sx={style} className='topic-modal-content'>
                  <formik>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                          <TextField
                            label='News Title'
                            type='text'
                            name='TopicNewstitle'
                            value={formik.values.TopicNewstitle}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            InputProps={{ readOnly: params == 'ViewTopic' ? true : false }}
                          />
                          {formik.errors.TopicNewstitle && formik.touched.TopicNewstitle ? (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                              {formik.errors.TopicNewstitle}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextField
                            label='News Paper'
                            type='text'
                            name='TopicNewsPaper'
                            value={formik.values.TopicNewsPaper}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            InputProps={{ readOnly: params == 'ViewTopic' ? true : false }}
                          />
                          {formik.errors.TopicNewsPaper && formik.touched.TopicNewsPaper ? (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                              {formik.errors.TopicNewsPaper}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <DatePickerWrapper>
                          <EditorWrapper>
                            <DatePicker
                              showYearDropdown
                              showMonthDropdown
                              readOnly={params == 'ViewTopic' ? true : false}
                              id='picker-clear'
                              name='NewsDate'
                              dateFormat='d/MM/yyyy'
                              placeholderText='News Date'
                              selected={selectedEndDate}
                              popperPlacement={popperPlacement}
                              customInput={<PickersComponent label='News Date' />}
                              onChange={date => {
                                setDateClear(date)
                                setSelectedEndDate(date)
                                const convertedDate = moment.parseZone(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                                formik.setFieldValue('NewsDate', convertedDate)
                              }}
                            />
                            {formik.errors.NewsDate && formik.touched.NewsDate ? (
                              <FormHelperText sx={{ color: 'error.main' }} style={{ marginLeft: '14px' }}>
                                {formik.errors.NewsDate}
                              </FormHelperText>
                            ) : null}
                          </EditorWrapper>
                        </DatePickerWrapper>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <Editor
                            value={formik?.values?.TopicNewsContent}
                            name='TopicNewsContent'
                            editorLoaded={editorLoaded}
                            onChange={v => {
                              formik?.setFieldValue('TopicNewsContent', v)
                            }}
                            view={params == 'ViewTopic' ? true : false}
                          />
                          {formik.errors.TopicNewsContent && formik.touched.TopicNewsContent ? (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                              {formik.errors.TopicNewsContent}
                            </FormHelperText>
                          ) : null}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {preview === false ? (
                              <ImgStyled src={imgSrc} alt='defaultImage' name='NewsImage' />
                            ) : dbImage === true ? (
                              <ImgStyled src={`${img_url}${imgSrc}`} alt='dbImage' name='NewsImage' />
                            ) : (
                              <ImgStyled src={`data:image/jpeg;base64,${imgSrc}`} alt='PreviewImage' name='NewsImage' />
                            )}
                            <div>
                              {params == 'ViewTopic' ? null : (
                                <ButtonStyled
                                  component='label'
                                  variant='contained'
                                  htmlFor='account-settings-upload-image'
                                >
                                  Upload Banner
                                  <input
                                    hidden
                                    type='file'
                                    name='NewsImage'
                                    accept='image/png, image/jpeg , image/jpg'
                                    onChange={e => {
                                      setIsEditImage(true)
                                      formik.setFieldValue('NewsImage', e.target.files[0])
                                      readImage(e, setImgSrc)
                                      setPreview(true)
                                      setdbImage(false)
                                    }}
                                    id='account-settings-upload-image'
                                  />
                                </ButtonStyled>
                              )}
                              {formik.touched.NewsImage && formik.errors.NewsImage ? (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                  {formik.errors.NewsImage}
                                </FormHelperText>
                              ) : null}
                            </div>
                          </Box>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {preview1 === false ? (
                              <ImgStyled src={imgSrc1} alt='defaultImage' name='NewsImage' />
                            ) : dbImage1 === true ? (
                              <ImgStyled src={`${img_url}${imgSrc1}`} alt='dbImage' name='NewsImage' />
                            ) : (
                              <ImgStyled
                                src={`data:image/jpeg;base64,${imgSrc1}`}
                                alt='PreviewImage'
                                name='NewsImage'
                              />
                            )}
                            <div>
                              {params == 'ViewTopic' ? null : (
                                <ButtonStyled
                                  component='label'
                                  variant='contained'
                                  htmlFor='account-settings-upload-image1'
                                >
                                  Upload Icon
                                  <input
                                    hidden
                                    type='file'
                                    name='NewsIcon'
                                    accept='image/png, image/jpeg , image/jpg'
                                    onChange={e => {
                                      setIsEditImage1(true)
                                      formik.setFieldValue('NewsIcon', e.target.files[0])
                                      readImage1(e, setImgSrc1)
                                      setPreview1(true)
                                      setdbImage1(false)
                                    }}
                                    id='account-settings-upload-image1'
                                  />
                                </ButtonStyled>
                              )}
                              {formik.touched.NewsIcon && formik.errors.NewsIcon ? (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                  {formik.errors.NewsIcon}
                                </FormHelperText>
                              ) : null}
                            </div>
                          </Box>
                        </FormControl>
                      </Grid>

                      <Grid item sm={12}>
                        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                          {params == 'ViewTopic' ? null : (
                            <Button
                              size='large'
                              onClick={() => {
                                formik.handleSubmit()
                              }}
                              variant='contained'
                              style={{ marginRight: '10px' }}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress style={{ width: ' 27px', height: '27px' }} /> : 'Save'}
                            </Button>
                          )}
                          <Button
                            size='large'
                            onClick={() => {
                              setIsEdit(false)
                              handleClose()
                              formik.setTouched(false)
                            }}
                            variant='contained'
                            style={{ marginRight: '10px' }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </formik>
                </Box>
              </Modal>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default News
