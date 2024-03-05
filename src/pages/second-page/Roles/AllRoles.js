// import React, { useRef } from 'react'
// import { Formik, Form, Field } from 'formik'
// import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'

// const initialValues = {
//   role: {
//     isAdd: false,
//     isEdit: false,
//     isView: false,
//     isDelete: false
//   },
//   parent2: {
//     isAdd: false,
//     isEdit: false,
//     isView: false,
//     isDelete: false
//   }
// }

// const parents = ['role', 'parent2']

// const children = ['isAdd', 'isEdit', 'isView', 'isDelete']

// const App = () => {
//   const parentRefs = useRef({})

//   const handleSelectAll = (parent, setFieldValue, value) => {
//     const newParentState = { ...value }
//     children.forEach(child => {
//       newParentState[child] = !newParentState[child]
//     })
//     setFieldValue(parent, newParentState)

//     const checkedChildren = children.filter(child => newParentState[child])
//     const indeterminate = checkedChildren.length > 0 && checkedChildren.length < children.length
//     parentRefs.current[parent].indeterminate = indeterminate
//   }

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={values => {
//         console.log(values)
//       }}
//     >
//       {({ values, setFieldValue }) => (
//         <Form>
//           {parents.map(parent => {
//             const checkedChildren = children.filter(child => values[parent][child])
//             const indeterminate = checkedChildren.length > 0 && checkedChildren.length < children.length

//             return (
//               <div key={parent}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={
//                         values[parent].isAdd && values[parent].isEdit && values[parent].isView && values[parent].isDelete
//                       }
//                       indeterminate={indeterminate}
//                       onChange={e => handleSelectAll(parent, setFieldValue, values[parent])}
//                       ref={el => (parentRefs.current[parent] = el)}
//                     />
//                   }
//                   label={parent}
//                 />
//                 {children.map(child => (
//                   <FormControlLabel
//                     key={child}
//                     control={
//                       <Checkbox
//                         checked={values[parent][child]}
//                         onChange={() => setFieldValue(`${parent}.${child}`, !values[parent][child])}
//                       />
//                     }
//                     label={child}
//                   />
//                 ))}
//               </div>
//             )
//           })}
//           <Button type='submit'>Submit</Button>
//         </Form>
//       )}
//     </Formik>
//   )
// }

// export default App

import React, { useState, useRef } from 'react'
import { Formik, Form, Field, useFormik } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  capitalize,
  FormHelperText
} from '@mui/material'

const initialValues = {
  role: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    role: false
  },
  topic: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    topic: false
  },
  dashboard: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    dashboard: false
  },
  adminUser: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    adminUser: false
  },
  user: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    user: false
  },
  subject: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    subject: false
  },
  category: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    category: false
  },
  map: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    map: false
  },
  coupon: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    coupon: false
  },
  subscription: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    subscription: false
  },
  questionBank: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    questionBank: false
  },
  quiz: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    quiz: false
  },
  notification: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    notification: false
  },
  emailsListing: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    emailsListing: false
  },
  composeEmail: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    composeEmail: false
  },
  payments: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    payments: false
  },
  shorts: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    shorts: false
  },
  shortsTopic: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    shortsTopic: false
  },
  importantDates: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    importantDates: false
  },
  importantDateCategory: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    importantDateCategory: false
  },
  supportSubject: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    supportSubject: false
  },
  supportRequest: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    supportRequest: false
  }
}

const parents = [
  'dashboard',
  'adminUser',
  'role',
  'user',
  'subject',
  'category',
  'map',
  'coupon',
  'subscription',
  'questionBank',
  'quiz',
  'notification',
  'emailsListing',
  'composeEmail',
  'payments',
  'shorts',
  'shortsTopic',
  'importantDates',
  'importantDateCategory',
  'supportSubject',
  'supportRequest',
  'topic'
]

const children = ['isAdd', 'isEdit', 'isView', 'isDelete']

