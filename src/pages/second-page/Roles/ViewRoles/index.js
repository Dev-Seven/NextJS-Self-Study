/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
/* eslint-disable react-hooks/exhaustive-deps */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 09-03-2023             ADDED ALL PERMISSION CHECKBOX                    ADITYA
// 1002                  10-03-2023                                                              ADITYA
/* eslint-disable lines-around-comment */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  FormHelperText,
  Divider,
  FormControl
} from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createRoles, editRoles, getAdminRolesById } from 'src/store/slices/AdminSlice'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
// import FallbackSpinner from 'src/@core/components/spinner'
import Link from 'next/link'
import { Form, Formik, useFormik } from 'formik'
import { roleSchema } from 'src/schemas'
import Toast from 'src/pages/Common/Toast'
import dynamic from 'next/dynamic'

// const Toast = dynamic(() => import('src/pages/Common/Toast'))
const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))

// ** Formik initialValues to handle checkboxes
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
  subjectPrice: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    subjectPrice: false
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
  customSubscription: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    customSubscription: false
  },
  quizCategory: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    quizCategory: false
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
  // emailsListing: {
  //   isAdd: false,
  //   isEdit: false,
  //   isView: false,
  //   isDelete: false,
  //   emailsListing: false
  // },
  payment: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    payment: false
  },
  appSetting: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    appSetting: false
  },
  shortsCategory: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    shortsCategory: false
  },
  shorts: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    shorts: false
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
  },
  topicTag: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    topicTag: false
  },
  mapImage: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    mapImage: false
  },
  company: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    company: false
  },
  serviceTax: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    serviceTax: false
  },
  state: {
    isAdd: false,
    isEdit: false,
    isView: false,
    isDelete: false,
    state: false
  }
}

