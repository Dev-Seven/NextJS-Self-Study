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
import { addQuizCategorySchema, addTaxSchema } from 'src/schemas'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { CreateQuizCategory, GetQuizCategoryById, UpdateQuizCategory } from 'src/store/slices/QuizSlice'
import { toast } from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'
import {
  addServiceTax,
  getAllActiveServiceTax,
  getServiceTaxById,
  getStateById,
  updateServiceTax,
  updateStateTax
} from 'src/store/slices/MasterSlice'

const EditState = () => {
  // ** State
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const activeTaxes = useSelector(state => state.MasterSlice.getAllActiveServiceTax)
  // console.log('🚀  activeTaxes:', activeTaxes)
  const getState = useSelector(state => state.MasterSlice.getState)
  // console.log('🚀  getStateById:', getState)
  const [isChecked, setIsChecked] = useState(false)

  const id = localStorage.getItem('id')
  // const params = router.query.EditState
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]

  const initialValues = {
    stateName: '',
    Tax: []
  }

  // ** useEffect to handle form data during edit
  useEffect(() => {
    if (id) {
      dispatch(getAllActiveServiceTax())
      dispatch(getStateById(id)).then(res => {
        let updateData = res.payload.data
        formik.setFieldValue('stateName', updateData.stateName)
        formik.setFieldValue('Tax', updateData.Tax)
      })
    }
  }, [dispatch, id])

  // ** formik state to handle form submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    // validationSchema: addTaxSchema,
    onSubmit: values => {
      const action = updateStateTax(Object.assign(values, { _id: id }))

      dispatch(action).then(res => {
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/master/state')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  const handleCheckboxChange = _id => {
    const updatedTax = formik.values.Tax.includes(_id)
      ? formik.values.Tax.filter(id => id !== _id) // Remove _id if it exists
      : [...formik.values.Tax, _id] // Add _id if it doesn't exist

    formik.setFieldValue('Tax', updatedTax) // Update formik values
  }

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader title={params == 'EditState' ? 'Edit State' : 'View State'} />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='stateName'
                        label='State Name'
                        type='text'
                        placeholder='State Name'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.stateName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: true }}
                      />
                      {formik.errors.stateName && formik.touched.stateName ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.stateName}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    {activeTaxes.map((item, index) => (
                      <div key={index}>
                        <FormControlLabel
                          label={item.lable}
                          control={
                            <Checkbox
                              checked={formik.values.Tax.includes(item._id)}
                              onChange={() => handleCheckboxChange(item._id)}
                              name='basic-checked'
                              disabled={params == 'ViewState'}
                            />
                          }
                        />
                      </div>
                    ))}
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      {params == 'ViewState' ? (
                        ''
                      ) : (
                        <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                          Update
                        </Button>
                      )}

                      <Link prefetch={false} href='/master/state' style={{ textDecoration: 'none' }}>
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

export default EditState
