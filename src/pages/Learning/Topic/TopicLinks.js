/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable lines-around-comment */
import styled from '@emotion/styled'
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
  Icon,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import { useFormik, useFormikContext } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { img_url } from 'src/common/Service'
import { TopicLinkSchema, topicLinkChildSchema, topicLinkMainSchema } from 'src/schemas'
import {
  NewsImageUpload,
  RelatedTopicImageUpload,
  TopicLinkImageUpload,
  deleteTopicLink,
  editTopicLink,
  getTopicById
} from 'src/store/slices/LearningSlice'
import {
  addChildItem,
  addLinkItem,
  clearLinkItem,
  clearSelectedChild,
  clearSelectedItem,
  deleteLinkItem,
  deleteTopicLinkItem,
  removeChildItem,
  selectChildItem,
  selectLinkItem,
  updateChildItem,
  updateFormData,
  updateLinkItem,
  updateLinkItemAddTime
} from 'src/store/slices/TopicSlice'
import Editor from '../../../pages/Editor'
import { Label } from 'recharts'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import EditIcon from '@mui/icons-material/Edit'
import { ChromePicker } from 'react-color'

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

const TopicLinks = ({ topicById }) => {
  const GettopicbyId = topicById

  const [imageData1, setImageData1] = useState('')
  const [imageData2, setImageData2] = useState('')
  const [isEditImage, setIsEditImage] = useState(false)
  const [isEditImage2, setIsEditImage2] = useState(false)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  // const handleClose = () => setOpen(false)
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
    // setOpen(false)
  }
  const [isEdit, setIsEdit] = useState(false)
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [imgSrc1, setImgSrc1] = useState('/admin/images/Banner.png')
  const [imgSrc2, setImgSrc2] = useState('/admin/images/Banner.png')
  const [preview, setPreview] = useState(false)
  const [preview2, setPreview2] = useState(false)
  const [dbImage, setdbImage] = useState(false)
  const [dbImage2, setdbImage2] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState([])
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [showChild, setShowChild] = useState(false)
  const [dbData, setDbData] = useState(false)
  const [dbData2, setDbData2] = useState(false)
  const [isChildEdit, setIsChildEdit] = useState(false)
  const [topicLinkName, setTopicLinkName] = useState('')
  const [topicLinkChildren, setTopicLinkChildren] = useState([])
  const [isDisabled, setIsDisabled] = useState(false)
  const [parentChild, setParentChild] = useState(false)
  const [children, setChildren] = useState(false)
  const [openChild, setOpenChild] = useState(false)
  const [childrenLoader, setChildrenLoader] = useState(false)
  const [isInput, setIsInput] = useState(false)
  const [isInput2, setIsInput2] = useState(false)
  const [loader, setLoader] = useState(false)
  const { setFieldValue, values } = useFormikContext()
  const [colors, setColors] = useState(null)

  const [expanded, setExpanded] = useState('panel1')

  const AllLinks = useSelector(state => state.TopicSlice.linkItem)
  const ChildLinks = useSelector(state => state.TopicSlice?.topicLinkChild)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const dispatch = useDispatch()

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const router = useRouter()
  // const { _id, view } = router.query

  const id = localStorage.getItem('id')
  const _id = localStorage.getItem('id')
  // const id = localStorage.getItem('SubjectId')
  // const _id = localStorage.getItem('id')
  const params = router.query.AddTopic

  const theme = useTheme()

  useEffect(() => {
    setEditorLoaded(true)
  }, [editorLoaded])

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

  // useEffect to change topic link children state whenever ChildLinks Changes
  useEffect(() => {
    if (ChildLinks) {
      setTopicLinkChildren(ChildLinks)
      // if (item?.TopicLink === topicLinkName) {
      formik.setFieldValue('children', ChildLinks)
      // }
      // ChildLinks.map(item => {
      //   if (item?.TopicLink === topicLinkName) {
      //     formik.setFieldValue('children', [...formik.values.children, item])
      //   }
      // })
    }
  }, [topicLinkChildren, ChildLinks])

  useEffect(() => {
    setFieldValue('TopicLink', AllLinks)
  }, [AllLinks])

  // handle topic link children Delete Data
  const handleDeleteData = id => {
    dispatch(removeChildItem(id))
    // dispatch(clearSelectedChild(index))
    // setData(data.filter((_, i) => i !== index))
  }

  // handle topic link children edit
  const handleEditData = index => {
    setIsChildEdit(true)
    // Get the item being edited
    const editedItem = ChildLinks[index]
    let newitem = editedItem.TopicLinkFlowchart
    // Update the formData state with the values of the edited item
    formikChild.setFieldValue('TopicLinkFlowchart', editedItem?.TopicLinkFlowchart)
    formikChild.setFieldValue('id', editedItem?.id)
    formikChild.setFieldValue('NewsImage', editedItem?.NewsImage)
    formikChild.setFieldValue('TopicLinkEditorContent', editedItem?.TopicLinkEditorContent)
    formikChild.setFieldValue('TopicLink', editedItem?.TopicLink)
    setdbImage(true)
    setPreview(true)
    setTopicLinkName(editedItem?.TopicLink)
    // Set the selectedChild state to the index of the edited item
    dispatch(selectChildItem(index))
    setImgSrc1(editedItem.NewsImage)
  }

  // ** function to handle image input change
  const handleInputImageChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => {
        if (file.target.id === 'account-settings-upload-image') {
          setImgSrc(reader.result)
        } else if (file.target.id === 'account-settings-upload-image2') {
          setImgSrc2(reader.result)
        } else {
          setImgSrc1(reader.result)
        }
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
  }

  const handleEdit = item => {
    // console.log('🚀  item:', item)
    setShowChild(true)
    setTopicLinkName(item?.TopicLinktitle)
    setImageData1(item?.relatedTopicImage)
    setImageData2(item?.NewsIcon)
    // console.log('relatedTopicImage', item?.relatedTopicImage)
    dispatch(selectLinkItem(item))
    // console.log(item)
    fetch(item?.relatedTopicImage)
      .then(res => {
        res.blob()
      })
      .then(blob => {
        let file = new File([blob], `${item.relatedTopicImage}`)
        fetch(item?.NewsIcon)
          .then(res => {
            res.blob()
          })
          .then(blob1 => {
            let file1 = new File([blob1], `${item.NewsIcon}`)
            formik.setFieldValue('_id', item?._id)
            formik.setFieldValue('TopicLinktitle', item?.TopicLinktitle)
            formik.setFieldValue('colorCode', item?.colorCode)
            formik.setFieldValue('relatedTopicImage', file)
            formik.setFieldValue('NewsIcon', file1)
            formik.setFieldValue('TopicLinkContent', item?.TopicLinkContent)
            formik.setFieldValue('children', item?.children)
            formik.setFieldValue('id', item?.id)
          })
      })
    // console.log(formik.values)
    // console.log(item)
    if (item?._id) {
      item?.children?.forEach(child => {
        const existingChild = ChildLinks.find(c => c?.TopicLink === child?.TopicLink)
        if (!existingChild) {
          dispatch(addChildItem(child))
        }
      })

      setDbData(true)
      // setIsEditImage(item?.relatedTopicImage)
    }

    setData(item?.children)
    setdbImage(true)
    setdbImage2(true)
    setPreview(true)
    setPreview2(true)
    setIsEdit(true)
    setIsInput(true)
    setIsInput2(true)
    setImgSrc(item?.relatedTopicImage)
    setImgSrc2(item?.NewsIcon)
  }

  const initialValues = {
    TopicLinktitle: '',
    TopicLinkContent: '',
    relatedTopicImage: '',
    NewsIcon: '',
    TopicLinkIcon: '',
    colorCode: '#000000',
    children: []
  }

  const handleParentSubmit = values => {
    let tempArray = []
    let newObj = { ...values }
    let child = values?.children?.filter(temp => temp.TopicLink == values.TopicLinktitle)
    newObj.children = child
    tempArray.push(newObj)
    // console.log('🚀  values:', values)
    function addBorderCollapseToTable(htmlContent) {
      let parser = new DOMParser()
      let doc = parser.parseFromString(htmlContent, 'text/html')
      let tables = doc.querySelectorAll('figure.table table')

      tables.forEach(table => {
        table.style.borderCollapse = 'collapse'
      })

      return new XMLSerializer().serializeToString(doc)
    }

    const toastConfigSuccess = {
      // style: {
      //   padding: '12px',
      //   color: theme.palette.primary.main,
      //   border: `1px solid ${theme.palette.primary.main}`
      // },
      // iconTheme: {
      //   primary: theme.palette.primary.main,
      //   secondary: theme.palette.primary.contrastText
      // }
      style: {
        padding: '12px',
        color: ' #787EFF',
        backgroundColor: 'white',
        border: '1px solid #787EFF'
      },
      icon: <EditIcon style={{ color: '#787EFF' }} />,
      iconTheme: {
        primary: '#73E028',
        secondary: 'white'
      }
    }

    const toastConfigError = {
      style: {
        padding: '12px',
        color: '#787EFF',
        backgroundColor: 'white',
        border: '1px solid #787EFF'
      },
      iconTheme: {
        primary: 'white',
        secondary: 'red'
      }
      // style: {
      //   padding: '12px',
      //   color: ' #787EFF',
      //   backgroundColor: 'white',
      //   border: '1px solid #787EFF'
      // },

      // iconTheme: {
      //   primary: '#73E028',
      //   secondary: 'white'
      // }
    }

    const data = new FormData()
    const data1 = new FormData()
    // console.log(values)
    data.append('relatedTopicImage', isEditImage ? values.relatedTopicImage : imageData1)
    data1.append('NewsIcon', isEditImage2 ? values.NewsIcon : imageData2)
    if (isEdit) {
      if (!dbData) {
        if (isEditImage && isEditImage2) {
          dispatch(RelatedTopicImageUpload(data)).then(res => {
            setParentChild(true)
            if (res?.payload?.code === 200) {
              // console.log(res?.payload?.path)
              dispatch(TopicLinkImageUpload(data1)).then(res1 => {
                if (res1?.payload?.code === 200) {
                  dispatch(
                    updateLinkItemAddTime({
                      ...values,
                      relatedTopicImage: res?.payload?.path,
                      NewsIcon: res1?.payload?.path,
                      TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
                    })
                  )
                  handleClose()
                  toast.success('Topic Link Updated Successfully', toastConfigSuccess)
                } else {
                  dispatch(
                    updateLinkItemAddTime({
                      id: values?._id,
                      ...values,
                      relatedTopicImage: res?.payload?.path,
                      NewsIcon: imageData2,
                      TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
                    })
                  )
                  handleClose()
                  toast.success('Topic Link Updated Successfully', toastConfigSuccess)
                }
              })
            } else {
              dispatch(TopicLinkImageUpload(data1)).then(res1 => {
                if (res1?.payload?.code === 200) {
                  dispatch(
                    updateLinkItemAddTime({
                      id: values?._id,
                      ...values,
                      relatedTopicImage: imageData1,
                      NewIcon: res1.payload.path,
                      TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
                    })
                  )
                  handleClose()
                  toast.success('Topic Link Updated Successfully', toastConfigSuccess)
                } else {
                  dispatch(
                    updateLinkItemAddTime({
                      id: values?._id,
                      ...values,
                      relatedTopicImage: imageData1,
                      NewsIcon: imageData2,
                      TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
                    })
                  )
                  handleClose()
                  toast.success('Topic Link Updated Successfully', toastConfigSuccess)
                }
              })
            }
          })
        } else if (isEditImage && !isEditImage2) {
          dispatch(RelatedTopicImageUpload(data)).then(res => {
            setParentChild(true)
            if (res?.payload?.code === 200) {
              // console.log(res?.payload?.path)
              dispatch(
                updateLinkItemAddTime({
                  ...values,
                  relatedTopicImage: res?.payload?.path,
                  NewsIcon: imageData2,
                  TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
                })
              )
              handleClose()
              toast.success('Topic Link Updated Successfully', toastConfigSuccess)
            } else {
              dispatch(
                updateLinkItemAddTime({
                  id: values?._id,
                  ...values,
                  relatedTopicImage: imageData1,
                  NewsIcon: imageData2,
                  TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
                })
              )
              handleClose()
              toast.success('Topic Link Updated Successfully', toastConfigSuccess)
            }
          })
        } else if (!isEditImage && isEditImage2) {
          dispatch(TopicLinkImageUpload(data1)).then(res1 => {
            setParentChild(true)
            if (res1?.payload?.code === 200) {
              // console.log(res?.payload?.path)
              dispatch(
                updateLinkItemAddTime({
                  ...values,
                  relatedTopicImage: imageData1,
                  NewsIcon: res1?.payload?.path,
                  TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
                })
              )
              handleClose()
              toast.success('Topic Link Updated Successfully', toastConfigSuccess)
            } else {
              dispatch(
                updateLinkItemAddTime({
                  id: values?._id,
                  ...values,
                  relatedTopicImage: imageData1,
                  NewsIcon: imageData2,
                  TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
                })
              )
              handleClose()
              toast.success('Topic Link Updated Successfully', toastConfigSuccess)
            }
          })
        } else {
          // console.log('hereeee')
          dispatch(
            updateLinkItemAddTime({
              ...values,
              relatedTopicImage: imageData1,
              NewsIcon: imageData2,
              TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
            })
          )
          handleClose()
          toast.success('Topic Link Updated Successfully', toastConfigSuccess)
        }
      } else {
        // console.log(Object.fromEntries(data))
        if (isEditImage && isEditImage2) {
          dispatch(RelatedTopicImageUpload(data)).then(res => {
            if (res?.payload?.code == 200) {
              dispatch(TopicLinkImageUpload(data1)).then(res1 => {
                if (res1?.payload?.code == 200) {
                  dispatch(
                    editTopicLink({
                      id: values?._id,
                      ...newObj,
                      relatedTopicImage: res?.payload?.path,
                      NewsIcon: res1?.payload?.path
                    })
                  ).then(res3 => {
                    setParentChild(true)
                    handleClose()
                    if (res3?.payload?.status === 200) {
                      // console.log('image', res?.payload)
                      dispatch(
                        updateLinkItem({
                          id: res3?.payload.data?._id,
                          ...res3?.payload.data,
                          relatedTopicImage: res3?.payload.data.relatedTopicImage,
                          NewsIcon: res3?.payload.data.NewsIcon
                        })
                      )
                      toast.success(res3?.payload?.message, toastConfigSuccess)
                    } else {
                      // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
                      toast.error(res3?.payload?.message, toastConfigError)
                    }
                  })
                } else {
                  dispatch(
                    editTopicLink({
                      id: values?._id,
                      ...newObj,
                      relatedTopicImage: res?.payload?.path,
                      NewsIcon: imageData2
                    })
                  ).then(res3 => {
                    setParentChild(true)
                    handleClose()
                    if (res3?.payload?.status === 200) {
                      // console.log('image', res?.payload)
                      dispatch(
                        updateLinkItem({
                          id: res3?.payload.data?._id,
                          ...res3?.payload.data,
                          relatedTopicImage: res3?.payload.data.relatedTopicImage,
                          NewsIcon: imageData2
                        })
                      )
                      toast.success(res3?.payload?.message, toastConfigSuccess)
                    } else {
                      // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
                      toast.error(res3?.payload?.message, toastConfigError)
                    }
                  })
                }
              })
            } else {
              dispatch(TopicLinkImageUpload(data1)).then(res1 => {
                if (res1?.payload?.code == 200) {
                  dispatch(
                    editTopicLink({
                      id: values?._id,
                      ...values,
                      relatedTopicImage: imageData1,
                      NewsIcon: res1?.payload?.path
                    })
                  ).then(res3 => {
                    setParentChild(true)
                    handleClose()
                    if (res3?.payload?.status === 200) {
                      // console.log('image', res?.payload)
                      dispatch(
                        updateLinkItem({
                          id: res3?.payload.data?._id,
                          ...res3?.payload.data,
                          relatedTopicImage: imageData1,
                          NewsIcon: res3?.payload.data.NewsIcon
                        })
                      )
                      toast.success(res3?.payload?.message, toastConfigSuccess)
                    } else {
                      // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
                      toast.error(res3?.payload?.message, toastConfigError)
                    }
                  })
                } else {
                  dispatch(
                    editTopicLink({
                      id: values?._id,
                      ...values,
                      relatedTopicImage: imageData1,
                      NewsIcon: imageData2
                    })
                  ).then(res3 => {
                    setParentChild(true)
                    handleClose()
                    if (res3?.payload?.status === 200) {
                      // console.log('image', res?.payload)
                      dispatch(
                        updateLinkItem({
                          id: res3?.payload.data?._id,
                          ...res3?.payload.data,
                          relatedTopicImage: imageData1,
                          NewsIcon: imageData2
                        })
                      )
                      toast.success(res3?.payload?.message, toastConfigSuccess)
                    } else {
                      // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
                      toast.error(res3?.payload?.message, toastConfigError)
                    }
                  })
                }
              })
            }
          })
        } else if (isEditImage && !isEditImage2) {
          dispatch(RelatedTopicImageUpload(data)).then(res => {
            if (res?.payload?.code == 200) {
              dispatch(
                editTopicLink({
                  id: values?._id,
                  ...newObj,
                  relatedTopicImage: res?.payload?.path,
                  NewsIcon: imageData2
                })
              ).then(res3 => {
                setParentChild(true)
                handleClose()
                if (res3?.payload?.status === 200) {
                  // console.log('image', res?.payload)
                  dispatch(
                    updateLinkItem({
                      id: res3?.payload.data?._id,
                      ...res3?.payload.data,
                      relatedTopicImage: res3?.payload.data.relatedTopicImage,
                      NewsIcon: imageData2
                    })
                  )
                  toast.success(res3?.payload?.message, toastConfigSuccess)
                } else {
                  // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
                  toast.error(res3?.payload?.message, toastConfigError)
                }
              })
            } else {
              dispatch(
                editTopicLink({
                  id: values?._id,
                  ...newObj,
                  relatedTopicImage: imageData1,
                  NewsIcon: imageData2
                })
              ).then(res3 => {
                setParentChild(true)
                handleClose()
                if (res3?.payload?.status === 200) {
                  // console.log('image', res?.payload)
                  dispatch(
                    updateLinkItem({
                      id: res3?.payload.data?._id,
                      ...res3?.payload.data,
                      relatedTopicImage: imageData1,
                      NewsIcon: imageData2
                    })
                  )
                  toast.success(res3?.payload?.message, toastConfigSuccess)
                } else {
                  // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
                  toast.error(res3?.payload?.message, toastConfigError)
                }
              })
            }
          })
        } else if (!isEditImage && isEditImage2) {
          dispatch(TopicLinkImageUpload(data1)).then(res1 => {
            if (res1?.payload?.code == 200) {
              dispatch(
                editTopicLink({
                  id: values?._id,
                  ...newObj,
                  relatedTopicImage: imageData1,
                  NewsIcon: res1?.payload?.path
                })
              ).then(res3 => {
                setParentChild(true)
                handleClose()
                if (res3?.payload?.status === 200) {
                  // console.log('image', res?.payload)
                  dispatch(
                    updateLinkItem({
                      id: res3?.payload.data?._id,
                      ...res3?.payload.data,
                      relatedTopicImage: imageData1,
                      NewsIcon: res3?.payload.data.NewsIcon
                    })
                  )
                  toast.success(res3?.payload?.message, toastConfigSuccess)
                } else {
                  // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
                  toast.error(res3?.payload?.message, toastConfigError)
                }
              })
            } else {
              dispatch(
                editTopicLink({
                  id: values?._id,
                  ...newObj,
                  relatedTopicImage: imageData1,
                  NewsIcon: imageData2
                })
              ).then(res3 => {
                setParentChild(true)
                handleClose()
                if (res3?.payload?.status === 200) {
                  // console.log('image', res?.payload)
                  dispatch(
                    updateLinkItem({
                      id: res3?.payload.data?._id,
                      ...res3?.payload.data,
                      relatedTopicImage: imageData1,
                      NewsIcon: imageData2
                    })
                  )
                  toast.success(res3?.payload?.message, toastConfigSuccess)
                } else {
                  // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
                  toast.error(res3?.payload?.message, toastConfigError)
                }
              })
            }
          })
        } else {
          // console.log('Values Data', values)

          // console.log('Temp Array', newObj)
          dispatch(
            editTopicLink({ id: values?._id, ...newObj, relatedTopicImage: imageData1, NewsIcon: imageData2 })
          ).then(res => {
            setParentChild(true)
            handleClose()
            if (res?.payload?.status === 200) {
              // console.log('image', res?.payload)
              dispatch(
                updateLinkItem({
                  id: res?.payload.data?._id,
                  ...res?.payload.data,
                  relatedTopicImage: imageData1,
                  NewsIcon: imageData2
                })
              )
              toast.success(res?.payload?.message, toastConfigSuccess)
            } else {
              // dispatch(updateLinkItem({ id: values?._id, ...values, relatedTopicImage: res?.payload?.path }))
              toast.error(res?.payload?.message, toastConfigError)
            }
          })
        }
      }
    } else {
      // dispatch(RelatedTopicImageUpload(data)).then(res => {
      //   setParentChild(true)
      //   if (res?.payload?.code === 200) {
      //     dispatch(TopicLinkImageUpload(data1)).then(res1 => {
      //       if (res1?.payload?.code === 200) {
      //         dispatch(
      //           addLinkItem([
      //             ...AllLinks,
      //             {
      //               id: Date.now(),
      //               ...values,
      //               relatedTopicImage: res?.payload?.path,
      //               NewsIcon: res1?.payload?.path,
      //               TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
      //             }
      //           ])
      //         )
      //         handleClose()
      //         toast.success('Topic Link Added Successfully', toastConfigSuccess)
      //       } else {
      //         toast.error('Something Went Wrong', toastConfigError)
      //       }
      //     })
      //   }
      // })
      dispatch(RelatedTopicImageUpload(data)).then(res => {
        setParentChild(true)
        if (res?.payload?.code === 200) {
          dispatch(TopicLinkImageUpload(data1)).then(res1 => {
            if (res1?.payload?.code === 200) {
              const newItem = {
                id: Date.now(),
                ...values,
                relatedTopicImage: res?.payload?.path,
                NewsIcon: res1?.payload?.path,
                TopicLinkContent: addBorderCollapseToTable(values.TopicLinkContent)
              }

              const isDuplicate = AllLinks.some(existingItem => existingItem.TopicLinktitle === newItem.TopicLinktitle)

              if (!isDuplicate) {
                dispatch(addLinkItem([...AllLinks, newItem]))
                handleClose()
                toast.success('Topic Link Added Successfully', toastConfigSuccess)
              } else {
                handleClose()
                toast.error('Duplicate Topic Link title. Topic Link not added.', toastConfigError)
              }
            } else {
              toast.error('Something Went Wrong', toastConfigError)
            }
          })
        }
      })
    }

    setIsEdit(false)
    setIsEditImage(false)
    setIsEditImage2(false)
    setDbData(false)
  }

  // ** formik state to manage submit and edit of the main topic link
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: topicLinkMainSchema,
    onSubmit: values => {
      handleParentSubmit(values)
    }
  })

  // function to handle main topic link delete
  const handleDelete = itemId => {
    if (itemId?._id) {
      dispatch(deleteTopicLink(itemId?._id)).then(res => {
        if (res?.payload.status === 200) {
          dispatch(deleteTopicLinkItem(itemId?._id))
          dispatch(clearSelectedItem())
          toast.success(res?.payload?.message, {
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
          toast.error(res?.payload?.message, {
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
    } else if (itemId?.id) {
      dispatch(deleteLinkItem(itemId?.id))
      dispatch(clearSelectedItem())
      toast.success('Topic Link Deleted Successfully', {
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
    // dispatch(clearSelectedItem())
  }

  // ** useEffect to check topicLinkChildren state when edit the topic link
  useEffect(() => {
    if (_id) {
      // ChildLinks?.map(item => {
      //   if (item?.TopicLink === topicLinkName) {
      //     formik.setFieldValue('children', [...topicLinkChildren, item])
      //   }
      // })
    } else {
      ChildLinks?.map(item => {
        if (item?.TopicLink === topicLinkName) {
          formik.setFieldValue('children', [...topicLinkChildren, item])
        }
      })
    }
  }, [ChildLinks])

  // ** useEffect to handle the input values clear after the submit in topic link children
  useEffect(() => {
    if (data) {
      setShowChild(false)
    }
  }, [showChild, data])

  // ** function to handle input disable
  useEffect(() => {
    if (_id) {
      setIsDisabled(true)
    } else if (_id && !showChild) {
      setIsDisabled(false)
    }
  }, [_id, showChild, isDisabled])

  // ** formik to handle topic link child item
  const childValues = {
    TopicLinkFlowchart: '',
    NewsImage: '',
    TopicLinkEditorContent: ''
    // colorCode: ''
  }

  // ** function to handle topic link children submission
  const handleChildSubmit = values => {
    const data = new FormData()
    function addBorderCollapseToTable(htmlContent) {
      let parser = new DOMParser()
      let doc = parser.parseFromString(htmlContent, 'text/html')
      let tables = doc.querySelectorAll('figure.table table')

      tables.forEach(table => {
        table.style.borderCollapse = 'collapse'
      })

      return new XMLSerializer().serializeToString(doc)
    }

    data.append('NewsImage', values.NewsImage || '')
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
              NewsImage: res?.payload?.path,
              TopicLinkEditorContent: addBorderCollapseToTable(values.TopicLinkEditorContent)
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
              TopicLink: formik.values.TopicLinktitle,
              TopicLinkEditorContent: addBorderCollapseToTable(values.TopicLinkEditorContent)
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
    // setdbImage(false)
    // setPreview(true)
  }

  const formikChild = useFormik({
    enableReinitialize: true,
    initialValues: childValues,
    validationSchema: topicLinkChildSchema,
    onSubmit: values => {
      handleChildSubmit(values)
    }
  })

  return (
    <Card>
      <CardHeader title='Topic Links' />
      {isLoading === true && parentChild ? (
        <FallbackSpinner />
      ) : (
        <CardContent>
          {params == 'ViewTopic' ? null : (
            <Button
              onClick={() => {
                handleOpen()
                formik.resetForm()
                setPreview(false)
                setPreview2(false)
                setdbImage(false)
                setdbImage2(false)
                setImgSrc('/admin/images/Banner.png')
                setImgSrc2('/admin/images/Banner.png')
                setShowChild(false)
                setTopicLinkName('')
                // setData([])
              }}
              size='large'
              variant='contained'
              style={{ marginRight: '10px' }}
            >
              Add Links
            </Button>
          )}

          <br />
          <br />

          {AllLinks?.map((item, id) => (
            <div key={id} value={`${item.id}`}>
              <Card>
                <CardContent>
                  <div className='topicLinkMainContent '>
                    <div className='imageChild'>
                      <img
                        src={`${img_url}${item?.relatedTopicImage}`}
                        alt='dbImage'
                        style={{ maxWidth: '100px', height: '100px', width: '100px', borderRadius: '4px' }}
                        name='BannerImage'
                      />
                    </div>
                    <div className='topicLinkSubContent' style={{ marginLeft: '15px' }}>
                      <h3 style={{ marginTop: '0', marginBottom: '0' }}>{item?.TopicLinktitle}</h3>
                      {/* <div dangerouslySetInnerHTML={{ __html: item?.TopicLinkContent }}></div> */}
                      <div>
                        {params == 'ViewTopic' ? (
                          <Button
                            variant='contained'
                            onClick={() => {
                              handleOpen()
                              handleEdit(item)
                              setShowChild(true)
                            }}
                            style={{ marginRight: '10px', marginTop: '30px' }}
                          >
                            view
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant='contained'
                              onClick={() => {
                                handleOpen()
                                handleEdit(item)
                                setShowChild(true)
                              }}
                              style={{ marginRight: '10px', marginTop: '30px' }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant='contained'
                              onClick={() => handleDelete(item)}
                              style={{ marginRight: '10px', marginTop: '30px' }}
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <br />
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
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
              style={{ overflowY: 'scroll', height: '500px' }}
              className='TopLinkModal'
              // hideBackdrop={true}
            >
              <Box sx={style} className='topic-modal-content'>
                {params == 'ViewTopic' ? (
                  <Grid item xs={12} sm={12}>
                    <div>
                      {showChild === false ? (
                        <>
                          <Card>
                            <CardContent>
                              <Grid container spacing={5}>
                                <Grid item xs={12}>
                                  <label className='topic-links-heding'>Topic Links</label>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                  <FormControl fullWidth>
                                    <TextField
                                      InputProps={{ readOnly: true, disableUnderline: true }}
                                      label='Topic Link Title'
                                      type='text'
                                      name='TopicLinktitle'
                                      value={formik.values.TopicLinktitle}
                                      onBlur={formik.handleBlur}
                                      onChange={formik.handleChange}
                                    />
                                    {formik.errors.TopicLinktitle && formik.touched.TopicLinktitle ? (
                                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                        {formik.errors.TopicLinktitle}
                                      </FormHelperText>
                                    ) : null}
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                  <FormControl fullWidth>
                                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>
                                      Topic Link Description
                                    </h4>
                                    <Editor
                                      // TextField
                                      value={formik?.values?.TopicLinkContent}
                                      name='TopicLinkContent'
                                      editorLoaded={editorLoaded}
                                      onChange={v => {
                                        formik?.setFieldValue('TopicLinkContent', v)
                                      }}
                                      view={params == 'ViewTopic' ? true : false}
                                    />
                                    {formik.touched.TopicLinkContent && formik.errors.TopicLinkContent ? (
                                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                        {formik.errors.TopicLinkContent}
                                      </FormHelperText>
                                    ) : null}
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth>
                                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Link Image</h4>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      {preview === false ? (
                                        <ImgStyled src={imgSrc} alt='defaultImage' name='TopicBanner' />
                                      ) : dbImage === true ? (
                                        <ImgStyled src={`${img_url}${imgSrc}`} alt='dbImage' name='TopicBanner' />
                                      ) : (
                                        <ImgStyled src={`${imgSrc}`} alt='PreviewImage' name='TopicBanner' />
                                      )}
                                    </Box>
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth>
                                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Link Icon</h4>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      {preview2 === false ? (
                                        <ImgStyled src={imgSrc2} alt='defaultImage' name='TopicBanner' />
                                      ) : dbImage2 === true ? (
                                        <ImgStyled src={`${img_url}${imgSrc2}`} alt='dbImage' name='TopicBanner' />
                                      ) : (
                                        <ImgStyled src={`${imgSrc2}`} alt='PreviewImage' name='TopicBanner' />
                                      )}
                                    </Box>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={6} sm={12}>
                                  <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Pick Color</h4>
                                  <div className='picker-container'>
                                    <ChromePicker
                                      color={formik.values.colorCode}
                                      // onChange={color => {
                                      //   formik.setFieldValue('colorCode', color.hex)
                                      //   formik.setFieldTouched('colorCode', true)
                                      // }}
                                      disableAlpha
                                      renderers={false}
                                      disabled={true}
                                    />
                                  </div>

                                  {formik.errors.colorCode && formik.touched.colorCode ? (
                                    <FormHelperText sx={{ color: 'error.main' }}>
                                      {formik.errors.colorCode}
                                    </FormHelperText>
                                  ) : null}
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                          {/* <label className='topic-links-heding'>Topic Links Flowchart Listing</label> */}
                          <ul style={{ paddingLeft: '0' }}>
                            {topicLinkChildren?.map((item, index) =>
                              isLoading === true && children ? (
                                <FallbackSpinner />
                              ) : item?.TopicLink === topicLinkName ? (
                                <div key={index}>
                                  <Accordion
                                    className='topic-link-sec'
                                    expanded={expanded === index}
                                    onChange={handleChange(index)}
                                  >
                                    <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                                      <Typography>{item?.TopicLinkFlowchart}</Typography>
                                      {/* <DeleteOutlineIcon
                                      style={{ color: 'red' }}
                                      onClick={() => handleDeleteData(item?.id)}
                                    /> */}
                                    </AccordionSummary>

                                    <AccordionDetails>
                                      <br />
                                      {item.NewsImage ? (
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
                                      ) : null}
                                      <Typography>
                                        <div dangerouslySetInnerHTML={{ __html: item.TopicLinkEditorContent }}></div>
                                      </Typography>
                                      {/* <Typography>
                                        <div>{item.colorCode}</div>
                                      </Typography> */}
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              ) : null
                            )}
                          </ul>
                        </>
                      ) : null}
                      <div
                        style={
                          !openChild && showChild
                            ? { display: 'flex', alignItems: 'end', justifyContent: 'flex-end', marginTop: '-7rem' }
                            : { display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }
                        }
                      >
                        <Button
                          onClick={() => {
                            setIsEdit(false)
                            handleClose()
                            setShowChild(false)
                            setDbData(false)
                          }}
                          size='large'
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <formik>
                    <Card>
                      <CardContent>
                        <Grid container spacing={5}>
                          <Grid item xs={12}>
                            <label className='topic-links-heding'>Topic Links</label>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                              <TextField
                                label='Topic Link Title'
                                type='text'
                                name='TopicLinktitle'
                                value={formik.values.TopicLinktitle}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                disabled={isEdit}
                              />
                              {formik.errors.TopicLinktitle && formik.touched.TopicLinktitle ? (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                  {formik.errors.TopicLinktitle}
                                </FormHelperText>
                              ) : null}
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Link Description</h4>
                              <Editor
                                // TextField
                                value={formik?.values?.TopicLinkContent}
                                name='TopicLinkContent'
                                editorLoaded={editorLoaded}
                                onChange={v => {
                                  formik?.setFieldValue('TopicLinkContent', v)
                                }}
                              />
                              {formik.touched.TopicLinkContent && formik.errors.TopicLinkContent ? (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                  {formik.errors.TopicLinkContent}
                                </FormHelperText>
                              ) : null}
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Link Image</h4>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {preview === false ? (
                                  <ImgStyled src={imgSrc} alt='defaultImage' name='TopicBanner' />
                                ) : dbImage === true ? (
                                  <ImgStyled src={`${img_url}${imgSrc}`} alt='dbImage' name='TopicBanner' />
                                ) : (
                                  <ImgStyled src={`${imgSrc}`} alt='PreviewImage' name='TopicBanner' />
                                )}
                                <div>
                                  <ButtonStyled
                                    component='label'
                                    variant='contained'
                                    htmlFor='account-settings-upload-image'
                                  >
                                    Upload Link Banner
                                    <input
                                      hidden
                                      type='file'
                                      name='relatedTopicImage'
                                      accept='image/png, image/jpeg , image/jpg'
                                      onChange={e => {
                                        setIsEditImage(true)
                                        formik.setFieldValue('relatedTopicImage', e.target.files[0])
                                        handleInputImageChange(e)
                                        setPreview(true)
                                        setdbImage(false)
                                      }}
                                      id='account-settings-upload-image'
                                    />
                                  </ButtonStyled>
                                  {formik.touched.relatedTopicImage || formik.errors.relatedTopicImage ? (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                      {formik.errors.relatedTopicImage}
                                    </FormHelperText>
                                  ) : null}
                                </div>
                              </Box>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Topic Link Icon</h4>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {preview2 === false ? (
                                  <ImgStyled src={imgSrc2} alt='defaultImage' name='TopicBanner' />
                                ) : dbImage2 === true ? (
                                  <ImgStyled src={`${img_url}${imgSrc2}`} alt='dbImage' name='TopicBanner' />
                                ) : (
                                  <ImgStyled src={`${imgSrc2}`} alt='PreviewImage' name='TopicBanner' />
                                )}
                                <div>
                                  <ButtonStyled
                                    component='label'
                                    variant='contained'
                                    htmlFor='account-settings-upload-image2'
                                  >
                                    Upload Link Icon
                                    <input
                                      hidden
                                      type='file'
                                      name='NewsIcon'
                                      accept='image/png, image/jpeg , image/jpg'
                                      onChange={e => {
                                        setIsEditImage2(true)
                                        formik.setFieldValue('NewsIcon', e.target.files[0])
                                        handleInputImageChange(e)
                                        setPreview2(true)
                                        setdbImage2(false)
                                      }}
                                      id='account-settings-upload-image2'
                                    />
                                  </ButtonStyled>
                                  {formik.touched.NewsIcon || formik.errors.NewsIcon ? (
                                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                      {formik.errors.NewsIcon}
                                    </FormHelperText>
                                  ) : null}
                                </div>
                              </Box>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} sm={12}>
                            <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Pick Color</h4>
                            <div className='picker-container'>
                              <ChromePicker
                                color={formik.values.colorCode}
                                onChange={color => {
                                  formik.setFieldValue('colorCode', color.hex)
                                  formik.setFieldTouched('colorCode', true)
                                }}
                                disableAlpha
                                renderers={false}
                              />
                            </div>

                            {formik.errors.colorCode && formik.touched.colorCode ? (
                              <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.colorCode}</FormHelperText>
                            ) : null}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    <br />
                    <br />
                    {/* <Divider /> */}
                    <Grid item xs={12} sm={12} md={6}>
                      <Button
                        size='large'
                        // onClick={() => {
                        //   setOpenChild(true)
                        // }}
                        onClick={() => {
                          setOpenChild(true)
                        }}
                        onDoubleClick={() => {
                          setOpenChild(false)
                          formikChild.setTouched(false)
                        }}
                        variant='contained'
                        style={{ marginRight: '10px' }}
                      >
                        Add Flowchart
                      </Button>
                    </Grid>
                    <br />
                    {openChild ? (
                      <Card>
                        <CardContent>
                          <Grid container spacing={5}>
                            <Grid item xs={12}>
                              <label className='topic-links-heding'>Topic Links Flowchart</label>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <FormControl fullWidth>
                                <TextField
                                  value={formikChild.values.TopicLinkFlowchart}
                                  onBlur={formikChild.handleBlur}
                                  onChange={formikChild.handleChange}
                                  label='Topic Link Flowchart'
                                  type='text'
                                  name='TopicLinkFlowchart'
                                />
                                {formikChild.errors.TopicLinkFlowchart && formikChild.touched.TopicLinkFlowchart ? (
                                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                    {formikChild.errors.TopicLinkFlowchart}
                                  </FormHelperText>
                                ) : null}
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={12}>
                              <FormControl fullWidth>
                                <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Flowchart Description</h4>
                                <Editor
                                  value={formikChild.values?.TopicLinkEditorContent}
                                  name='TopicLinkEditorContent'
                                  editorLoaded={editorLoaded}
                                  onChange={v => {
                                    // handleDescriptionChange(v)
                                    formikChild?.setFieldValue('TopicLinkEditorContent', v)
                                  }}
                                />
                                {formikChild.errors.TopicLinkEditorContent &&
                                formikChild.touched.TopicLinkEditorContent ? (
                                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                    {formikChild.errors.TopicLinkEditorContent}
                                  </FormHelperText>
                                ) : null}
                              </FormControl>
                            </Grid>
                            <Grid item xs={6} sm={12}>
                              <FormControl fullWidth style={{ marginBottom: '30px' }}>
                                <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Flowchart Image</h4>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  {preview === false ? (
                                    <ImgStyled src={imgSrc1} alt='defaultImage' name='NewsImage' />
                                  ) : (
                                    <ImgStyled src={`${imgSrc1}`} alt='PreviewImage' name='NewsImage' />
                                  )}
                                  <div>
                                    <ButtonStyled
                                      component='label'
                                      variant='contained'
                                      htmlFor='account-settings-upload-image1'
                                    >
                                      Upload Banner
                                      <input
                                        hidden
                                        type='file'
                                        name='NewsImage'
                                        accept='image/png, image/jpeg , image/jpg'
                                        onChange={e => {
                                          formikChild.setFieldValue('NewsImage', e.target.files[0])
                                          handleInputImageChange(e)
                                        }}
                                        id='account-settings-upload-image1'
                                      />
                                    </ButtonStyled>
                                    {/* {formikChild.touched.NewsImage && formikChild.errors.NewsImage ? (
                                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                        {formikChild.errors.NewsImage}
                                      </FormHelperText>
                                    ) : null} */}
                                  </div>
                                </Box>
                              </FormControl>
                              {/* <TextField
                                name='colorCode'
                                label='Color Code'
                                type='text'
                                style={{ display: 'none' }}
                                value={formikChild.values.colorCode}
                                onBlur={formikChild.handleBlur}
                                // onChange={handleChange}
                              />
                              {formikChild.errors.colorCode && formikChild.touched.colorCode ? (
                                <FormHelperText sx={{ color: 'error.main' }}>
                                  {formikChild.errors.colorCode}
                                </FormHelperText>
                              ) : null}

                              <div className='picker-container'>
                                <ChromePicker
                                  color={colors !== null && colors?.hex}
                                  onChange={e => colorPicker(e)}
                                  disableAlpha
                                  renderers={false}
                                />
                              </div> */}
                            </Grid>
                            <br />

                            {/* <Grid item xs={6} sm={12}>
                              <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Flowchart Color</h4>
                              <div className='picker-container'>
                                <ChromePicker
                                  color={formikChild.values.colorCode}
                                  onChange={color => {
                                    formikChild.setFieldValue('colorCode', color.hex)
                                    formikChild.setFieldTouched('colorCode', true)
                                  }}
                                  disableAlpha
                                  renderers={false}
                                />
                              </div>

                              {formikChild.errors.colorCode && formikChild.touched.colorCode ? (
                                <FormHelperText sx={{ color: 'error.main' }}>
                                  {formikChild.errors.colorCode}
                                </FormHelperText>
                              ) : null}
                            </Grid> */}

                            {/* <Grid item xs={6} sm={3}></Grid> */}
                            <Grid item xs={6} sm={3}>
                              <FormControl fullWidth>
                                <Button
                                  variant='contained'
                                  onClick={() => {
                                    setLoader(true)
                                    formikChild.handleSubmit()
                                    if (formikChild.values.TopicLinkEditorContent !== '') {
                                      if (Object.values(formikChild.errors).length === 0) {
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
                                                {item.NewsImage ? (
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
                                                ) : null}
                                                <Typography>
                                                  <div
                                                    dangerouslySetInnerHTML={{ __html: item.TopicLinkEditorContent }}
                                                  ></div>
                                                </Typography>
                                                {/* <Typography>
                                                  <div>{item.colorCode}</div>
                                                </Typography> */}
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
                    ) : (
                      // <Card>
                      //   <CardContent>
                      <Grid item xs={12} sm={12}>
                        <div>
                          {showChild === false ? (
                            <>
                              {/* <label className='topic-links-heding'>Topic Links Flowchart Listings</label> */}
                              <ul style={{ paddingLeft: '0' }}>
                                {topicLinkChildren?.map((item, index) =>
                                  isLoading === true && children ? (
                                    <FallbackSpinner />
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

                                          {item.NewsImage ? (
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
                                          ) : null}
                                          <Typography>
                                            <div
                                              dangerouslySetInnerHTML={{ __html: item.TopicLinkEditorContent }}
                                            ></div>
                                          </Typography>
                                          {/* <Typography>
                                            <div>{item.colorCode}</div>
                                          </Typography> */}
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
                      //   </CardContent>
                      // </Card>
                    )}
                    <br />
                    <Grid item sm={12}>
                      <div
                        style={
                          !openChild && showChild
                            ? { display: 'flex', alignItems: 'end', justifyContent: 'flex-end', marginTop: '-7rem' }
                            : { display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }
                        }
                      >
                        <Button
                          size='large'
                          onClick={() => {
                            formik.handleSubmit()
                            formikChild.resetForm()
                            // handleClose()
                          }}
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEdit(false)
                            handleClose()
                            setShowChild(false)
                          }}
                          size='large'
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Grid>
                  </formik>
                )}
              </Box>
            </Modal>
          </div>
        </CardContent>
      )}
      <div>
        {topicById?.TopicLink.map((item, index) => {
          ;<div key={index}>
            <h1>{item?.SubjectName}</h1>
            <img src={`${img_url}${item?.BannerImage}`} />
          </div>
        })}
      </div>
    </Card>
  )
}

export default TopicLinks
