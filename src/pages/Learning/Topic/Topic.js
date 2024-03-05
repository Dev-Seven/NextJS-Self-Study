/* eslint-disable padding-line-between-statements */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable lines-around-comment */
import React, { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import {
  getAllTopicDropdownTag,
  GetAllTopicTag,
  getCategoryBySubject,
  getTopicById
} from 'src/store/slices/LearningSlice'
import { useSelector } from 'react-redux'
import { useFormik, useFormikContext } from 'formik'
import { convertToRaw, EditorState } from 'draft-js'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { TopicSchema } from 'src/schemas'
import { useRouter } from 'next/router'
import draftToHtml from 'draftjs-to-html'
import { addNewItem, updateFormData } from 'src/store/slices/TopicSlice'
import { getAllTopicDropdownTagApi, img_url } from 'src/common/Service'
import Editor from 'src/pages/Editor'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 150,
  height: 150,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const vidStyled = styled('video')(({ theme }) => ({
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

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const Topic = ({ topicById, categoryName, response }) => {
  // ** State
  const [inputValue, setInputValue] = useState('')
  const [vidSrc, setVidSrc] = useState(
    'https://player.vimeo.com/external/474243696.sd.mp4?s=d801adbe729c8150e14b50500593636f32045cfe&profile_id=164&oauth2_token_id=57447761'
  )
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [imgSrc1, setImgSrc1] = useState('/admin/images/Banner.png')
  const [imgSrc2, setImgSrc2] = useState('/admin/images/Banner.png')
  const [preview, setPreview] = useState(false)
  // console.log('🚀  preview:', preview)
  const [preview1, setPreview1] = useState(false)
  const [preview2, setPreview2] = useState(false)
  // console.log('🚀  preview1:', preview1)
  const [vidPreview, setVidPreview] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  // console.log('🚀  dbImage:', dbImage)
  const [dbImage1, setdbImage1] = useState(false)
  const [dbImage2, setdbImage2] = useState(false)
  // console.log('🚀  dbImage1:', dbImage1)
  const [dbVideo, setDbVideo] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageUrl1, setImageUrl1] = useState('')
  const [imageUrl2, setImageUrl2] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [nameById, setNameById] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setEditorLoaded(true)
  }, [editorLoaded])

  // ** function to handle image preview
  async function readImage(e, func) {
    const file = e.target ? e.target.files[0] : e
    const reader = new FileReader()
    reader.onload = function (e) {
      let binaryData = e.target.result
      let base64String = window.btoa(binaryData)
      func(base64String)
      localStorage?.setItem('prevImg', base64String)
    }

    let image = reader.readAsBinaryString(file)

    return image
  }
  async function readImage1(e, func) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      let binaryData = e.target.result
      let base64String = window.btoa(binaryData)
      func(base64String)
      localStorage.setItem('prevImg1', base64String)
    }

    let image = reader.readAsBinaryString(file)

    return image
  }

  async function readImage2(e, func) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function (e) {
      let binaryData = e.target.result
      let base64String = window.btoa(binaryData)
      func(base64String)
      localStorage.setItem('prevImg2', base64String)
    }

    let image = reader.readAsBinaryString(file)

    return image
  }

  // ** function to handle video preview
  const handleFileUpload = event => {
    let file = event.target.files[0]
    let blobURL = URL.createObjectURL(file)
    setVidSrc(blobURL)
    localStorage.setItem('preVid', blobURL)
  }

  // Banner Image END

  async function readImageFile(e, func) {
    const file = e
    const reader = new FileReader()
    reader.onload = function (e) {
      let binaryData = e.target.result
      let base64String = window.btoa(binaryData)
      func(base64String)
    }

    let image = reader.readAsBinaryString(file)

    return image
  }

  function handleFileInputChange(e) {
    const file = e
    const reader = URL.createObjectURL(file)
    // reader.onloadend = () => {
    //   setImageUrl(reader.result)
    // }
    // const fileUrl = reader.readAsDataURL(file)
    setImgSrc(reader)
  }
  // Banner Image END

  const { values, submitForm, setFieldValue, handleBlur, handleChange, errors, touched } = useFormikContext()
  // Text Editor END
  const router = useRouter()
  // const relatedTopics = localStorage.getItem('related_topics')
  // const { id, parent, view } = router.query
  const id = localStorage.getItem('SubjectId')
  const _id = localStorage.getItem('_id')
  const params = router.query.AddTopic
  // Text Editor Start
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [text, setText] = useState()
  const [error, setError] = useState()
  const hasText = editorState.getCurrentContent().getPlainText()
  useEffect(() => {
    if (hasText) {
      setFieldValue('TopicContent', hasText)
    } else {
      setError('error')
      setFieldValue('TopicContent', '')
    }
  }, [hasText])

  const onEditorStateChange = function (editorState) {
    setEditorState(editorState)
    let text = editorState.getCurrentContent().getPlainText('\u0001')
    setText(text)
  }

  const getFileBase64 = (file, callback) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => callback(reader.result)

    reader.onerror = error => {}
  }

  const imageUploadCallback = file =>
    new Promise((resolve, reject) => getFileBase64(file, data => resolve({ data: { link: data } })))

  const config = {
    image: { uploadCallback: imageUploadCallback }
  }

  // Text Editor END

  const allTags = useSelector(state => state.LearningSlice.getAllTopicDropdownTag)
  const relatedTopics = useSelector(state => state.LearningSlice.relatedTopics)
  const maptopics = useSelector(state => state.LearningSlice.maptopics)
  const imagesTopic = useSelector(state => state.LearningSlice.imagesTopic)

  const SubjectCategory = useSelector(state => state.LearningSlice.getSubjectCategory)

  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/admin/images/avatars/1.png')
  }

  useEffect(() => {
    if (categoryName?._id) {
      setFieldValue('CategoryId', categoryName?._id)
    }
    if (categoryName?.ParentCategoryId) {
      setFieldValue('ParentCategoryId', categoryName?.ParentCategoryId)
    } else {
      setFieldValue('ParentCategoryId', '')
    }
  }, [categoryName, setFieldValue])

  const handleChange1 = () => {
    if (categoryName?.ParentCategoryId !== undefined) {
      setFieldValue('ParentCategoryId', categoryName?.ParentCategoryId)
    }
  }

  // console.log('values', values)

  useMemo(() => {
    if (topicById) {
      let topicData = topicById
      setImageUrl(topicData?.TopicBanner)
      setImageUrl1(topicData?.ShortBanner)
      setImageUrl2(topicData?.ListingIcon)
      setVideoUrl(topicData.TopicVideo)
      fetch(topicData?.TopicBanner || topicData?.TopicVideo)
        .then(res => {
          res.blob()
        })
        .then(blob => {
          let file = new File([blob], `${topicData?.TopicBanner}`)
          let file1 = new File([blob], `${topicData?.ShortBanner}`)
          let file2 = new File([blob], `${topicData?.ListingIcon}`)
          let videoFile = new File([blob], `${topicData?.TopicVideo}`)

          // file.isConverted = true
          // videoFile.isConverted = true

          setFieldValue('_id', topicData?._id)
          setFieldValue('TopicName', topicData?.TopicName)
          // setFieldValue('TopicDescription', topicData?.TopicDescription)
          setFieldValue('TopicTagId', topicData?.TopicTagId)
          setFieldValue('CategoryId', topicData?.CategoryId)
          setFieldValue('TopicContent', topicData?.TopicContent)
          setFieldValue('TopicBanner', file)
          setFieldValue('TopicVideo', videoFile)
          setFieldValue('Videos', topicData?.Videos)
          setFieldValue('CategoryId', topicData?.CategoryId)
          setFieldValue('ParentCategoryId', topicData?.ParentCategoryId)
          setFieldValue('SubjectId', topicData?.SubjectId)
          setFieldValue('MapId', maptopics.length !== 0 ? maptopics : topicData?.MapId)
          setFieldValue('RelatedTopics', relatedTopics.length !== 0 ? relatedTopics : topicData?.RelatedTopics)
          setFieldValue('TopicImages', imagesTopic.length !== 0 ? imagesTopic : topicData?.TopicImages)
          setFieldValue('ShortBanner', file1)
          setFieldValue('ListingIcon', file2)
          setFieldValue('CategoryName', topicById?.CategoryName)
          setFieldValue('categoryHierarchy', topicById?.categoryHierarchy)
        })
      setNameById(topicById?.CategoryName)
      setImgSrc(topicData?.TopicBanner)
      setVidSrc(topicData?.TopicVideo)
      setVidPreview(true)
      setdbImage(true)
      // setdbImage1(true)
      setDbVideo(true)
      setPreview(true)
      // setPreview1(true)
      if (topicById.ShortBanner) {
        setImgSrc1(topicData?.ShortBanner)
        setPreview1(true)
        setdbImage1(true)
      }
      if (topicById.ListingIcon) {
        setImgSrc2(topicData?.ListingIcon)
        setPreview2(true)
        setdbImage2(true)
      }
    }
  }, [topicById, relatedTopics, maptopics, imagesTopic])

  useEffect(() => {
    if (categoryName) {
      setFieldValue('CategoryId', categoryName?._id)
    }
  }, [setFieldValue])

  useEffect(() => {
    dispatch(getAllTopicDropdownTag())
    dispatch(getCategoryBySubject({ SubjectId: id, ParentCategoryId: '' }))
  }, [dispatch])

  useEffect(() => {
    if (values) {
      setFieldValue('TopicContent', values?.TopicContent)
    }
  }, [values?.TopicContent])

  useEffect(() => {
    const prVideo = localStorage?.getItem('preVid')
    if (prVideo) {
      setVidSrc(prVideo)
    }
  }, [vidSrc])

  // console.log('values', values)

  // useEffect(() => {
  //   if (values?.TopicBanner) {
  //     readImage(values?.TopicBanner, setImgSrc)
  //     setPreview(true)
  //     setdbImage(false)
  //   }
  // }, [values?.TopicBanner])

  const prValue = localStorage?.getItem('prevImg')
  useEffect(() => {
    if (prValue) {
      setImgSrc(prValue)
      setPreview(true)
      setdbImage(false)
    }
  }, [imgSrc])
  const prValue1 = localStorage?.getItem('prevImg1')
  useEffect(() => {
    if (prValue1) {
      setImgSrc1(prValue1)
      setPreview1(true)
      setdbImage1(false)
    }
  }, [imgSrc1])
  const prValue2 = localStorage?.getItem('prevImg2')
  useEffect(() => {
    if (prValue2) {
      setImgSrc2(prValue2)
      setPreview2(true)
      setdbImage2(false)
    }
  }, [imgSrc2])

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('prevImg')
      localStorage.removeItem('prevImg1')
      localStorage.removeItem('prevImg2')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <>
      {params == 'ViewTopic' ? (
        <div>
          <Card>
            <CardHeader title='View Topic' />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      InputProps={{ readOnly: true, disableUnderline: true }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label='Topic'
                      value={values.TopicName}
                      type='text'
                      name='TopicName'
                      id='TopicName'
                    />
                    {errors.TopicName && touched.TopicName ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.TopicName}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      InputProps={{ readOnly: true, disableUnderline: true }}
                      label='Topic Description'
                      type='text'
                      name='TopicDescription'
                      value={values.TopicDescription}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errors.TopicDescription && touched.TopicDescription ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.TopicDescription}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      InputProps={{ readOnly: true, disableUnderline: true }}
                      value={values?.CategoryName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type='text'
                      name='CatgeoryId'
                      // label='Catgeory'
                    />
                    {errors.TopicDescription && touched.TopicDescription ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.TopicDescription}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='validation-basic-select'
                      // error={Boolean(errors.select)}
                      htmlFor='validation-basic-select'
                    >
                      Topic Tag
                    </InputLabel>
                    <Select
                      readOnly
                      label='Topic Tag'
                      name='TopicTagId'
                      labelId='validation-basic-select'
                      value={values.TopicTagId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {allTags.map(item => (
                        <MenuItem key={item} value={`${item._id}`}>
                          {item.TopicTagName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.TopicTagId && touched.TopicTagId ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.TopicTagId}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Content</h4>
                    <Editor
                      value={values?.TopicContent}
                      name='TopicContent'
                      editorLoaded={editorLoaded}
                      onChange={v => {
                        setFieldValue('TopicContent', v)
                      }}
                      view={params == 'ViewTopic' ? true : false}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Image</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {preview === false ? (
                        <ImgStyled src={imgSrc} alt='defaultImage' name='TopicBanner' />
                      ) : dbImage === true ? (
                        <ImgStyled src={`${img_url}${imgSrc}`} alt='dbImage' name='TopicBanner' />
                      ) : (
                        <ImgStyled src={`data:image/jpeg;base64,${imgSrc}`} alt='PreviewImage' name='TopicBanner' />
                      )}
                      {/*<div>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                          Upload New Photo
                          <input
                            hidden
                            type='file'
                            name='TopicBanner'
                            accept='image/png, image/jpeg , image/jpg'
                            onChange={e => {
                              setFieldValue('TopicBanner', e.target.files[0])
                              readImage(e, setImgSrc)
                              setPreview(true)
                              setdbImage(false)
                            }}
                            id='account-settings-upload-image'
                          />
                        </ButtonStyled>
                        <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                      Reset
                      </ResetButtonStyled>
                        <Typography sx={{ mt: 5, color: 'text.warning' }}>
                          {touched.ProfileImage && errors.ProfileImage ? (
                            <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                              {errors.ProfileImage}
                            </FormHelperText>
                          ) : null}
                        </Typography>
                          </div>*/}
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Short Image</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {preview1 === false ? (
                        <ImgStyled src={imgSrc1} alt='defaultImage' name='TopicBanner' />
                      ) : dbImage1 === true ? (
                        <ImgStyled src={`${img_url}${imgSrc1}`} alt='dbImage' name='TopicBanner' />
                      ) : (
                        <ImgStyled src={`data:image/jpeg;base64,${imgSrc1}`} alt='PreviewImage' name='TopicBanner' />
                      )}
                      {/* <div>
                        <Typography
                          sx={{ color: 'red' }}
                          style={{ fontSize: '13px', marginBottom: '25px', maxWidth: '320px' }}
                        >
                          Note :- you can upload only .jpg, .jpeg and .png file format and file max size (375px X 220px)
                          should be up to 2 MB.
                        </Typography>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image1'>
                          Upload Photo
                          <input
                            hidden
                            type='file'
                            name='ShortBanner'
                            accept='image/png, image/jpeg , image/jpg'
                            onChange={e => {
                              setFieldValue('ShortBanner', e.target.files[0])
                              readImage1(e, setImgSrc1)
                              setPreview1(true)
                              setdbImage1(false)
                            }}
                            id='account-settings-upload-image1'
                          />
                        </ButtonStyled>
                      </div> */}
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Icon</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {preview2 === false ? (
                        <ImgStyled src={imgSrc2} alt='defaultImage' name='TopicBanner' />
                      ) : dbImage2 === true ? (
                        <ImgStyled src={`${img_url}${imgSrc2}`} alt='dbImage' name='TopicBanner' />
                      ) : (
                        <ImgStyled src={`data:image/jpeg;base64,${imgSrc2}`} alt='PreviewImage' name='TopicBanner' />
                      )}
                      {/* <div>
                        <Typography
                          sx={{ color: 'red' }}
                          style={{ fontSize: '13px', marginBottom: '25px', maxWidth: '320px' }}
                        >
                          Note :- you can upload only .jpg, .jpeg and .png file format and file max size (80px X 80px)
                          should be up to 2 MB.
                        </Typography>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image2'>
                          Upload Icon
                          <input
                            hidden
                            type='file'
                            name='ListingIcon'
                            accept='image/png, image/jpeg , image/jpg'
                            onChange={e => {
                              setFieldValue('ListingIcon', e.target.files[0])
                              readImage2(e, setImgSrc2)
                              setPreview2(true)
                              setdbImage2(false)
                            }}
                            id='account-settings-upload-image2'
                          />
                        </ButtonStyled>
                        {touched.ListingIcon || errors.ListingIcon ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                            {errors.ListingIcon}
                          </FormHelperText>
                        ) : null}
                      </div> */}
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Video</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {vidPreview === false ? (
                        // <vidStyled src={vidSrc} alt='defaultImage' name='TopicVideo' />
                        <video
                          src={vidSrc}
                          width='150'
                          style={{ borderRadius: '10px', marginRight: '1.25rem' }}
                          height='150'
                          controls
                        />
                      ) : dbVideo === false ? (
                        <video
                          src={vidSrc}
                          controls
                          width='150'
                          height='150'
                          style={{ borderRadius: '10px', marginRight: '1.25rem' }}
                        />
                      ) : (
                        // <vidStyled src={`${img_url}${vidSrc}`} alt='dbImage' name='TopicVideo' />
                        <video
                          // src={vidSrc}
                          src={`${img_url}${vidSrc}`}
                          alt='TopicVideo'
                          controls
                          width='150'
                          height='150'
                          style={{ borderRadius: '10px', marginRight: '1.25rem' }}
                        />

                        // <vidStyled src={`data:image/jpeg;base64,${vidSrc}`} alt='TopicVideo' name='TopicVideo' />
                      )}
                    </Box>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <Card>
            <CardHeader title={topicById ? 'Edit Topic' : 'Add Topic'} />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label='Topic'
                      value={values.TopicName}
                      type='text'
                      name='TopicName'
                      placeholder='Topic'
                    />
                    {errors.TopicName && touched.TopicName ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.TopicName}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      value={values.TopicDescription}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label='Topic Description'
                      type='text'
                      name='TopicDescription'
                      placeholder='Topic Description'
                    />
                    {errors.TopicDescription && touched.TopicDescription ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.TopicDescription}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      InputProps={{ readOnly: true, disableUnderline: true }}
                      disabled
                      value={Object.keys(categoryName || []).length === 0 ? nameById : categoryName?.CategoryName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='Topic Category'
                      type='text'
                      name='CatgeoryId'
                      label='Topic Catgeory'
                    />
                    {errors.CategoryId ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.CategoryId}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      id='validation-basic-select'
                      // error={Boolean(errors.select)}
                      htmlFor='validation-basic-select'
                    >
                      Topic Tag
                    </InputLabel>
                    <Select
                      value={values.TopicTagId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label='Topic Tag'
                      name='TopicTagId'
                      labelId='validation-basic-select'
                    >
                      {allTags?.map(item => (
                        <MenuItem key={item} value={`${item._id}`}>
                          {item.TopicTagName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.TopicTagId && touched.TopicTagId ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.TopicTagId}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Content</h4>
                    <Editor
                      value={values?.TopicContent}
                      name='TopicContent'
                      editorLoaded={editorLoaded}
                      onChange={v => {
                        setFieldValue('TopicContent', v)
                      }}
                      view={params == 'ViewTopic' ? true : false}
                    />
                    {errors.TopicContent && touched.TopicContent ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {errors.TopicContent}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Image</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {preview === false ? (
                        <ImgStyled src={imgSrc} alt='defaultImage' name='TopicBanner' />
                      ) : dbImage === true ? (
                        <ImgStyled src={`${img_url}${imgSrc}`} alt='dbImage' name='TopicBanner' />
                      ) : (
                        <ImgStyled src={`data:image/jpeg;base64,${imgSrc}`} alt='PreviewImage' name='TopicBanner' />
                      )}
                      <div>
                        <Typography
                          sx={{ color: 'red' }}
                          style={{ fontSize: '13px', marginBottom: '25px', maxWidth: '320px' }}
                        >
                          Note :- you can upload only .jpg, .jpeg and .png file format and file max size (375px X 220px)
                          should be up to 2 MB.
                        </Typography>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                          Upload Photo
                          <input
                            hidden
                            type='file'
                            name='TopicBanner'
                            accept='image/png, image/jpeg , image/jpg'
                            onChange={e => {
                              setFieldValue('TopicBanner', e.target.files[0])
                              readImage(e, setImgSrc)
                              setPreview(true)
                              setdbImage(false)
                            }}
                            id='account-settings-upload-image'
                          />
                        </ButtonStyled>
                        {touched.TopicBanner || errors.TopicBanner ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                            {errors.TopicBanner}
                          </FormHelperText>
                        ) : null}
                      </div>
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Short Image</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {preview1 === false ? (
                        <ImgStyled src={imgSrc1} alt='defaultImage' name='TopicBanner' />
                      ) : dbImage1 === true ? (
                        <ImgStyled src={`${img_url}${imgSrc1}`} alt='dbImage' name='TopicBanner' />
                      ) : (
                        <ImgStyled src={`data:image/jpeg;base64,${imgSrc1}`} alt='PreviewImage' name='TopicBanner' />
                      )}
                      <div>
                        <Typography
                          sx={{ color: 'red' }}
                          style={{ fontSize: '13px', marginBottom: '25px', maxWidth: '320px' }}
                        >
                          Note :- you can upload only .jpg, .jpeg and .png file format and file max size (80px X 80px)
                          should be up to 2 MB.
                        </Typography>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image1'>
                          Upload Photo
                          <input
                            hidden
                            type='file'
                            name='ShortBanner'
                            accept='image/png, image/jpeg , image/jpg'
                            onChange={e => {
                              setFieldValue('ShortBanner', e.target.files[0])
                              readImage1(e, setImgSrc1)
                              setPreview1(true)
                              setdbImage1(false)
                            }}
                            id='account-settings-upload-image1'
                          />
                        </ButtonStyled>
                      </div>
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Icon</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {preview2 === false ? (
                        <ImgStyled src={imgSrc2} alt='defaultImage' name='TopicBanner' />
                      ) : dbImage2 === true ? (
                        <ImgStyled src={`${img_url}${imgSrc2}`} alt='dbImage' name='TopicBanner' />
                      ) : (
                        <ImgStyled src={`data:image/jpeg;base64,${imgSrc2}`} alt='PreviewImage' name='TopicBanner' />
                      )}
                      <div>
                        <Typography
                          sx={{ color: 'red' }}
                          style={{ fontSize: '13px', marginBottom: '25px', maxWidth: '320px' }}
                        >
                          Note :- you can upload only .jpg, .jpeg and .png file format and file max size (80px X 80px)
                          should be up to 2 MB.
                        </Typography>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image2'>
                          Upload Icon
                          <input
                            hidden
                            type='file'
                            name='ListingIcon'
                            accept='image/png, image/jpeg , image/jpg'
                            onChange={e => {
                              setFieldValue('ListingIcon', e.target.files[0])
                              readImage2(e, setImgSrc2)
                              setPreview2(true)
                              setdbImage2(false)
                            }}
                            id='account-settings-upload-image2'
                          />
                        </ButtonStyled>
                        {touched.ListingIcon || errors.ListingIcon ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                            {errors.ListingIcon}
                          </FormHelperText>
                        ) : null}
                      </div>
                    </Box>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Video</h4>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {vidPreview === false ? (
                        // <vidStyled src={vidSrc} alt='defaultImage' name='TopicVideo' />
                        <video
                          src={vidSrc}
                          width='150'
                          style={{ borderRadius: '10px', marginRight: '1.25rem' }}
                          height='150'
                          controls
                        />
                      ) : dbVideo === false ? (
                        <video
                          src={vidSrc}
                          controls
                          width='150'
                          height='150'
                          style={{ borderRadius: '10px', marginRight: '1.25rem' }}
                        />
                      ) : (
                        // <vidStyled src={`${img_url}${vidSrc}`} alt='dbImage' name='TopicVideo' />
                        <video
                          // src={vidSrc}
                          src={`${img_url}${vidSrc}`}
                          alt='TopicVideo'
                          controls
                          width='150'
                          height='150'
                          style={{ borderRadius: '10px', marginRight: '1.25rem' }}
                        />

                        // <vidStyled src={`data:image/jpeg;base64,${vidSrc}`} alt='TopicVideo' name='TopicVideo' />
                      )}
                      <div>
                        <ButtonStyled component='label' variant='contained'>
                          Upload Video
                          <input
                            hidden
                            type='file'
                            accept='video/mp4'
                            onChange={e => {
                              setFieldValue('TopicVideo', e.target.files[0])
                              handleFileUpload(e)
                              setVidPreview(true)
                              setDbVideo(false)
                            }}
                          />
                        </ButtonStyled>
                        {/*<ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                        Reset
                      </ResetButtonStyled>
                      <Typography sx={{ mt: 5, color: 'text.disabled' }}>
                        Allowed PNG or JPEG. Max size of 800K.
                        </Typography>*/}
                        {touched.TopicVideo && errors.TopicVideo ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                            {errors.TopicVideo}
                          </FormHelperText>
                        ) : null}
                      </div>
                    </Box>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default Topic
