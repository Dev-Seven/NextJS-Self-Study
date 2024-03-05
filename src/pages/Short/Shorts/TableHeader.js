// ** MUI Imports
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SelectSubject } from 'src/schemas'

const TableHeader = props => {
  // ** Props
  const { handleFilter, toggle, value, AllSubject } = props
  const router = useRouter()

  const initialValues = {
    SubjectId: ''
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: SelectSubject,
    onSubmit: values => {
      localStorage.setItem('subjectID', values.SubjectId)
      router.replace({
        pathname: '/Short/Shorts/AddShorts'
      })
    }
  })

  // menu props to handle select height
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

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%', justifyContent: 'flex-end' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Media'
          onChange={e => {
            handleFilter(e.target.value)
          }}
        />

        <Grid item xs={12} sm={6} sx={{ mr: 6, mb: 2 }} style={{ maxWidth: '30%' }}>
          <FormControl fullWidth size='small'>
            <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
              Subject
            </InputLabel>
            <Select
              value={formik.values.SubjectId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label='Subject'
              name='SubjectId'
              labelId='validation-basic-select'
              aria-describedby='validation-basic-select'
              MenuProps={MenuProps}
            >
              {AllSubject?.map(item => (
                <MenuItem key={item} value={`${item._id}`}>
                  {item?.SubjectName}
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

        <Button
          sx={{ mb: 2 }}
          onClick={() => {
            formik.handleSubmit()
            localStorage.removeItem('id')
          }}
          variant='contained'
        >
          Add Media
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
