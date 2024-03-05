/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { TopicTagSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { CreateTopicTag, GetTopicTagById, UpdateTopicTag } from 'src/store/slices/LearningSlice'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
// import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'

// ** dynamic imports
// const Toast = dynamic(() => import('src/pages/Common/Toast'))
const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
// const Toast = dynamic(() => import('src/pages/Common/Toast'))
// const TopicTagSchema = dynamic(() => import('src/schemas').then(module => module.TopicTagSchema), { ssr: false })

// 1002 START

const AddTopicTag = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  // const { id, view } = router.query
  const id = localStorage.getItem('id')
  // const params = router.query.AddTopicTag
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]

  const initialValues = {
    _id: id,
    TopicTagName: ''
  }

  useEffect(() => {
    dispatch(GetTopicTagById(id)).then(res => {
      if (id) {
        let updateData = res.payload.data
        formik.setFieldValue('TopicTagName', updateData.TopicTagName)
      }
    })
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: TopicTagSchema,
    onSubmit: values => {
      const action = id ? UpdateTopicTag(values) : CreateTopicTag(values)

      dispatch(action).then(res => {
        // console.log('🚀 ~ file: [AddTopicTag].js:76 ~ dispatch ~ res:', res)
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success update message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Learning/topicTag/')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  return (
    <>
      <div>
        {isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <Card>
            <CardHeader
              title={
                params == 'EditTopicTag'
                  ? 'Edit Topic Tag'
                  : params == 'ViewTopicTag'
                  ? 'View Topic Tag'
                  : 'Add Topic Tag'
              }
            />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='TopicTagName'
                        label='Topic Tag'
                        placeholder='Topic Tag'
                        type='text'
                        value={formik.values.TopicTagName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        // disabled={params == 'ViewTopicTag'}
                        InputProps={{ readOnly: params == 'ViewTopicTag' ? true : false }}
                      />
                      {formik.errors.TopicTagName && formik.touched.TopicTagName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.TopicTagName}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      <Link prefetch={false} href='/Learning/topicTag/' style={{ textDecoration: 'none' }}>
                        <Button size='large' variant='contained'>
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

export default AddTopicTag
