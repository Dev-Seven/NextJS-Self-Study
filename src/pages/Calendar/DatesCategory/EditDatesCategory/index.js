/* eslint-disable padding-line-between-statements */
/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// 1001                03-04-2023                  IMPLEMENTATION OF COLOR PICKER              ADITYA

// ==============================================================================================================//

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import { dateCategorySchema, TopicTagSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { CreateTopicTag, GetTopicTagById, UpdateTopicTag } from 'src/store/slices/LearningSlice'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import { ChromePicker } from 'react-color'
import { datesCategory, editDateCategory, importantDatesById } from 'src/store/slices/CalendarSlice'
import Toast from 'src/pages/Common/Toast'

// 1001 START

const AddDatesCategory = () => {
  const [colors, setColors] = useState(null)
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  // const { id, view } = router.query
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // const params = router.query.AddDatesCategory
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]
  const id = localStorage.getItem('id')

  // ** handle color picker change
  const colorPicker = e => {
    formik.setFieldValue('colorCode', e.hex)
    const newColor = {
      hex: e?.hex,
      rgb: '(' + e.rgb.r + ',' + e.rgb.g + ',' + e.rgb.b + ',' + e.rgb.a + ')'
    }
    setColors(newColor)
  }

  // ** formik initialValues
  const initialValues = {
    importantDateCategoryName: '',
    colorCode: ''
  }

  useEffect(() => {
    dispatch(importantDatesById(id)).then(res => {
      if (id) {
        let updateData = res?.payload?.data
        formik.setFieldValue('importantDateCategoryName', updateData?.importantDateCategoryName)
        formik.setFieldValue('colorCode', updateData?.colorCode)
      }
    })
  }, [dispatch, id])

  // ** function to handle form Submit
  const handleSubmit = values => {
    const action = id ? editDateCategory(Object.assign(values, { _id: id })) : datesCategory(values)

    dispatch(action).then(res => {
      if (res.payload.status === 200) {
        if (id) {
          Toast({ response: res, update: true }) // toast the success message
        } else {
          Toast({ response: res }) // toast the success message
        }
        router.push('/Calendar/datesCategory')
      } else {
        Toast({ response: res, error: true }) // toast the error message
      }
    })
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: dateCategorySchema,
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  return (
    <>
      <div>
        {params == 'ViewDatesCategory' ? (
          isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <Card>
              <CardHeader title='View Date Category' />
              <Divider />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          InputProps={{ readOnly: true }}
                          name='importantDateCategoryName'
                          label='Date Category'
                          type='text'
                          placeholder='Dhruv'
                          value={formik.values.importantDateCategoryName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        <br />
                        <TextField
                          InputProps={{ readOnly: true }}
                          name='colorCode'
                          label='Dates Category'
                          type='text'
                          placeholder='Dhruv'
                          value={formik.values.colorCode}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                      {formik.errors.TopicTagName && formik.touched.TopicTagName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.TopicTagName}</FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link prefetch={false} href='/Calendar/datesCategory' style={{ textDecoration: 'none' }}>
                          <Button size='large' variant='contained' style={{ marginRight: '10px' }}>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          )
        ) : isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <Card>
            <CardHeader title={id ? 'Edit Date Category' : 'Add Date Category'} />
            <Divider />
            <CardContent>
              <form>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={8}>
                    <FormControl fullWidth>
                      <TextField
                        name='importantDateCategoryName'
                        label='Date Category'
                        placeholder='Date Category'
                        type='text'
                        value={formik.values.importantDateCategoryName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.importantDateCategoryName && formik.touched.importantDateCategoryName ? (
                        <FormHelperText sx={{ color: 'error.main' }}>
                          {formik.errors.importantDateCategoryName}
                        </FormHelperText>
                      ) : null}
                      <br />
                      <TextField
                        name='colorCode'
                        label='Color Code'
                        type='text'
                        value={formik.values.colorCode}
                        onBlur={formik.handleBlur}
                        // onChange={handleChange}
                      />
                      {formik.errors.colorCode && formik.touched.colorCode ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.colorCode}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div className='picker-container'>
                      <ChromePicker
                        color={colors !== null && colors?.hex}
                        onChange={e => colorPicker(e)}
                        disableAlpha
                        renderers={false}
                      />
                    </div>
                  </Grid>
                  <br />
                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      {!id ? (
                        <Button
                          size='large'
                          onClick={formik.handleSubmit}
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          size='large'
                          onClick={formik.handleSubmit}
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Update
                        </Button>
                      )}
                      <Link prefetch={false} href='/Calendar/datesCategory' style={{ textDecoration: 'none' }}>
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

export default AddDatesCategory

//1001 END
