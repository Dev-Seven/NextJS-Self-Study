/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 07-03-2023              Login Table With Call api                       DHRUV

// 1001 START
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// ** Next Imports
import Link from 'next/link'

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
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import { Button, Modal, Tooltip, tooltipClasses } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import AdminSlice, { DeletedAdmin, fetchUsers, GetAllUser } from 'src/store/slices/AdminSlice'

// ** Third Party Components
import axios, { Axios } from 'axios'
// import TableHeader from './TableHeader'
import { useRouter } from 'next/router'
import { img_url } from 'src/common/Service'
import { Checkbox } from '@mui/material'
import { updateFormData } from 'src/store/slices/TopicSlice'
import { Field, useFormik, useFormikContext } from 'formik'
import { getAllRelatedTopic, setRelatedTopics } from 'src/store/slices/LearningSlice'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

// ** Custom Table Components Imports
// import TableHeader from 'src/views/apps/user/list/TableHeader'
// import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'

// ** Vars
const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
const renderClient = row => {
  if (row.ProfileImage) {
    return <CustomAvatar src={`${img_url}${row.ProfileImage}`} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.FirstName ? row.LastName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id, view }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const router = useRouter()

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(DeletedAdmin(id))
    handleRowOptionsClose()
    dispatch(GetAllUser())
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
          sx={{ '& svg': { mr: 2 } }}
          onClick={() => {
            router.replace({
              pathname: '/second-page/User/AddUser/',
              query: { id: id, view: true }
            })
          }}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.replace({
              pathname: '/second-page/User/AddUser/',
              query: { id: id }
            })
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const RelatedTopicList = ({ apiData, topicById }) => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [response, setResponse] = useState('')
  const [checkbox, setCheckbox] = useState()
  const [myArray, setMyArray] = useState([])
  const router = useRouter()
  // const { view } = router.query

  const id = localStorage.getItem('id')
  const _id = localStorage.getItem('_id')
  const params = router.query.AddTopic

  // ** Hooks
  const dispatch = useDispatch()

  const store = useSelector(state => state.LearningSlice?.allRelatedTopic)
  const DataBase = topicById?.RelatedTopics

  function matchObjectsById(array1, array2) {
    const matchedObjects = ''

    // Loop through the first array of objects
    array1.forEach(obj1 => {
      // Find the matching object in the second array by ID
      const obj2 = array2.find(obj => obj.id === obj1.id)

      // If a match is found, push the object to the matchedObjects array
      if (obj2) {
        return true
      }
    })

    return matchedObjects
  }

  // store.filter(item => {
  //   DataBase.filter(item1 => {
  //     if (item?._id === item1?._id) {
  //
  //     }
  //   })
  // })

  const rows = useMemo(
    () =>
      store?.filter(column => {
        return column?.TopicName?.toLowerCase().includes(value)
      }),
    [store, value]
  )

  const { values, submitForm, setFieldValue, handleBlur, handleChange, errors, touched } = useFormikContext()

  useEffect(() => {
    dispatch(getAllRelatedTopic())
  }, [dispatch])

  // function Checkbox1(props) {
  //   return (
  //     <Field name={props.name}>
  //       {({ field, form }) => (
  //         <label>
  //           <Checkbox
  //             type='checkbox'
  //             {...props}
  //             checked={field.value.includes(props?.value)}
  //             onChange={() => {
  //               if (field.value.includes(props.value)) {
  //                 const nextValue = field.value.filter(value => value !== props.value)
  //                 form.setFieldValue(props.name, nextValue)
  //               } else {
  //                 const nextValue = field.value.concat(props.value)
  //                 form.setFieldValue(props.name, nextValue)
  //               }
  //             }}
  //           />
  //         </label>
  //       )}
  //     </Field>
  //   )
  // }

  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: initialValues,
  //   onSubmit: values => {
  //     dispatch(updateFormData({ step: 'step2', data: values }))
  //   }
  // })

  // const handleSubmit = () => {
  //   dispatch(updateFormData({ step: 'step2', data: myArray }))
  // }

  function Checkbox1(props) {
    return (
      <Field name={props.name}>
        {({ field, form }) => (
          <label>
            {/* {console.log(field, form)} */}
            <Checkbox
              type='checkbox'
              disabled={params == 'ViewTopic'}
              {...props}
              checked={field?.value?.some(obj => obj._id === props.value._id)}
              onChange={() => {
                const checked = field.value.some(obj => obj._id === props.value._id)

                const nextValue = checked
                  ? // console.log('🚀  nextValue:', nextValue)
                    field.value.filter(obj => obj._id !== props.value._id)
                  : [...field.value, props.value]
                form.setFieldValue(props.name, nextValue)
                // console.log('🚀  props.name:', props.name)
              }}
            />
            {props.value.label}
            {/* {console.log('🚀  props.value.label:', props.value.label)} */}
          </label>
        )}
      </Field>
    )
  }

  // console.log('related topics', values)

  useEffect(() => {
    if (values.RelatedTopics) {
      // localStorage.setItem('related_topics', JSON.stringify(values.RelatedTopics))
      dispatch(setRelatedTopics(values.RelatedTopics))
    }
  }, [values?.RelatedTopics])

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
      flex: 0.2,
      minWidth: 250,
      field: 'TopicName',
      headerName: 'Related Topic',
      renderCell: ({ row }) => {
        const { TopicName } = row

        return (
          <BootstrapTooltip title={row?.TopicName} followCursor arrow>
            <Typography variant='body2'>{`${TopicName}`}</Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'CategoryName',
      headerName: 'Category Name',
      renderCell: ({ row }) => {
        const { CategoryName } = row

        return (
          <BootstrapTooltip title={row?.CategoryName} followCursor arrow>
            <Typography variant='body2'>{`${CategoryName}`}</Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 220,
      field: 'SubjectName',
      headerName: 'Subject Name',
      renderCell: ({ row }) => {
        const { SubjectName } = row

        return (
          <BootstrapTooltip title={row?.SubjectName} followCursor arrow>
            <Typography variant='body2'>{`${SubjectName}`}</Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => {
        return <Checkbox1 value={row} name='RelatedTopics' />
      }
    }
  ]

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Related Topic' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}></Grid>
          </CardContent>
          <Divider />

          <TableHeader
            value={value}
            plan={plan}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            handlePlanChange={handlePlanChange}
          />
          <DataGrid
            autoHeight
            getRowHeight={() => 'auto'}
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
        </Card>
      </Grid>
      {/* <Grid item sm={12}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button
            size='large'
            type='submit'
            // onClick={formik.handleSubmit}
            variant='contained'
            style={{ marginRight: '10px' }}
          >
            Next
          </Button>
          {/*<Button size='large' type='submit' variant='contained'>
                    Save
                </Button>*/}
      {/* </div>
      </Grid> */}
    </Grid>
  )
}

// export const getStaticProps = async () => {
//   const res = await axios.get('/cards/statistics')
//   const apiData = res.data

//   return {
//     props: {
//       apiData
//     }
//   }
// }

export default RelatedTopicList

// 1001 END
