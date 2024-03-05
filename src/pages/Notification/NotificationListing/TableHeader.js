// ** MUI Imports
import TextField from '@mui/material/TextField'
import { Modal, Box, Typography, Button, FormHelperText, FormControl } from '@mui/material'
import { useState } from 'react'
import { FormikProvider, useFormik } from 'formik'
import { notificationSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { SendNotification } from 'src/store/slices/AdminSlice'

const TableHeader = props => {
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

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // ** Props
  const { handleFilter, toggle, value } = props

  const initialValues = {
    title: '',
    message: ''
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: notificationSchema,
    onSubmit: values => {
      dispatch(SendNotification(values)).then(res => {
        console.log('🚀  res:', res)
        if (res?.payload?.status == 201) {
          handleClose()
          formik.resetForm()
        }
      })
      console.log('🚀  values:', values)
    }
  })

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Subscription'
          onChange={e => {
            handleFilter(e.target.value)
          }}
        />

        <Button sx={{ mb: 2 }} onClick={handleOpen} variant='contained'>
          Send Notification
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <FormikProvider value={formik}>
              <FormControl fullWidth>
                <TextField
                  placeholder='Title'
                  label='Title'
                  name='title'
                  multiline
                  defaultValue='2'
                  aria-describedby='validation-basic-first-name'
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title ? (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    {formik.errors.title}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  rows={4}
                  multiline
                  label='Message'
                  placeholder='Type Message'
                  name='message'
                  defaultValue='2'
                  aria-describedby='validation-basic-first-name'
                  value={formik.values.message}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  style={{ width: '100%', marginTop: '20px' }}
                />
                {formik.errors.message && formik.touched.message ? (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                    {formik.errors.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </FormikProvider>
            <Box style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant='contained' onClick={formik.handleSubmit} sx={{ mr: 3 }}>
                Send
              </Button>
              <Button variant='contained' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}

export default TableHeader