const AddRoles = () => {
  const parentRefs = useRef({})
  const [selectAll, setSelectAll] = useState(false)
  const [data, setData] = useState(initialValues)
  const [roleError, setRoleError] = useState('')
  const [permissionError, setPermissionError] = useState('')
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  const dispatch = useDispatch()
  const router = useRouter()
  // const params = router.query.AddRoles
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]
  // const { id } = router.query
  const id = localStorage.getItem('id')
  // const { id, view } = router.query

  // ** useEffect to handle form filling while edit
  useEffect(() => {
    if (id) {
      dispatch(getAdminRolesById(id)).then(res => {
        const { Permission, RoleName, isActive } = res?.payload?.data
        formik.setFieldValue('RoleName', RoleName)
        formik.setFieldValue('isActive', isActive)
        setData({
          role: Permission.role,
          topic: Permission?.topic,
          topicTag: Permission?.topicTag,
          dashboard: Permission?.dashboard,
          adminUser: Permission?.adminUser,
          user: Permission?.user,
          subject: Permission?.subject,
          subjectPrice: Permission?.subjectPrice,
          category: Permission?.category,
          map: Permission?.map,
          coupon: Permission?.coupon,
          subscription: Permission?.subscription,
          customSubscription: Permission?.customSubscription,
          quiz: Permission?.quiz,
          quizCategory: Permission?.quizCategory,
          notification: Permission?.notification,
          // emailsListing: Permission?.emailsListing,
          payment: Permission?.payment,
          appSetting: Permission?.appSetting,
          shorts: Permission?.shorts,
          shortsCategory: Permission?.shortsCategory,
          importantDates: Permission?.importantDates,
          importantDateCategory: Permission?.importantDateCategory,
          supportSubject: Permission?.supportSubject,
          supportRequest: Permission?.supportRequest,
          mapImage: Permission?.mapImage,
          state: Permission?.state,
          serviceTax: Permission?.serviceTax,
          company: Permission?.company
        })
      })
    }
  }, [dispatch, id])

  // ** array of all the modules
  const parents = [
    'dashboard',
    'adminUser',
    'role',
    'user',
    'subject',
    'subjectPrice',
    'category',
    'map',
    'topicTag',
    'topic',
    'coupon',
    'subscription',
    'customSubscription',
    'quizCategory',
    'quiz',
    'notification',
    // 'emailsListing',
    'payment',
    'appSetting',
    'shortsCategory',
    'shorts',
    'importantDates',
    'importantDateCategory',
    'supportSubject',
    'supportRequest',
    'mapImage',
    'state',
    'serviceTax',
    'company'
  ]

  const children = ['isAdd', 'isEdit', 'isView', 'isDelete'] //** children of all modules

  // **function to handle select all children when parent clicked
  const handleSelectAll = (e, parent, setFieldValue, value) => {
    const newParentState = { ...value }

    children.forEach(child => {
      newParentState[child] = e.target.checked

      // newParentState[parent] = false
    })
    newParentState[parent] = !newParentState[parent]
    setFieldValue(parent, newParentState)

    const checkedChildren = children.filter(child => newParentState[child])
    const indeterminate = checkedChildren.length > 0 && checkedChildren.length < children.length
    parentRefs.current[parent].indeterminate = indeterminate

    const allParentsSelected = parents.every(parent => {
      const allChildrenSelected = children.every(child => {
        value[child] === true
      })

      return allChildrenSelected
    })
    setSelectAll(allParentsSelected)
  }

  // **function to handle form submission
  const handleSubmit = async values => {
    let tempObj = {
      Permission: {
        ...values
      }
    }

    function checkPermissions(permission) {
      const values = Object.values(permission)
      return values.some(obj => Object.values(obj).some(value => value === true))
    }

    const result = checkPermissions(tempObj.Permission)
    const action = id
      ? editRoles(Object.assign(tempObj, formik.values, { _id: id }))
      : createRoles(Object.assign(tempObj, formik.values))

    result
      ? dispatch(action).then(res => {
          if (res.payload.status === 200) {
            if (id) {
              Toast({ response: res, update: true }) // toast the success message
            } else {
              Toast({ response: res }) // toast the success message
            }
            router.push('/second-page/Roles')
          } else {
            Toast({ response: res, error: true }) // toast the error message
          }
        })
      : setPermissionError('Permission is required')

    // if (id) {
    //   var response = dispatch(editRoles(Object.assign(tempObj, formik.values, { _id: id }))).then(res => {
    //     if (res?.payload?.status === 200) {
    //       toast.success(res?.payload?.message, {
    //         style: {
    //           padding: '16px',
    //           color: theme.palette.primary.main,
    //           border: `1px solid ${theme.palette.primary.main}`
    //         },
    //         iconTheme: {
    //           primary: theme.palette.primary.main,
    //           secondary: theme.palette.primary.contrastText
    //         }
    //       })
    //     } else {
    //       toast.error(res?.payload?.message, {
    //         style: {
    //           padding: '16px',
    //           color: theme.palette.primary.main,
    //           border: `1px solid ${theme.palette.primary.main}`
    //         },
    //         iconTheme: {
    //           primary: theme.palette.primary.main,
    //           secondary: theme.palette.primary.contrastText
    //         }
    //       })
    //     }
    //   })
    // } else {
    //   var response = dispatch(createRoles(Object.assign(tempObj, formik.values))).then(res => {
    //     if (res?.payload?.status === 200) {
    //       toast.success(res?.payload?.message, {
    //         style: {
    //           padding: '16px',
    //           color: theme.palette.primary.main,
    //           border: `1px solid ${theme.palette.primary.main}`
    //         },
    //         iconTheme: {
    //           primary: theme.palette.primary.main,
    //           secondary: theme.palette.primary.contrastText
    //         }
    //       })
    //     } else {
    //       toast.error(res?.payload?.message, {
    //         style: {
    //           padding: '16px',
    //           color: theme.palette.primary.main,
    //           border: `1px solid ${theme.palette.primary.main}`
    //         },
    //         iconTheme: {
    //           primary: theme.palette.primary.main,
    //           secondary: theme.palette.primary.contrastText
    //         }
    //       })
    //     }
    //   })
    // }
    // if (response) {
    //   router.push('/second-page/Roles')
    // }
  }

  // **formik for roleName and status
  const initialValues1 = {
    RoleName: '',
    isActive: true
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues1,
    validationSchema: roleSchema,
    onSubmit: values => {}
  })

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

  useEffect(() => {
    setRoleError('')
  }, [formik.values.RoleName])

  return (
    //1001 START

    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader
              title={params == 'EditRoles' ? 'Edit Role' : params == 'ViewRoles' ? 'View Role' : 'Add Role'}
            />
            <Divider />
            <CardContent>
              <Grid container className='role-sec'>
                <Grid xs={6} item className='textField-container'>
                  <FormControl fullWidth>
                    <TextField
                      type='text'
                      fullWidth
                      name='RoleName'
                      id='role'
                      label='Role'
                      placeholder='Role'
                      value={formik.values.RoleName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputProps={{ readOnly: params == 'ViewRoles' ? true : false }}
                    />
                    {formik.errors.RoleName && formik.touched.RoleName ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.RoleName}
                      </FormHelperText>
                    ) : roleError ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {roleError}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid xs={6} item className='status-container'>
                  <Grid item xs={12}>
                    <div className='status-container' style={{ paddingLeft: '17px' }}>
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
                          params == 'ViewRoles' ? null : formik.setFieldValue('isActive', e.target.value)
                        }}
                      >
                        <FormControlLabel
                          value={'true'}
                          checked={formik.values.isActive === true}
                          control={<Radio color='primary' />}
                          label='Active'
                          labelPlacement='end'
                          // disabled={params == 'ViewRoles' ? true : false}
                        />
                        <FormControlLabel
                          value={'false'}
                          checked={formik.values.isActive === false}
                          control={<Radio color='primary' />}
                          label='InActive'
                          labelPlacement='end'
                          // disabled={params == 'ViewRoles' ? true : false}
                        />
                      </RadioGroup>
                    </div>
                    {formik.errors.isActive && formik.touched.isActive ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.isActive}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
              <div className='main-container'>
                <div className='checkbox-cotnainer'>
                  <h4 style={{ margin: '0px' }}>Permission</h4>
                  {params == 'EditRoles' ? (
                    <h6 style={{ color: 'red', margin: '5px 0px 10px 0px' }}>
                      Editing permissions will logout all the login users. They might loose the un saved data.{' '}
                    </h6>
                  ) : (
                    ''
                  )}
                  <Formik
                    enableReinitialize={true}
                    // validationSchema={roleSchema}
                    initialValues={{
                      ...data,
                      globalSelectAll: false
                    }}
                    onSubmit={values => {
                      // console.log('validaiton', values)
                      if (formik.values.RoleName === '') {
                        setRoleError('RoleName is Required')
                      } else {
                        handleSubmit(values)
                      }
                    }}
                    errors={formik.errors}
                  >
                    {({ values, setFieldValue, handleSubmit }) => (
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

                        {parents.map((parent, index) => {
                          {
                            /* console.log('index', index) */
                          }
                          const checkedChildren = children.filter(child => values[parent][child])
                          const indeterminate = checkedChildren.length > 0 && checkedChildren.length !== children.length

                          function getCount() {
                            for (var i = 1; i <= index; i++) {}
                            return i
                          }
                          return (
                            <div className='permission-sec' key={parent}>
                              <h3 style={{ marginRight: '10px' }}>{getCount()}.</h3>
                              <FormControlLabel
                                className='permission-name'
                                control={
                                  <Checkbox
                                    // disabled={params == 'ViewRoles' ? true : false}
                                    checked={
                                      values[parent].isAdd &&
                                      values[parent].isEdit &&
                                      values[parent].isView &&
                                      values[parent].isDelete
                                    }
                                    InputProps={{ readOnly: params == 'ViewRoles' ? true : false }}
                                    indeterminate={indeterminate}
                                    onChange={e => {
                                      params == 'ViewRoles'
                                        ? null
                                        : handleSelectAll(e, parent, setFieldValue, values[parent])
                                    }}
                                    ref={el => (parentRefs.current[parent] = el)}
                                  />
                                }
                                label={capitalize(parent)}
                              />
                              <br />
                              <div style={{ marginLeft: '1rem', marginTop: '0.9rem' }}>
                                {children.map(child => (
                                  <FormControlLabel
                                    className='update-data'
                                    name={child}
                                    key={child}
                                    control={
                                      <Checkbox
                                        // disabled={params == 'ViewRoles' ? true : false}
                                        checked={values[parent][child]}
                                        onChange={() => {
                                          params == 'ViewRoles'
                                            ? null
                                            : setFieldValue(`${parent}.${child}`, !values[parent][child])

                                          const allChildrenUnchecked = Object.values(values[parent]).every(
                                            v => v === false
                                          )
                                          const anyChildrenChecked = Object.values(values[parent]).some(v => v === true)
                                          if (anyChildrenChecked) {
                                            setFieldValue(`${parent}.${parent}`, true)
                                          } else if (allChildrenUnchecked === true) {
                                            setFieldValue(`${parent}.${parent}`, false)
                                          } else if (anyChildrenChecked) {
                                            setFieldValue(`${parent}.${parent}`, true)
                                          }
                                        }}
                                      />
                                    }
                                    label={child.slice(2)}
                                  />
                                ))}
                              </div>
                            </div>
                          )
                        })}
                        {permissionError ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {permissionError}
                          </FormHelperText>
                        ) : null}
                        <br />
                        {params == 'ViewRoles' ? (
                          <Grid item sm={12}>
                            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                              <Link prefetch={false} href='/second-page/Roles/' style={{ textDecoration: 'none' }}>
                                <Button size='large' variant='contained' style={{ marginRight: '10px' }}>
                                  Cancel
                                </Button>
                              </Link>
                            </div>
                          </Grid>
                        ) : (
                          <Grid item sm={12}>
                            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                              {!id ? (
                                <Button
                                  size='large'
                                  onClick={handleSubmit}
                                  variant='contained'
                                  style={{ marginRight: '10px' }}
                                >
                                  Save
                                </Button>
                              ) : (
                                <Button
                                  size='large'
                                  onClick={handleSubmit}
                                  variant='contained'
                                  style={{ marginRight: '10px' }}
                                >
                                  Update
                                </Button>
                              )}
                              <Link prefetch={false} href='/second-page/Roles/' style={{ textDecoration: 'none' }}>
                                <Button size='large' variant='contained'>
                                  Cancel
                                </Button>
                              </Link>
                            </div>
                          </Grid>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>

    //1001 END
  )
}

export default AddRoles
