// 1001 === 03.03.2023 === Add Editor and validation === Dhruv ===

/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Box,
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
import Icon from 'src/@core/components/icon'

import { ErrorMessage, Field, FieldArray, FormikProvider, useFormik } from 'formik'
import { QuestionBankSchema } from 'src/schemas'
import { getAllSubject, getAllSubjectdropdown } from 'src/store/slices/LearningSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Editor from '../../Editor'
import { CreateQuestionBank, GetQuestionById, UpdateQuestionBank } from 'src/store/slices/QuizSlice'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'

const AddQuestionBank = () => {
  const dispatch = useDispatch()

  const [editorLoaded, setEditorLoaded] = useState(false)
  const theme = useTheme()
  const router = useRouter()

  const id = localStorage.getItem('id')
  const params = router.query.AddQuestionBank

  // ** selectors to retrieve data from redux
  const AllSubject = useSelector(state => state.LearningSlice.getAllSubjectdropdown)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

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

  // 1001 START

  const initialValues = {
    SubjectId: '',
    ScorePoints: 2,
    NegativePoints: 0.66,
    AnswerOption: [
      {
        option: '',
        isCorrect: false
      }
    ],
    Question: '',
    Status: true
  }

  //1001 END

  // ** useEffect to handle form data during edit
  useEffect(() => {
    if (id) {
      dispatch(GetQuestionById(id)).then(res => {
        if (res.payload.data) {
          let updateData = res.payload.data
          formik.setFieldValue('SubjectId', updateData.SubjectId)
          formik.setFieldValue('ScorePoints', updateData.ScorePoints)
          formik.setFieldValue('NegativePoints', updateData.NegativePoints)
          formik.setFieldValue('AnswerOption', updateData.AnswerOption)
          formik.setFieldValue('Question', updateData.Question)
          formik.setFieldValue('Status', updateData.Status)
        }
      })
    }
  }, [dispatch, id])

  // ** function to handle form submit
  const handleSubmit = async (values, actions) => {
    // const data = await JSONToFormData(values)
    let data = values.AnswerOption
    for (let i = 0; i < data.length; i++) {
      data[i].index = i
    }

    const action = id
      ? UpdateQuestionBank(Object.assign(values, { _id: id }))
      : CreateQuestionBank(Object.assign(values))

    dispatch(action).then(res => {
      if (res.payload.status === 200) {
        if (id) {
          Toast({ response: res, update: true }) // toast the success message
        } else {
          Toast({ response: res }) // toast the success message
        }
        router.push('/QuizManager/QuestionBank')
      } else {
        Toast({ response: res, error: true }) // toast the error message
      }
    })
  }

  // ** formik state to handle form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: QuestionBankSchema,
    onSubmit: values => {
      handleSubmit(values)
    }
  })

  useEffect(() => {
    dispatch(getAllSubjectdropdown())
  }, [dispatch])

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <FormikProvider value={formik}>
          <div>
            <Card>
              <CardHeader
                title={
                  params == 'EditQuestionBank'
                    ? 'Edit Question Bank'
                    : params == 'ViewQuestionBank '
                    ? 'View Question Bank'
                    : 'Add Question Bank'
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
                          readOnly={params == 'ViewQuestionBank' ? true : false}
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

                    <Grid item xs={12} sm={6}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ margin: '10px' }}>Status :-</h4>
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
                            params == 'ViewQuestionBank' ? null : formik.setFieldValue('Status', e.target.value)
                          }}
                        >
                          <FormControlLabel
                            value={'true'}
                            checked={formik.values.Status === true}
                            control={<Radio color='primary' />}
                            label='Active'
                            labelPlacement='end'
                          />
                          <FormControlLabel
                            value={'false'}
                            checked={formik.values.Status === false}
                            control={<Radio color='primary' />}
                            label='InActive'
                            labelPlacement='end'
                          />
                        </RadioGroup>
                      </div>
                      {formik.errors.Status && formik.touched.Status ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Status}
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <TextField
                          // placeholder='Dhruv'
                          label='Score Point'
                          type='number'
                          name='ScorePoints'
                          defaultValue='2'
                          aria-describedby='validation-basic-first-name'
                          value={formik.values.ScorePoints}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          InputProps={{ readOnly: params == 'ViewQuestionBank' ? true : false }}
                        />
                        {formik.errors.ScorePoints && formik.touched.ScorePoints ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.ScorePoints}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <TextField
                          // placeholder='Dhruv'
                          label='Negative Point'
                          name='NegativePoints'
                          type='number'
                          defaultValue='0.66'
                          aria-describedby='validation-basic-first-name'
                          value={formik.values.NegativePoints}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          InputProps={{ readOnly: params == 'ViewQuestionBank' ? true : false }}
                        />
                        {formik.errors.NegativePoints && formik.touched.NegativePoints ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.NegativePoints}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}></Grid>

                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Question</h4>
                        <Editor
                          value={formik?.values?.Question}
                          name='Question'
                          editorLoaded={editorLoaded}
                          onChange={e => {
                            formik?.setFieldValue('Question', e)
                          }}
                          onBlur={() => {
                            formik?.setFieldTouched('Question', true)
                          }}
                          view={params == 'ViewQuestionBank' ? true : false}
                        />
                        {formik.errors.Question && formik.touched.Question ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Question}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <FieldArray name='AnswerOption'>
                          {({ remove, push, err }) => (
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div className='andOptionHeader'>
                                  <h4
                                    // className='topic-links-heding'
                                    style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}
                                  >
                                    Answer Option List
                                  </h4>
                                  <p
                                    style={{
                                      color: 'red',
                                      fontSize: '12px',
                                      marginTop: '-0.1rem',
                                      marginLeft: '0.5rem'
                                    }}
                                  >
                                    (Note: Tick the correct answer options)
                                  </p>
                                </div>
                                {/* <Button
                                  variant='contained'
                                  onClick={() => push({ isCorrect: false })}
                                  style={{ marginLeft: '70px', marginBottom: '0.5rem', marginTop: '-0.4rem' }}
                                > */}
                                {params == 'ViewQuestionBank' ? null : (
                                  <Icon
                                    style={{
                                      marginBottom: '0.5rem',
                                      marginTop: '-0.4rem',
                                      color: '#666cff',
                                      marginBottom: '1rem'
                                    }}
                                    icon='material-symbols:add-circle'
                                    onClick={() => push({ isCorrect: false })}
                                  />
                                )}

                                {/* </Button> */}
                              </div>

                              {formik?.values?.AnswerOption?.length > 0 &&
                                formik?.values?.AnswerOption?.map((friend, index) => (
                                  <>
                                    <div className='row' key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                      <div className='col'>
                                        <label style={{ display: 'flex', alignItems: 'center' }}>
                                          <Field
                                            as={Checkbox}
                                            type='checkbox'
                                            name={`AnswerOption.${index}.isCorrect`}
                                            disabled={params == 'ViewQuestionBank'}
                                          />
                                          <Field
                                            name={`AnswerOption.${index}.option`}
                                            placeholder={`Answer Option ${index + 1}`}
                                            type='text'
                                            as={TextField}
                                            className='ansOptionField'
                                            disabled={params == 'ViewQuestionBank'}
                                          />
                                        </label>
                                        {/* {console.log(formik.errors)} */}
                                        {formik.errors?.AnswerOption?.length > 0 &&
                                        formik.errors?.AnswerOption[index]?.option ? (
                                          <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            style={{ marginLeft: '55px' }}
                                            className='validation-error'
                                          >
                                            {formik.errors?.AnswerOption[index]?.option}
                                          </FormHelperText>
                                        ) : null}
                                      </div>
                                      <div className='col'>
                                        {/* <Button
                                          variant='contained'
                                          onClick={() => remove(index)}
                                          style={{ marginLeft: '15px' }}
                                        > */}
                                        {params == 'ViewQuestionBank' ? null : (
                                          <Icon
                                            icon='ic:baseline-remove-circle'
                                            style={{ color: '#666cff', marginLeft: '20px' }}
                                            onClick={() => remove(index)}
                                            disabled={params == 'ViewQuestionBank'}
                                          />
                                        )}

                                        {/* </Button> */}
                                      </div>
                                    </div>
                                    <br />
                                  </>
                                ))}
                            </div>
                          )}
                        </FieldArray>
                        {/*{formik.errors.AnswerOption && formik.touched.AnswerOption ? (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                      {formik.errors.AnswerOption}
                    </FormHelperText>
                  ) : null}*/}
                      </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        {params == 'ViewQuestionBank' ? null : !id ? (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Save
                          </Button>
                        ) : (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Update
                          </Button>
                        )}
                        <Link prefetch={false} href='/QuizManager/QuestionBank' style={{ textDecoration: 'none' }}>
                          <Button size='large' onClick={() => localStorage.removeItem('id')} variant='contained'>
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
        </FormikProvider>
      )}
    </>
  )
}

export default AddQuestionBank
