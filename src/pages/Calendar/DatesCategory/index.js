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
import { TopicTagSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { CreateTopicTag, GetTopicTagById, UpdateTopicTag } from 'src/store/slices/LearningSlice'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import { ChromePicker } from 'react-color'
import { datesCategory } from 'src/store/slices/CalendarSlice'
// import DateCategoryTable from './DateCategoryTable'

import dynamic from 'next/dynamic'

const DateCategoryTable = dynamic(() => import('./DateCategoryTable'))

// 1001 START

const DatesCategory = () => {
  const [colors, setColors] = useState(null)
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const { id, view } = router.query
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // // handle color picker change
  // const colorPicker = e => {
  //   formik.setFieldValue('colorCode', e.hex)
  //   const newColor = {
  //     hex: e?.hex,
  //     rgb: '(' + e.rgb.r + ',' + e.rgb.g + ',' + e.rgb.b + ',' + e.rgb.a + ')'
  //   }
  //   setColors(newColor)
  // }

  // // formik initialValues
  // const initialValues = {
  //   importantDateCategoryName: '',
  //   colorCode: ''
  // }

  // useEffect(() => {
  //   dispatch(GetTopicTagById(id)).then(res => {
  //     if (id) {
  //       let updateData = res.payload.data
  //       formik.setFieldValue('TopicTagName', updateData.TopicTagName)
  //     }
  //   })
  // }, [])

  // handle form Submit
  // const handleSubmit = values => {
  //   if (id) {
  //     dispatch(UpdateTopicTag(values)).then(res => {
  //       if (res.payload.status === 200) {
  //         toast.success(res?.payload?.message, {
  //           style: {
  //             padding: '16px',
  //             color: theme.palette.primary.main,
  //             border: `1px solid ${theme.palette.primary.main}`
  //           },
  //           iconTheme: {
  //             primary: theme.palette.primary.main,
  //             secondary: theme.palette.primary.contrastText
  //           }
  //         })
  //         router.push('/Learning/TopicTag')
  //       } else {
  //         toast.error(res?.payload?.message, {
  //           style: {
  //             padding: '16px',
  //             color: theme.palette.primary.main,
  //             border: `1px solid ${theme.palette.primary.main}`
  //           },
  //           iconTheme: {
  //             primary: theme.palette.primary.main,
  //             secondary: theme.palette.primary.contrastText
  //           }
  //         })
  //       }
  //     })
  //   } else {
  //     dispatch(datesCategory(values)).then(res => {
  //       if (res.payload.status === 200) {
  //         toast.success(res?.payload?.message, {
  //           style: {
  //             padding: '16px',
  //             color: theme.palette.primary.main,
  //             border: `1px solid ${theme.palette.primary.main}`
  //           },
  //           iconTheme: {
  //             primary: theme.palette.primary.main,
  //             secondary: theme.palette.primary.contrastText
  //           }
  //         })
  //         // router.push('/Learning/TopicTag')
  //       } else {
  //         toast.error(res?.payload?.message, {
  //           style: {
  //             padding: '16px',
  //             color: theme.palette.primary.main,
  //             border: `1px solid ${theme.palette.primary.main}`
  //           },
  //           iconTheme: {
  //             primary: theme.palette.primary.main,
  //             secondary: theme.palette.primary.contrastText
  //           }
  //         })
  //       }
  //     })
  //   }
  // }

  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: initialValues,
  //   onSubmit: values => {
  //     handleSubmit(values)
  //   }
  // })

  return (
    <>
      <div>
        <DateCategoryTable />
      </div>
    </>
  )
}

export default DatesCategory

//1001 END
