/* eslint-disable lines-around-comment */
/* eslint-disable newline-before-return */
// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardHeader } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateFormData } from 'src/store/slices/TopicSlice'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import { img_url } from 'src/common/Service'
import { toast } from 'react-hot-toast'
import { setImagesTopics } from 'src/store/slices/LearningSlice'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const Images = () => {
  // ** State
  const [files, setFiles] = useState([])
  const [finalImage, setFinalImage] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  // const { _id, view } = router.query

  const id = localStorage.getItem('id')
  const _id = localStorage.getItem('_id')
  const params = router.query.AddTopic

  // function fileToUrl(file) {
  //   const url = URL.createObjectURL(file)
  //   return url
  // }

  const { values, submitForm, setFieldValue, handleBlur, handleChange, errors, touched } = useFormikContext()

  useEffect(() => {
    if (values.TopicImages) {
      dispatch(setImagesTopics(values.TopicImages))
    }
  }, [dispatch, values.TopicImages])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 10,
    maxSize: 2000000,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
      setFieldValue('TopicImages', values?.TopicImages.concat(acceptedFiles))
    },
    onDropRejected: () => {
      toast.error('You can upload only 10 files & Maximum size of 2 MB.', {
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

  // render file preview
  const renderFilePreview = file => {
    if (!file?.type?.startsWith('image')) {
      return (
        <img className='topicImages' name='TopicImages' width={40} height={40} alt={file} src={`${img_url}${file}`} />
      )
    }
    if (file?.type?.startsWith('image')) {
      return (
        <img
          className='topicImages'
          name='TopicImages'
          width={40}
          height={40}
          alt={file.name}
          src={URL.createObjectURL(file)}
        />
      )
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  // handle file preview if it receives from database

  // const handleFileFromDatabase = file => {
  //   fetch(file)
  //     .then(res => {
  //       res.blob()
  //     })
  //     .then(blob => {
  //       let files = new File([blob], `${file}`)
  //       return (
  //         <div>
  //           <Typography className='file-name' name='TopicImages'>
  //             {files.name}
  //           </Typography>
  //           <Typography className='file-size' name='TopicImages' variant='body2'>
  //             {Math.round(files.size / 100) / 10 > 1000
  //               ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
  //               : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
  //           </Typography>
  //         </div>
  //       )
  //     })
  // }

  const handleRemoveFile = fileToRemove => {
    const updatedImages = values.TopicImages.filter(file => file !== fileToRemove)
    setFieldValue('TopicImages', updatedImages)
  }

  // function addDataToArray(data, array, setArray) {
  //   // create a new array with the existing data and the new data
  //   const newArray = [...array, data]

  //   // set the state of the array to the new array
  //   setArray(newArray)
  // }

  // const handleSubmit = () => {
  //
  //   const galleryData = new FormData()
  //   for (let i = 0; i < files.length; i++) {
  //     galleryData.append('images[]', files[i])
  //   }

  //   // for (let i = 0; i < files.length; i++) {
  //   //   const imageResponse = fileToUrl(files[i])
  //   //   addDataToArray(imageResponse, finalImage, setFinalImage)
  //   // }
  //   //
  //   dispatch(updateFormData({ step: 'step5', data: galleryData }))

  // }

  // const fileList = values?.TopicImages?.map(file => (
  //   <ListItem key={file.name} name='TopicImages' className='topicImageList'>
  //
  //     <div className='file-details'>
  //       <div className='file-preview' name='TopicImages'>
  //         {renderFilePreview(file)}
  //       </div>
  //       <div>
  //         <Typography className='file-name' name='TopicImages'>
  //           {file.name}
  //         </Typography>
  //         <Typography className='file-size' name='TopicImages' variant='body2'>
  //           {Math.round(file.size / 100) / 10 > 1000
  //             ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
  //             : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
  //         </Typography>
  //       </div>
  //     </div>
  //     <IconButton onClick={() => handleRemoveFile(file)}>
  //       <Icon icon='mdi:close' fontSize={20} />
  //     </IconButton>
  //   </ListItem>
  // ))

  const fileList = values.TopicImages.map((file, index) => (
    <ListItem key={index} name='TopicImages' className='topicImageList'>
      <div className='file-details'>
        <div className='file-preview' name='TopicImages'>
          {renderFilePreview(file)}
        </div>
        <div>
          <Typography className='file-name' name='TopicImages'>
            {typeof file === 'string' ? file : file.name}
          </Typography>
          {/* Add the file size logic here */}
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        {params === 'ViewTopic' ? null : <Icon icon='mdi:close' fontSize={20} />}
      </IconButton>
    </ListItem>
  ))

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
    setFieldValue('TopicImages', [])
  }

  // function to check if the files state is empty

  return (
    <Card>
      <CardHeader title='Upload Multiple Image' />
      <CardContent>
        <Fragment>
          {params == 'ViewTopic' ? null : (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} disabled={params == 'ViewTopic'} />
              <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                <Img width={300} alt='Upload img' src='/admin/images/misc/upload.png' />
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                  <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                  <Typography color='textSecondary'>
                    Drop files here or click{' '}
                    <Link prefetch={false} href='/' onClick={handleLinkClick}>
                      browse
                    </Link>{' '}
                    thorough your machine
                  </Typography>
                  <Typography color='textSecondary'>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
                  <Typography color='textSecondary'>Max 10 files and max size of 2 MB</Typography>
                </Box>
              </Box>
            </div>
          )}
          {values?.TopicImages?.length ? (
            <Fragment>
              <List name='TopicImages'>{fileList}</List>
              {params == 'ViewTopic' ? null : (
                <div className='topicimagebuttons'>
                  <Button
                    color='error'
                    variant='outlined'
                    style={{ marginRight: '0.8rem' }}
                    onClick={handleRemoveAllFiles}
                    disabled={params == 'ViewTopic'}
                  >
                    Remove All
                  </Button>
                  {/* <Button variant='contained' onClick={handleSubmit}>
                  Upload Files
                </Button> */}
                </div>
              )}
            </Fragment>
          ) : null}
        </Fragment>
      </CardContent>
    </Card>
  )
}

export default Images
