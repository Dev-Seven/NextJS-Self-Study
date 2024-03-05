/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
// 1001 === 02.03.2023 === Add Shorts Form === Dhruv ===

// 1001 START
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { addShortSchema, addShortwithDescriptionSchema } from 'src/schemas'
import { useFormik } from 'formik'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import DatePicker from 'react-datepicker'
import PickersComponent from 'src/views/pages/datepicker/PickersComponent'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { CreateShorts, GetShortbyId, GetShortCatBySubject, UpdateShorts } from 'src/store/slices/ShortsSlice'
import moment from 'moment'
import styled from '@emotion/styled'
import { toast } from 'react-hot-toast'
import { img_url } from 'src/common/Service'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Editor from '../../../Editor'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'
import Banner from 'src/pages/Common/Banner'

const AddShorts = ({ popperPlacement }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const [editorLoaded, setEditorLoaded] = useState(false)
  const [dateClear, setDateClear] = useState(new Date())
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const [imageData, setImageData] = useState('')
  const [imgPrw, setImgPrw] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  //** For date */
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  // const { id, _id, view } = router.query

  // const params = router.query.AddShorts
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]
  const id = localStorage.getItem('subjectID')
  const _id = localStorage.getItem('id')

  const subByCat = useSelector(state => state.ShortsSlice.subByCat)

  const getShortsById = useSelector(state => state.ShortsSlice.getShortsById)
  // console.log('🚀 ~ file: [AddShorts].js:99 ~ AddShorts ~ getShortsById:', getShortsById.SubjectId)
  const subId = getShortsById?.SubjectId

  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // Image Start
  const [imgSrc, setImgSrc] = useState('/admin/images/Banner.png')
  const [preview, setPreview] = useState(false)
  const [dbImage, setdbImage] = useState(false)

  // Image End

  const initialValues = {
    SubjectId: '',
    ShortCatId: '',
    Title: '',
    isShort: true,
    StreamLink: '',
    StartDate: '',
    EndDate: '',
    BannerImage: '',
    Description: ''
  }

  useEffect(() => {
    if (_id || id) {
      dispatch(GetShortbyId(_id || id)).then(res => {
        if (res?.payload?.data) {
          let updateData = res?.payload?.data

          setImageData(updateData?.BannerImage)
          fetch(updateData?.BannerImage)
            .then(res => {
              res.blob()
            })
            .then(blob => {
              let file = new File([blob], `${updateData?.BannerImage}`)

              // formik.setFieldValue('SubjectId', updateData.SubjectId)
              formik.setFieldValue('ShortCatId', updateData?.ShortCatId)
              formik.setFieldValue('Title', updateData?.Title)
              formik.setFieldValue('isShort', updateData?.isShort)
              formik.setFieldValue('StreamLink', updateData?.StreamLink)
              formik.setFieldValue('StartDate', moment(updateData?.StartDate).local().toDate())
              formik.setFieldValue('EndDate', moment(updateData?.EndDate).local().toDate())
              formik.setFieldValue('Description', updateData?.Description)
              formik.setFieldValue('BannerImage', file)
            })
          setSelectedStartDate(moment(updateData?.StartDate).local().toDate())
          updateData?.EndDate ? setSelectedEndDate(moment(updateData?.EndDate).local().toDate()) : null
          setImgSrc(updateData?.BannerImage)
          setdbImage(true)
          setPreview(true)
        }
      })
    }
  }, [dispatch, _id])

  useEffect(() => {
    if (_id) {
      dispatch(GetShortCatBySubject({ SubjectId: subId }))
    } else {
      dispatch(GetShortCatBySubject({ SubjectId: id }))
    }
  }, [getShortsById])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: open ? addShortSchema : addShortwithDescriptionSchema,
    onSubmit: values => {
      let data = new FormData()
      function addBorderCollapseToTable(htmlContent) {
        let parser = new DOMParser()
        let doc = parser.parseFromString(htmlContent, 'text/html')
        let tables = doc.querySelectorAll('figure.table table')

        tables.forEach(table => {
          table.style.borderCollapse = 'collapse'
        })

        return new XMLSerializer().serializeToString(doc)
      }
      data.append('Title', values.Title)
      data.append('StartDate', moment(values.StartDate).toISOString())
      data.append('EndDate', moment(values.EndDate).toISOString() || '')
      // data.append('SubjectId', id)
      data.append('StreamLink', values.StreamLink)
      data.append('ShortCatId', values.ShortCatId)
      data.append('isShort', values.isShort)
      data.append('BannerImage', isEdit ? values.BannerImage : imageData)
      data.append('Description', addBorderCollapseToTable(values.Description))
      if (_id) {
        data.append('_id', _id)
        data.append('SubjectId', getShortsById?.SubjectId?.trim())
      } else {
        data.append('SubjectId', id)
      }

      const action = _id ? UpdateShorts(data) : CreateShorts(data)

      dispatch(action).then(res => {
        if (res.payload?.status === 200) {
          if (_id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Short/Shorts')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  useEffect(() => {
    if (formik.values.isShort === true) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [formik?.values?.isShort, open])

  useEffect(() => {
    setEditorLoaded(true)
  }, [])

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader
              title={params == 'EditShorts' ? 'Edit Media' : params == 'ViewShorts' ? 'View Media' : 'Add Media'}
            />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit} autoComplete='off'>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <TextField
                        name='Title'
                        label='Media Title'
                        type='text'
                        placeholder='Media Title'
                        value={formik.values.Title}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: params == 'ViewShorts' ? true : false }}
                      />
                      {formik.errors.Title && formik.touched.Title ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Title}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='validation-basic-select'>Type</InputLabel>
                      <Select
                        label='Type'
                        name='isShort'
                        labelId='validation-basic-select'
                        value={formik.values.isShort}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        readOnly={params == 'ViewShorts' ? true : false}
                      >
                        <MenuItem value={true}>Media</MenuItem>
                        <MenuItem value={false}>Editor Section</MenuItem>
                      </Select>
                      {formik.errors.isShort && formik.touched.isShort ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.isShort}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                        Media Category
                      </InputLabel>
                      <Select
                        label='Media Category'
                        name='ShortCatId'
                        labelId='validation-basic-select'
                        aria-describedby='validation-basic-select'
                        value={formik.values.ShortCatId}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        readOnly={params == 'ViewShorts' ? true : false}
                      >
                        {subByCat?.map(item => (
                          <MenuItem key={item} value={`${item._id}`}>
                            {item.ShortCategoryName}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.errors.ShortCatId && formik.touched.ShortCatId ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.ShortCatId}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  {formik?.values?.isShort === true ? (
                    <Grid item xs={12} sm={12}>
                      <FormControl fullWidth>
                        <TextField
                          name='StreamLink'
                          label='Streaming Link'
                          type='text'
                          placeholder='Streaming Link'
                          aria-describedby='validation-basic-first-name'
                          value={formik.values.StreamLink}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          InputProps={{ readOnly: params == 'ViewShorts' ? true : false }}
                        />
                        {formik.errors.StreamLink && formik.touched.StreamLink ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.StreamLink}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <h4 style={{ marginBottom: '0.5rem', marginTop: '-0.4rem' }}>Media Content</h4>
                        <Editor
                          name='Description'
                          editorLoaded={editorLoaded}
                          value={formik?.values?.Description}
                          onChange={e => {
                            formik?.setFieldValue('Description', e)
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.Description || formik.touched.Description ? (
                          <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Description}</FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <EditorWrapper>
                        <DatePicker
                          readOnly={params == 'ViewShorts' ? true : false}
                          showYearDropdown
                          showMonthDropdown
                          id='picker-clear'
                          name='StartDate'
                          dateFormat='d/MM/yyyy'
                          placeholderText='Publish Start Date'
                          selected={selectedStartDate}
                          popperPlacement={popperPlacement}
                          customInput={<PickersComponent label='Publish Start Date' />}
                          onChange={date => {
                            setDateClear(date)
                            setSelectedStartDate(date)
                            const convertedDate = moment.parseZone(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                            formik.setFieldValue('StartDate', convertedDate)
                          }}
                        />
                        {formik.errors.StartDate && formik.touched.StartDate ? (
                          <FormHelperText sx={{ color: 'error.main' }} style={{ marginLeft: '14px' }}>
                            {formik.errors.StartDate}
                          </FormHelperText>
                        ) : null}
                      </EditorWrapper>
                    </DatePickerWrapper>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <EditorWrapper>
                        <DatePicker
                          readOnly={params == 'ViewShorts' ? true : false}
                          showYearDropdown
                          showMonthDropdown
                          id='picker-clear'
                          name='EndDate'
                          dateFormat='d/MM/yyyy'
                          placeholderText='Publish End Date'
                          selected={selectedEndDate}
                          popperPlacement={popperPlacement}
                          customInput={<PickersComponent label='Publish End Date' />}
                          onChange={date => {
                            setDateClear(date)
                            setSelectedEndDate(date)
                            const convertedDate = moment.parseZone(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                            formik.setFieldValue('EndDate', convertedDate)
                          }}
                        />
                        {formik.errors.EndDate && formik.touched.EndDate ? (
                          <FormHelperText sx={{ color: 'error.main' }} style={{ marginLeft: '14px' }}>
                            {formik.errors.EndDate}
                          </FormHelperText>
                        ) : null}
                      </EditorWrapper>
                    </DatePickerWrapper>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Banner
                      name='Media Banner'
                      formikName='BannerImage'
                      formik={formik}
                      id={_id}
                      imgPrw={imgPrw}
                      imgSrc={imgSrc}
                      setImgSrc={setImgSrc}
                      setImgPrw={setImgPrw}
                      setIsEdit={setIsEdit}
                      view={params == 'ViewShorts' ? true : false}
                    />
                  </Grid>

                  {params == 'ViewShorts' ? (
                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link prefetch={false} href='/Short/Shorts/' style={{ textDecoration: 'none' }}>
                          <Button size='large' variant='contained' style={{ marginRight: '10px' }}>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  ) : (
                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        {!_id ? (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Save
                          </Button>
                        ) : (
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                            Update
                          </Button>
                        )}
                        <Link prefetch={false} href='/Short/Shorts/' style={{ textDecoration: 'none' }}>
                          <Button size='large' variant='contained'>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default AddShorts

// 1001 END
