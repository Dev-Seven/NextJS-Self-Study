/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
// 1001 === 02.03.2023 === Create Video uplode file === Dhruv ===

// 1001 START
// ** React Imports
import { Fragment, useEffect, useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardHeader, FormControl, Grid, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateFormData } from 'src/store/slices/TopicSlice'
import { Field, FieldArray, Form, Formik, useFormik, useFormikContext } from 'formik'
import { useRouter } from 'next/router'

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

const Videos = topicById => {
  // ** State
  const [files, setFiles] = useState([])
  const [finalvideo, setFinalVideo] = useState([])
  const [inputFields, setInputFields] = useState([
    {
      Videos: ''
    }
  ])
  const dispatch = useDispatch()
  const router = useRouter()

  // const { view } = router.query

  const id = localStorage.getItem('id')
  const _id = localStorage.getItem('_id')
  const params = router.query.AddTopic

  function fileToUrl(file) {
    const url = URL.createObjectURL(file)
    return url
  }

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    // maxSize: 2000000,
    accept: {
      'video/*': ['.video']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('video')) {
      return (
        <video className='topicImages' width={40} height={40} alt={file.name} src={URL.createObjectURL(file)}></video>
      )
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem key={file.name} className='topicImageList'>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='mdi:close' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  function addDataToArray(data, array, setArray) {
    // create a new array with the existing data and the new data
    const newArray = [...array, data]

    // set the state of the array to the new array
    setArray(newArray)
  }

  const handleSubmit = () => {
    // for (let i = 0; i < files.length; i++) {
    //   const videoResponse = fileToUrl(files[i])
    //   addDataToArray(videoResponse, finalvideo, setFinalVideo)
    // }
    dispatch(updateFormData({ step: 'step6', data: videos }))
  }

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        Videos: ''
      }
    ])
  }

  const removeInputFields = index => {
    const rows = [...inputFields]

    const newFruits = rows.filter((_, i) => i !== index)
    setInputFields(newFruits)

    // rows.splice(index, 1)
    // setInputFields(rows)
  }

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target
    const list = [...inputFields]
    list[index][name] = value

    setInputFields(list)
  }

  const initialValues = {
    Videos: inputFields
  }
  const { values, submitForm, setFieldValue, handleBlur, errors, touched } = useFormikContext()

  // useMemo(() => {
  //   if (topicById) {
  //     setFieldValue('Videos', topicById?.Videos)
  //   }
  // }, [topicById])
  const formik = useFormik({
    enableReinitialize: true,

    // initialValues: initialValues,
    onSubmit: values => {}
  })

  return (
    <Card>
      <CardHeader title='Upload Multiple Video' />
      <CardContent>
        {/* <Formik
          initialValues={{ videos: ['jared', 'ian', 'brent'] }}
          onSubmit={values =>
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
            }, 500)
          }
          render={({ values }) => (
            <Form> */}
        <FieldArray
          name='Videos'
          render={arrayHelpers => (
            <div>
              {params == 'ViewTopic' ? null : (
                <Button variant='contained' type='button' onClick={() => arrayHelpers.push('')}>
                  Add New Url
                </Button>
              )}
              {values?.Videos?.length > 0 &&
                values?.Videos?.map((friend, index) => (
                  <div className='form-container' key={index}>
                    <br />
                    <Field
                      as={TextField}
                      disabled={params == 'ViewTopic'}
                      className='form-container'
                      name={`Videos.${index}`}
                    />
                    {params == 'ViewTopic' ? null : (
                      <Icon
                        icon='ic:baseline-remove-circle'
                        style={{ color: '#666cff', marginLeft: '20px', marginTop: '15px' }}
                        onClick={() => arrayHelpers.remove(index)}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        />
      </CardContent>
    </Card>
  )
}

export default Videos

// 1001 END
