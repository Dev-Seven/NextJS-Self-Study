/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
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
  TextField
} from '@mui/material'
import { addQuizCategorySchema } from 'src/schemas'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getAllSubject, getAllSubjectdropdown } from 'src/store/slices/LearningSlice'
import { useTheme } from '@mui/material/styles'
import { CreateQuizCategory, GetQuizCategoryById, UpdateQuizCategory } from 'src/store/slices/QuizSlice'
import { toast } from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'

const AddQuizCategory = () => {
  // ** State
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const AllSubject = useSelector(state => state.LearningSlice.getAllSubjectdropdown)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  const id = localStorage.getItem('id')
  // const params = router.query.AddQuizCategory
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]

  // ** menu props to handle select height
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

  useEffect(() => {
    dispatch(getAllSubjectdropdown())
  }, [dispatch])

  const initialValues = {
    QuizCategoryName: '',
    SubjectId: '',
    Status: true
  }

  // ** useEffect to handle form data during edit
  useEffect(() => {
    dispatch(GetQuizCategoryById(id)).then(res => {
      if (id) {
        let updateData = res.payload.data
        formik.setFieldValue('QuizCategoryName', updateData.QuizCategoryName)
        formik.setFieldValue('SubjectId', updateData.SubjectId)
        formik.setFieldValue('Status', updateData.Status)
      }
    })
  }, [dispatch, id])

  // ** formik state to handle form submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: addQuizCategorySchema,
    onSubmit: values => {
      const action = id ? UpdateQuizCategory(Object.assign(values, { _id: id })) : CreateQuizCategory(values)

      dispatch(action).then(res => {
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/QuizManager/quizCategory')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader
              title={
                params == 'EditQuizCategory'
                  ? 'Edit Quiz Category'
                  : params == 'ViewQuizCategory'
                  ? 'View Quiz Category'
                  : 'Add Quiz Category'
              }
            />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                        Subject
                      </InputLabel>
                      <Select
                        label='Subject'
                        name='SubjectId'
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                        value={formik.values.SubjectId}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        MenuProps={MenuProps}
                        disabled={params == 'ViewQuizCategory'}
                      >
                        {AllSubject.map(item => (
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

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='QuizCategoryName'
                        label='Quiz Category'
                        type='text'
                        placeholder='Quiz Category'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.QuizCategoryName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: params == 'ViewQuizCategory' ? true : false }}
                      />
                      {formik.errors.QuizCategoryName && formik.touched.QuizCategoryName ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.QuizCategoryName}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                      <RadioGroup
                        aria-label='Status'
                        name='Status'
                        value={
                          formik.values.Status == 'true'
                            ? (formik.values.Status = true)
                            : formik.values.Status == 'false'
                            ? (formik.values.Status = false)
                            : null
                        }
                        row
                        onChange={e => {
                          formik.setFieldValue('Status', e.target.value)
                        }}
                      >
                        <FormControlLabel
                          value={'true'}
                          checked={formik.values.Status === true}
                          control={<Radio color='primary' />}
                          label='Active'
                          labelPlacement='end'
                          disabled={params == 'ViewQuizCategory'}
                        />
                        <FormControlLabel
                          value={'false'}
                          checked={formik.values.Status === false}
                          control={<Radio color='primary' />}
                          label='InActive'
                          labelPlacement='end'
                          disabled={params == 'ViewQuizCategory'}
                        />
                      </RadioGroup>
                    </div>
                    {formik.errors.Status && formik.touched.Status ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.Status}
                      </FormHelperText>
                    ) : null}
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      {params == 'ViewQuizCategory' ? null : params == 'AddQuizCategory' ? (
                        <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                          Save
                        </Button>
                      ) : (
                        <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                          Update
                        </Button>
                      )}
                      <Link prefetch={false} href='/QuizManager/quizCategory' style={{ textDecoration: 'none' }}>
                        <Button size='large' type='submit' variant='contained'>
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default AddQuizCategory