const App = () => {
  const parentRefs = useRef({})
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = (parent, setFieldValue, value) => {
    const newParentState = { ...value }

    children.forEach(child => {
      newParentState[child] = !newParentState[child]
      newParentState[parent] = true
    })

    setFieldValue(parent, newParentState)

    const checkedChildren = children.filter(child => newParentState[child])
    const indeterminate = checkedChildren.length > 0 && checkedChildren.length < children.length
    parentRefs.current[parent].indeterminate = indeterminate

    const allParentsSelected = parents.every(parent => {
      const allChildrenSelected = children.every(child => {
        value[child] === true, (value[parent] = true)
      })

      return allChildrenSelected
    })
    setSelectAll(allParentsSelected)
  }

  const handleGlobalSelectAll = (setFieldValue, value) => {
    const newValues = { ...value }
    parents.forEach(parent => {
      newValues[parent] = children.reduce((acc, child) => {
        acc[child] = !selectAll

        return acc
      }, {})
    })
    setFieldValue('globalSelectAll', !selectAll)
    setFieldValue('role', newValues.role)
    setFieldValue('parent2', newValues.parent2)
    setSelectAll(!selectAll)
  }

  const initialValues1 = {
    RoleName: '',
    isActive: true
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues1,
    onSubmit: values => {
      // console.log('formik', values)
    }
  })

  // function to handle Submit

  const handleSubmit = values => {
    let tempObj = {
      Permission: {
        ...values
      }
    }
  }

  return (
    <>
      <Box>
        <TextField
          type='text'
          fullWidth
          name='RoleName'
          id='role'
          value={formik.values.RoleName}
          onChange={formik.handleChange}
        />
      </Box>
      <Formik
        initialValues={{
          ...initialValues,
          globalSelectAll: false
        }}
        onSubmit={values => {
          handleSubmit(values)
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                onChange={() => handleGlobalSelectAll(setFieldValue, values.globalSelectAll)}
              />
            }
            label='Select all'
          /> */}
            {parents.map(parent => {
              const checkedChildren = children.filter(child => values[parent][child])
              const indeterminate = checkedChildren.length > 0 && checkedChildren.length < children.length

              return (
                <div key={parent}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          values[parent].isAdd &&
                          values[parent].isEdit &&
                          values[parent].isView &&
                          values[parent].isDelete
                        }
                        indeterminate={indeterminate}
                        onChange={e => handleSelectAll(parent, setFieldValue, values[parent])}
                        ref={el => (parentRefs.current[parent] = el)}
                      />
                    }
                    label={capitalize(parent)}
                  />
                  <br />
                  {children.map(child => (
                    <FormControlLabel
                      key={child}
                      control={
                        <Checkbox
                          checked={values[parent][child]}
                          onChange={() => setFieldValue(`${parent}.${child}`, !values[parent][child])}
                        />
                      }
                      label={child}
                    />
                  ))}
                </div>
              )
            })}
            <Button type='submit'>Submit</Button>
          </Form>
        )}
      </Formik>

      <Grid item xs={12} sm={6}>
        <div className='status-container' style={{ display: 'flex', alignItems: 'center' }}>
          <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
          <RadioGroup
            aria-label='isActive'
            name='isActive'
            value={
              formik.values.isActive == 'true'
                ? (formik.values.isActive = true)
                : formik.values.isActive == 'false'
                ? (formik.values.isActive = false)
                : null
            }
            row
            onChange={e => {
              formik.setFieldValue('isActive', e.target.value)
            }}
          >
            <FormControlLabel
              value={'true'}
              checked={formik.values.isActive === true}
              control={<Radio color='primary' />}
              label='Active'
              labelPlacement='end'
            />
            <FormControlLabel
              value={'false'}
              checked={formik.values.isActive === false}
              control={<Radio color='primary' />}
              label='InActive'
              labelPlacement='end'
            />
          </RadioGroup>
        </div>
        {formik.errors.isActive && formik.touched.isActive ? (
          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
            {formik.errors.isActive}
          </FormHelperText>
        ) : null}
      </Grid>
    </>
  )
}

export default App
