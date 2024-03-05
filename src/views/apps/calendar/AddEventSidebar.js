/* eslint-disable lines-around-comment */
/* eslint-disable padding-line-between-statements */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { fetchEvents, getAllImportantDateCategoryDropdown } from 'src/store/slices/CalendarSlice'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { calendarSchema } from 'src/schemas'
import { useFormik } from 'formik'
import { Radio, RadioGroup } from '@mui/material'
import Toast from 'src/pages/Common/Toast'

const capitalize = string => string && string[0].toUpperCase() + string.slice(1)

const defaultState = {
  EventTitle: '',
  isRepeat: false,
  Description: '',
  endDate: new Date(),
  calendar: 'Business',
  startDate: new Date()
}

const AddEventSidebar = props => {
  // ** Props
  const {
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle,
    dataFromChild
  } = props

  // ** States
  const [values, setValues] = useState(defaultState)
  const textFieldRef = useRef()
  const datesCategory = useSelector(state => state.CalendarSlice?.getAllImportantDateCategoryDropdown)

  const {
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: { EventTitle: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    formik.setErrors({})
    formik.setTouched({})
    dispatch(handleSelectEvent(null))

    handleAddEventSidebarToggle()
  }

  useEffect(() => {
    dispatch(getAllImportantDateCategoryDropdown())
  }, [dispatch])

  // const [dataFromChild, setDataFromChild] = useState('')

  var firstDay = dataFromChild?.view?.currentStart
  var lastDay = dataFromChild?.view?.currentEnd

  // to convert it into iso date
  // var StartData = moment(firstDay).add(1, 'days').toISOString()
  // var EndDate = moment(lastDay).toISOString()

  const outputFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ'

  // to convert it into iso date
  // var StartData = moment(firstDay).add(1, 'days').toISOString()
  var StartData = moment.utc(firstDay).add(1, 'days').startOf('day').format(outputFormat)

  // var EndDate = moment(lastDay).toISOString()
  var EndDate = moment.utc(lastDay).startOf('day').format(outputFormat)

  const initialValues = {
    EventTitle: '',
    importantDateCategoryId: '',
    Description: '',
    isRepeat: false,
    EventDate: ''
  }

  useEffect(() => {
    if (store.selectedEvent !== null || store.selectedEvent?.title !== '') {
      formik.setFieldValue('EventTitle', store?.selectedEvent?.title)
      formik.setFieldValue('Description', store?.selectedEvent?.extendedProps?.description)
      formik.setFieldValue('isRepeat', store?.selectedEvent?.extendedProps?.isRepeat)
      formik.setFieldValue('importantDateCategoryId', store?.selectedEvent?.extendedProps?.importantDateCategoryId)
      formik.setFieldValue('EventDate', store?.selectedEvent?.EventDate)
      formik.setFieldValue('_id', store?.selectedEvent?.extendedProps?._id)
    }
  }, [store?.selectedEvent])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: calendarSchema,
    onSubmit: values => {
      if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
        dispatch(addEvent(values)).then(res => {
          if (res.payload?.status === 200) {
            Toast({ response: res })
            // toast.success(res?.payload?.message, {
            //   style: {
            //     padding: '12px',
            //     color: theme.palette.primary.main,
            //     border: `1px solid ${theme.palette.primary.main}`
            //   },
            //   iconTheme: {
            //     primary: theme.palette.success.main,
            //     secondary: theme.palette.primary.contrastText
            //   }
            // })
            handleSidebarClose()
            dispatch(fetchEvents({ StartDate: StartData, EndDate: EndDate }))
          } else {
            Toast({ response: res, error: true })
            // toast.error(res?.payload?.message, {
            //   style: {
            //     padding: '12px',
            //     color: theme.palette.primary.main,
            //     border: `1px solid ${theme.palette.primary.main}`
            //   },
            //   iconTheme: {
            //     primary: theme.palette.error.main,
            //     secondary: theme.palette.error.contrastText
            //   }
            // })
          }
        })
      } else {
        dispatch(updateEvent(values)).then(res => {
          if (res.payload?.status === 200) {
            Toast({ response: res, update: true })
            handleSidebarClose()
            dispatch(fetchEvents({ StartDate: StartData, EndDate: EndDate }))
          } else {
            Toast({ response: res, error: true })
          }
        })
      }
    }
  })

  useEffect(() => {
    if (values.startDate) {
      formik.setFieldValue('EventDate', moment(values.startDate).format('L'))
    }
  }, [values])

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      dispatch(deleteEvent(store?.selectedEvent?.extendedProps?._id)).then(res => {
        if (res.payload?.status === 200) {
          Toast({ response: res, remove: true })
          handleSidebarClose()
          dispatch(fetchEvents({ StartDate: StartData, EndDate: EndDate }))
        } else {
          Toast({ response: res, error: true })
        }
      })
    }

    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      setValue('EventTitle', event.EventTitle || '')
      setValues({
        EventTitle: event.EventTitle || '',
        isRepeat: event.isRepeat,
        Description: event.extendedProps.Description || '',
        calendar: event.extendedProps.calendar || 'Business',
        endDate: event.end !== null ? event.end : event.start,
        startDate: event.start !== null ? event.start : new Date()
      })
    }
  }, [store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('EventTitle', '')
    setValues(defaultState)
    formik.setFieldValue('isRepeat', false)
  }, [setValue])
  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

  const PickersComponent = forwardRef(({ ...props }, ref) => {
    return (
      <TextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={handleSidebarClose}>
            Cancel
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button
            size='large'
            type='submit'
            onClick={() => textFieldRef.current.blur()}
            variant='contained'
            sx={{ mr: 4 }}
            disableFocusRipple
          >
            Update
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={handleSidebarClose}>
            Cancel
          </Button>
        </Fragment>
      )
    }
  }

  useEffect(() => {
    if (formik.values.EventTitle == '') {
      formik.setFieldValue('isRepeat', false)
      formik.setFieldValue('importantDateCategoryId', '')
    }
  }, [formik.values.EventTitle])

  // console.log('formik.values', formik.values)

  return (
    <Drawer
      anchor='right'
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'background.default',
          p: theme => theme.spacing(3, 3.255, 3, 5.255)
        }}
      >
        <Typography variant='h6'>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? 'Update Event' : 'Add Event'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? (
            <IconButton
              size='small'
              onClick={handleDeleteEvent}
              sx={{ color: 'text.primary', mr: store.selectedEvent !== null ? 1 : 0 }}
            >
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          ) : null}
          <IconButton size='small' onClick={handleSidebarClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
        <DatePickerWrapper>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: 6 }}>
              <DatePicker
                id='read-only-input'
                readOnly
                dateFormat='d/MM/yyyy'
                disabled
                name='EventDate'
                selected={values.startDate}
                customInput={<PickersComponent label='Selected Date' />}

                // onChange={date => {
                //   formik.setFieldValue('EventDate', date)
                // }}
              />
            </Box>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField
                value={formik.values.EventTitle}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                inputRef={textFieldRef}
                placeholder='Event Title'
                label='Event Title'
                name='EventTitle'
                type='text'
              />
              {formik.errors.EventTitle && formik.touched.EventTitle ? (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                  {formik.errors.EventTitle}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='event-calendar'>Category</InputLabel>
              <Select
                label='Category'
                name='importantDateCategoryId'
                value={formik.values.importantDateCategoryId}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                labelId='event-importantDateCategoryId'
              >
                {datesCategory?.map((item, index) => {
                  return <MenuItem value={item?._id}>{item?.importantDateCategoryName}</MenuItem>
                })}
              </Select>
              {formik.errors.importantDateCategoryId && formik.touched.importantDateCategoryId ? (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                  {formik.errors.importantDateCategoryId}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField
                multiline
                placeholder='Description'
                label='Description'
                name='Description'
                type='text'
                value={formik.values.Description}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                inputRef={textFieldRef}
              />
              {formik.errors.Description && formik.touched.Description ? (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                  {formik.errors.Description}
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl sx={{ mb: 6 }}>
              <div className='status-container' style={{ display: 'flex', alignItems: 'center' }}>
                <h4 style={{ margin: '0', padding: '0 10px' }}>Repeat Every Year :-</h4>
                <RadioGroup
                  aria-label='Repeat Every Year'
                  name='isRepeat'
                  value={
                    formik.values.isRepeat == 'true'
                      ? (formik.values.isRepeat = true)
                      : formik.values.isRepeat == 'false'
                      ? (formik.values.isRepeat = false)
                      : null
                  }
                  row
                  onChange={e => {
                    formik.setFieldValue('isRepeat', e.target.value)
                  }}
                >
                  {/* {console.log('checked', formik.values)} */}
                  <FormControlLabel
                    value='false'
                    checked={formik.values.isRepeat === false}
                    control={<Radio color='primary' />}
                    label='No'
                    labelPlacement='end'
                  />
                  <FormControlLabel
                    value='true'
                    checked={formik.values.isRepeat === true}
                    control={<Radio color='primary' />}
                    label='Yes'
                    labelPlacement='end'
                  />
                </RadioGroup>
              </div>
              {formik.errors.isRepeat && formik.touched.isRepeat ? (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                  {formik.errors.isRepeat}
                </FormHelperText>
              ) : null}
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <RenderSidebarFooter /> */}
              {store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length) ? (
                <Fragment>
                  <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
                    Add
                  </Button>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleSidebarClose}>
                    Cancel
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <Button
                    size='large'
                    type='submit'
                    onClick={() => textFieldRef.current.blur()}
                    variant='contained'
                    sx={{ mr: 4 }}
                    disableFocusRipple
                  >
                    Update
                  </Button>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleSidebarClose}>
                    Cancel
                  </Button>
                </Fragment>
              )}
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  )
}

export default AddEventSidebar
