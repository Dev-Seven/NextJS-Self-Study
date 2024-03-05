/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

import { useRouter } from 'next/router'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  tooltipClasses
} from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import FallbackSpinner from 'src/@core/components/spinner'
import {
  CreateQuestionBank,
  DeleteQuestionBank,
  GetQuestionById,
  questionBySubject,
  UpdateQuestionBank
} from 'src/store/slices/QuizSlice'
import { Field, FieldArray, FormikProvider, useFormik } from 'formik'
import Editor from '../../Editor'
import Toast from 'src/pages/Common/Toast'
import { QuestionBankSchema } from 'src/schemas'

const userStatusObj = {
  true: 'success',
  pending: 'warning',
  false: 'secondary'
}

const RowOptions = ({ id, handleOpen2, formik }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(DeleteQuestionBank(id)).then(res => {
      if (res.payload.status === 200) {
        toast.success(res?.payload?.message, {
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
      } else {
        toast.error(res?.payload?.message, {
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

    handleRowOptionsClose()
    const questionIdToDelete = id // Assuming `id` contains the actual ID of the question to delete

    let tempArray = JSON.parse(localStorage.getItem('Question')) ?? []

    // Find the index of the ID in the array
    const index = tempArray.indexOf(questionIdToDelete)

    // If the ID is found in the array, remove it
    if (index > -1) {
      tempArray.splice(index, 1)
      localStorage.setItem('Question', JSON.stringify(tempArray))
    }

    var Questionid = JSON.parse(localStorage.getItem('Question'))
    dispatch(questionBySubject({ Question: Questionid }))
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 6,
    border: '2px solid #3260CC',
    borderRadius: 1
  }

  const handleEdit = id => {
    handleOpen2()
    dispatch(GetQuestionById(id)).then(res => {
      if (res?.payload?.data) {
        let updateData = res?.payload?.data
        formik.setFieldValue('SubjectId', updateData.SubjectId)
        formik.setFieldValue('ScorePoints', updateData.ScorePoints)
        formik.setFieldValue('NegativePoints', updateData.NegativePoints)
        formik.setFieldValue('AnswerOption', updateData.AnswerOption)
        formik.setFieldValue('Question', updateData.Question)
        formik.setFieldValue('Explanation', updateData.Explanation)
        formik.setFieldValue('Status', updateData.Status)
        formik.setFieldValue('_id', updateData._id)
      }
    })
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          onClick={() => {
            localStorage.setItem('QuizById', id)
            handleEdit(id)
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpen} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Are you sure you want to delete this Question ?
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Deleting this question will permanently remove it from the Question
            </Typography>
            <Box style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant='contained' onClick={handleDelete} sx={{ mr: 3 }}>
                Delete
              </Button>
              <Button variant='contained' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  )
}

const QuestionBySubject = props => {
  // console.log('props', props)
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [editorLoaded, setEditorLoaded] = useState(false)

  const [open, setOpen] = useState(false)
  const handleOpen2 = () => setOpen(true)
  // const handleClose2 = () => setOpen(false)
  const handleClose2 = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
    // setOpen(false)
  }
  // console.log('totalScore', totalScore)
  // console.log('isNan', isNaN(totalScore))

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const router = useRouter()
  // const { id, _id, view } = router.query

  const _id = localStorage.getItem('id')
  const QuizById = localStorage.getItem('QuizById')
  const subjectID = localStorage.getItem('subjectID')
  // const Question = localStorage.getItem('Question')
  // console.log('🚀 ~ file: QuestionBySubject.js:246 ~ QuestionBySubject ~ Question:', Question)
  // console.log('🚀 ~ file: QuestionBySubject.js:222 ~ QuestionBySubject ~ id:', id)
  const params = router.query.AddQuiz

  const subjectQuestion = useSelector(state => state.QuizSlice?.allSubjectQuestion)

  // useEffect(() => {
  //   // If quizId exists, dispatch questionBySubject with the SubjectId from props.quizById
  //   if (_id) {
  //     dispatch(questionBySubject({ SubjectId: props?.quizById?.SubjectId }))
  //   }
  //   // Otherwise, dispatch questionBySubject with the passed-in id
  //   else {
  //     dispatch(questionBySubject({ Question: Question }))
  //   }
  // }, [dispatch, subjectID, _id, props?.quizById?.SubjectId])

  // useEffect(() => {
  //   if (totalScore !== undefined) {
  //     props.formik.setFieldValue('Score', totalScore)
  //   }
  // }, [totalScore])

  // useEffect(() => {
  //   if (props.quizById.Score) {
  //     setTotalScore(props.quizById.Score)
  //   }
  // }, [props.quizById.Score])

  const rows = useMemo(() => filterColumns(subjectQuestion, value.toLowerCase()), [subjectQuestion, value])

  // useEffect(() => {
  //   if (props.quizById.Score) {
  //     setTotalScore(props.quizById.Score)
  //   } else if (totalScore !== undefined) {
  //     props.formik.setFieldValue('Score', totalScore)
  //   }
  // }, [totalScore, props.quizById])

  // useEffect(() => {
  //   // Calculate the total score based on selected checkboxes
  //   const calculateTotalScore = () => {
  //     let newTotalScore = 0
  //     rows.forEach(row => {
  //       if (row.isSelected) {
  //         newTotalScore += row.ScorePoints
  //       }
  //     })
  //     setTotalScore(newTotalScore)
  //   }

  //   calculateTotalScore()
  // }, [rows])

  function filterColumns(allSupportRequest, value) {
    if (!allSupportRequest) return []
    return allSupportRequest.filter(column => {
      return (column?.QuizName ?? '').toLowerCase().includes(value)
    })
  }

  // function which accepts array and returns ordered list
  // function OrderedList(props) {
  //   const items = props.items.map((item, index) => <li key={index}>{item?.option}</li>)

  //   return <ol>{items}</ol>
  // }

  // useEffect(() => {
  //   console.log(totalScore)
  // }, [totalScore])

  // function Checkbox1(props) {
  //   return (
  //     <Field name={props.name} name1={props.name1}>
  //       {({ field, form }) => (
  //         <label>
  //           <Checkbox
  //             type='checkbox'
  //             disabled={params == 'ViewQuiz'}
  //             {...props}
  //             checked={field.value?.includes(props?.value?._id)}
  //             onChange={e => {
  //               const { checked } = e.target
  //               const nextValue = [...(field.value || [])]

  //               if (field.value?.includes(props.value?._id)) {
  //                 const valueIndex = field.value.indexOf(props.value?._id)
  //                 nextValue.splice(valueIndex, 1)
  //                 setTotalScore(prevTotalScore => prevTotalScore - props?.value?.ScorePoints)
  //               } else {
  //                 nextValue.push(props.value?._id)
  //                 setTotalScore(prevTotalScore => prevTotalScore + props?.value?.ScorePoints)
  //               }
  //               form.setFieldValue(props.name, nextValue)
  //               // form.setFieldValue(props.name1, totalScore)
  //             }}
  //           />
  //           {props?.value?.label}
  //         </label>
  //       )}
  //     </Field>
  //   )
  // }

  // function calculateTotalScore(arr) {
  //   const initialValue = 0
  //   const totalScore = arr.reduce((accumulator, currentValue) => {
  //     return accumulator + (currentValue?.ScorePoints || 0)
  //   }, initialValue)
  //   return totalScore
  // }

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black
    }
  }))

  const columns = [
    {
      flex: 0.7,
      minWidth: 250,
      // width: 400,
      field: 'Question',
      headerName: 'Question',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip
            title={<div contentEditable='true' dangerouslySetInnerHTML={{ __html: row?.Question }}></div>}
            followCursor
            arrow
          >
            <Typography variant='header'>
              <div contentEditable='true' dangerouslySetInnerHTML={{ __html: row?.Question }}></div>
            </Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.7,
      minWidth: 250,
      // width: 400,
      field: 'Explanation',
      headerName: 'Explanation',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip
            title={<div contentEditable='true' dangerouslySetInnerHTML={{ __html: row?.Explanation }}></div>}
            followCursor
            arrow
          >
            <Typography variant='header'>
              <div contentEditable='true' dangerouslySetInnerHTML={{ __html: row?.Explanation }}></div>
            </Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.19,
      field: 'Score',
      minWidth: 50,
      headerName: 'Score Points',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row?.ScorePoints}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.19,
      field: 'Points',
      minWidth: 50,
      headerName: 'Negative Points',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row?.NegativePoints}</Typography>
          </Box>
        )
      }
    },
    // {
    //   flex: 0.1,
    //   minWidth: 100,
    //   field: 'Status',
    //   headerName: 'Status',
    //   renderCell: ({ row }) => {
    //     return (
    //       <CustomChip
    //         skin='light'
    //         size='small'
    //         label={row?.Status === true ? 'Active' : 'InActive'}
    //         color={userStatusObj[row?.Status]}
    //         sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
    //       />
    //     )
    //   }
    // },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'Actions',
      headerName: 'Actions',
      renderCell: ({ row }) =>
        params == 'ViewQuiz' ? null : (
          <RowOptions id={row._id} handleOpen2={() => handleOpen2()} openQuestion={open} formik={formik} />
        )

      // <Checkbox1 value={row} name='Question' name1='Score' />
    }
  ]

  // const ITEM_HEIGHT = 48
  // const ITEM_PADDING_TOP = 8

  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250
  //     }
  //   }
  // }

  const style = {
    position: 'absolute',
    top: '90%',
    left: '68%',
    transform: 'translate(-50%, -50%)',
    width: 820,
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 5
  }

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
    Explanation: '',
    Status: true
  }

  const Questionid = localStorage.getItem('Question')

  useEffect(() => {
    if (_id) {
      let data = JSON.parse(Questionid)
      dispatch(questionBySubject({ Question: data }))
    }
  }, [Questionid])

  useEffect(() => {
    formik.setFieldValue('SubjectId', subjectID)
  }, [subjectID])

  const handleSubmit = async values => {
    // const data = await JSONToFormData(values)
    let data = values.AnswerOption
    for (let i = 0; i < data.length; i++) {
      data[i].index = i
    }

    const action = QuizById
      ? UpdateQuestionBank(Object.assign(values, { _id: QuizById }))
      : CreateQuestionBank(Object.assign(values, { SubjectId: subjectID || props?.quizById?.SubjectId }))

    dispatch(action).then(res => {
      if (res?.payload?.status === 200) {
        // let tempArray = JSON.parse(localStorage.getItem('Question')) ?? []
        // tempArray = [...tempArray, res?.payload?.data?._id]
        // localStorage.setItem('Question', JSON.stringify(tempArray))

        let tempArray = JSON.parse(localStorage.getItem('Question')) ?? []
        const newId = res?.payload?.data?._id

        // Check if the new ID already exists in the array
        if (newId && !tempArray.includes(newId)) {
          tempArray.push(newId)
          localStorage.setItem('Question', JSON.stringify(tempArray))
        }

        if (QuizById) {
          Toast({ response: res, update: true }) // toast the success message
        } else {
          Toast({ response: res }) // toast the success message
        }
        handleClose2()
        localStorage.removeItem('QuizById')
        var Questionid = JSON.parse(localStorage.getItem('Question'))
        dispatch(questionBySubject({ Question: Questionid }))
        formik.resetForm()

        // router.push('/QuizManager/QuestionBank')
      } else {
        Toast({ response: res, error: true }) // toast the error message
      }
    })
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: QuestionBankSchema,
    onSubmit: values => {
      handleSubmit(values)
      // console.log('🚀 ~ file: QuestionBySubject.js:536 ~ QuestionBySubject ~ values:', values)
    }
  })

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <Card>
              <CardHeader
                title='Subject Questions'
                sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
              />
              {/* <CardContent>
                <Grid container spacing={6}></Grid>
              </CardContent> */}
              {params == 'ViewQuiz' ? null : (
                <Button onClick={handleOpen2} sx={{ mb: 2, ml: 2 }} variant='contained'>
                  Add Question
                </Button>
              )}
              <div>
                <Modal
                  open={open}
                  disableEnforceFocus={true}
                  onClose={handleClose2}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                  style={{ overflowY: 'scroll', height: '500px' }}
                  className='QuizModal'
                  // hideBackdrop={true}
                >
                  <Box sx={style} className='topic-modal-content'>
                    <FormikProvider value={formik}>
                      <div>
                        <Card>
                          <CardHeader title='Question' />
                          <Divider />
                          <CardContent>
                            <form onSubmit={formik.handleSubmit}>
                              <Grid container spacing={5}>
                                <Grid item xs={12} sm={6}>
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

                                <Grid item xs={12} sm={6}>
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

                                <Grid item xs={12} sm={6} display='none'>
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
                                        params == 'ViewQuestionBank'
                                          ? null
                                          : formik.setFieldValue('Status', e.target.value)
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

                                <Grid item xs={6}>
                                  <FormControl fullWidth className='modal-editor-width'>
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
                                      <FormHelperText sx={{ color: 'error.main' }}>
                                        {formik.errors.Question}
                                      </FormHelperText>
                                    ) : null}
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth>
                                    <FieldArray name='AnswerOption'>
                                      {({ remove, push, err }) => (
                                        <div>
                                          <div
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'space-between'
                                            }}
                                          >
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
                                                <div
                                                  className='row'
                                                  key={index}
                                                  style={{ display: 'flex', alignItems: 'center' }}
                                                >
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
                                                        multiline
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

                                <Grid item xs={12}>
                                  <FormControl fullWidth className='modal-editor-width'>
                                    <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Explanation</h4>
                                    <Editor
                                      value={formik?.values?.Explanation}
                                      name='Explanation'
                                      editorLoaded={editorLoaded}
                                      onChange={e => {
                                        formik?.setFieldValue('Explanation', e)
                                      }}
                                      onBlur={() => {
                                        formik?.setFieldTouched('Explanation', true)
                                      }}
                                      view={params == 'ViewQuestionBank' ? true : false}
                                    />
                                    {formik.errors.Explanation && formik.touched.Explanation ? (
                                      <FormHelperText sx={{ color: 'error.main' }}>
                                        {formik.errors.Explanation}
                                      </FormHelperText>
                                    ) : null}
                                  </FormControl>
                                </Grid>

                                <Grid item sm={12}>
                                  <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                                    <Button
                                      size='large'
                                      type='submit'
                                      variant='contained'
                                      style={{ marginRight: '10px' }}
                                    >
                                      {QuizById ? 'Update' : 'Save'}
                                    </Button>
                                    <Button
                                      size='large'
                                      onClick={() => {
                                        handleClose2(), formik.resetForm(), localStorage.removeItem('QuizById')
                                      }}
                                      variant='contained'
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </Grid>
                              </Grid>
                            </form>
                          </CardContent>
                        </Card>
                      </div>
                    </FormikProvider>
                  </Box>
                </Modal>
              </div>
              <Divider />
              <DataGrid
                // rowHeight={150}
                // getEstimatedRowHeight={() => 100}
                getRowHeight={() => 'auto'}
                autoHeight
                rows={rows}
                columns={columns}
                getRowId={row => row._id}
                // checkboxSelection
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              />
              {/* )} */}
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default QuestionBySubject
