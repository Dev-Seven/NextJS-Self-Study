import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  styled
} from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import Editor from 'src/pages/Editor'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { NewsImageUpload } from 'src/store/slices/LearningSlice'
import { useDispatch } from 'react-redux'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

const TopicLinkChild = () => {
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [imgSrc1, setImgSrc1] = useState('/admin/images/Banner.png')
  const [preview, setPreview] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const [showChild, setShowChild] = useState(false)

  const dispatch = useDispatch()

  const ImgStyled = styled('img')(({ theme }) => ({
    width: 250,
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

  const Accordion = styled(props => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    }
  }))

  const AccordionSummary = styled(props => (
    <MuiAccordionSummary expandIcon={<ExpandMoreOutlinedIcon sx={{ fontSize: '2rem' }} />} {...props} />
  ))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)'
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1)
    }
  }))

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
  }))

  const initialValues = {
    TopicLinkFlowchart: '',
    NewsImage: '',
    TopicLinkEditorContent: ''
  }

  // ** function to handle topic link child
  const handleChildSubmit = values => {
    const data = new FormData()
    data.append('NewsImage', values.NewsImage)
    if (isChildEdit) {
      dispatch(NewsImageUpload(data)).then(res => {
        setChildren(true)

        // ** if we are getting 200 at that image is updated by user
        if (res?.payload?.code === 200) {
          // const newObj = Object.assign(values, { NewsImage: res?.payload?.path })
          // console.log('cnsle', values, res?.payload?.path)
          dispatch(
            updateChildItem({
              ...values,
              NewsImage: res?.payload?.path
            })
          )

          toast.success('Topic Link Update Successfully', {
            style: {
              padding: '16px',
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`
            },
            iconTheme: {
              primary: theme.palette.primary.main,
              secondary: theme.palette.primary.contrastText
            }
          })
        } else {
          // ** image is not updated by user
          // const newObj = Object.assign(values, { NewsImage: values.NewsImage })
          dispatch(updateChildItem({ id: values?.id, ...values, NewsImage: values.NewsImage }))

          toast.success('Topic Link Update Successfully', {
            style: {
              padding: '16px',
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
      setIsChildEdit(false)
    } else {
      setIsChildEdit(false)
      setChildrenLoader(true)
      dispatch(NewsImageUpload(data)).then(res => {
        setChildren(true)
        if (res?.payload?.code === 200) {
          // const newObj = Object.assign(values, { NewsImage: res?.payload?.path })

          dispatch(
            addChildItem({
              id: Date.now(),
              ...values,
              NewsImage: res?.payload?.path,
              TopicLink: formik.values.TopicLinktitle
            })
          )
          setChildrenLoader(false)
          toast.success('Topic Link Child Added Successfully', {
            style: {
              padding: '16px',
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`,
              zIndex: 9999
            },
            iconTheme: {
              primary: theme.palette.primary.main,
              secondary: theme.palette.primary.contrastText
            }
          })
        } else {
          toast.error('Something Went to Wrong', {
            style: {
              padding: '16px',
              color: theme.palette.primary.main,
              border: `1px solid ${theme.palette.primary.main}`
            },
            iconTheme: {
              primary: theme.palette.primary.main,
              secondary: theme.palette.primary.contrastText
            }
          })
        }
        setTopicLinkName(formik.values.TopicLinktitle)
      })
    }
    formikChild.resetForm()
    setImgSrc1('/admin/images/Banner.png')
    setdbImage(false)
    setPreview(true)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: values => {}
  })

  useEffect(() => {
    setEditorLoaded(true)
  }, [editorLoaded])

  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <label className='topic-links-heding'>Topic Links Flowchart</label>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <TextField
                  value={formik.values.TopicLinkFlowchart}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  label='Topic Link Flowchart'
                  type='text'
                  name='TopicLinkFlowchart'
                />
                {formik.errors.TopicLinkFlowchart && formik.touched.TopicLinkFlowchart ? (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    {formik.errors.TopicLinkFlowchart}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Flowchart Description</h4>
                <Editor
                  value={formik.values?.TopicLinkEditorContent}
                  name='TopicLinkEditorContent'
                  editorLoaded={editorLoaded}
                  onChange={v => {
                    // handleDescriptionChange(v)
                    formik?.setFieldValue('TopicLinkEditorContent', v)
                  }}
                />
                {formik.errors.TopicLinkEditorContent && formik.touched.TopicLinkEditorContent ? (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    {formik.errors.TopicLinkEditorContent}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl fullWidth>
                <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Flowchart Image</h4>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {preview === false ? (
                    <ImgStyled src={imgSrc1} alt='defaultImage' name='NewsImage' />
                  ) : dbImage === true ? (
                    <ImgStyled src={`${img_url}${imgSrc1}`} alt='dbImage' name='NewsImage' />
                  ) : (
                    <ImgStyled src={`${imgSrc1}`} alt='PreviewImage' name='NewsImage' />
                  )}
                  <div>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image1'>
                      Upload Banner
                      <input
                        hidden
                        type='file'
                        name='NewsImage'
                        accept='image/png, image/jpeg , image/jpg'
                        onChange={e => {
                          formik.setFieldValue('NewsImage', e.target.files[0])
                          handleInputImageChange(e)
                        }}
                        id='account-settings-upload-image1'
                      />
                    </ButtonStyled>
                    {formik.touched.NewsImage && formik.errors.NewsImage ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                        {formik.errors.NewsImage}
                      </FormHelperText>
                    ) : null}
                  </div>
                </Box>
              </FormControl>
            </Grid>

            {/* <Grid item xs={6} sm={3}></Grid> */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <Button
                  variant='contained'
                  onClick={() => {
                    setLoader(true)
                    formik.handleSubmit()
                    if (formik.values.TopicLinkEditorContent !== '') {
                      if (Object.values(formik.errors).length === 0) {
                        setOpenChild(false)
                      }
                    }
                  }}
                >
                  Save Flowchart
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12}>
              <div>
                {showChild === false ? (
                  <>
                    {/* <label className='topic-links-heding'>Topic Links Flowchart Listing</label> */}

                    <ul style={{ paddingLeft: '0' }}>
                      {topicLinkChildren?.map((item, index) =>
                        childrenLoader === true && children ? (
                          <h1>loading ......</h1>
                        ) : item?.TopicLink === topicLinkName ? (
                          <div key={index}>
                            <Accordion
                              className='topic-link-sec'
                              expanded={expanded === index}
                              onChange={handleChange(index)}
                            >
                              <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                                <Typography>{item?.TopicLinkFlowchart}</Typography>
                                <DeleteOutlineIcon
                                  style={{ color: 'red' }}
                                  onClick={() => handleDeleteData(item?.id)}
                                />
                              </AccordionSummary>

                              <AccordionDetails>
                                <br />
                                <div className='imageChild'>
                                  <img
                                    src={`${img_url}${item.NewsImage}`}
                                    alt='Preview'
                                    style={{
                                      maxWidth: '100px',
                                      height: '70px',
                                      width: '100px',
                                      borderRadius: '4px'
                                    }}
                                  />
                                </div>
                                <Typography>
                                  <div dangerouslySetInnerHTML={{ __html: item.TopicLinkEditorContent }}></div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        ) : null
                      )}
                    </ul>
                  </>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default TopicLinkChild
