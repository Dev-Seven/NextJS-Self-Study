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
import { Button, Checkbox } from '@mui/material'
import { updateFormData } from 'src/store/slices/TopicSlice'
import { GetAllMap, getMapBySubject, setMapTopics } from 'src/store/slices/LearningSlice'
import { check } from 'prettier'
import { Field, useFormikContext } from 'formik'
// import FallbackSpinner from 'src/@core/components/spinner'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

const UserList = ({ apiData, topicById }) => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [checked, setChecked] = useState()
  const [response, setResponse] = useState('')

  // ** Hooks
  const dispatch = useDispatch()
  const router = useRouter()
  // const { id, _id, view } = router.query

  const id = localStorage.getItem('SubjectId')
  const _id = localStorage.getItem('id')
  const params = router.query.AddTopic

  const store = useSelector(state => state?.LearningSlice?.mapBySubject)
  const isLoading = useSelector(state => state?.LayoutSlice.isLoading)

  const rows = useMemo(
    () =>
      store?.filter(column => {
        return column?.MapTitle?.toLowerCase().includes(value)
      }),
    [store, value]
  )

  useMemo(() => {
    if (id || !_id) {
      dispatch(getMapBySubject({ SubjectId: id }))
    } else if (!id || _id) {
      dispatch(getMapBySubject({ SubjectId: topicById?.SubjectId }))
    }
  }, [dispatch, id, _id])

  // function addDataToArray(data, array, setArray) {
  //   // create a new array with the existing data and the new data
  //   const newArray = [...array, data]
  //   // set the state of the array to the new array
  //   setArray(newArray)
  // }

  // function deleteDataFromArray(data, array, setArray) {

  //   const index = array.indexOf(data)
  //   if (index >= 0) {
  //     const newArray = [...array]
  //     newArray.splice(index, 1)
  //     setArray(newArray)
  //   }
  // }

  // const handleChangeCheckbox = e => {
  //   let { name, value, checked } = e.target
  //   if (checked === false) {
  //     deleteDataFromArray(value, response, setResponse)
  //   } else {
  //     addDataToArray(value, response, setResponse)
  //   }
  // }

  // const handleSubmit = () => {
  //   dispatch(updateFormData({ step: 'step7', data: response }))
  // }

  const { values, submitForm, setFieldValue, handleBlur, handleChange, errors, touched } = useFormikContext()
  function Checkbox1(props) {
    return (
      <Field name={props.name}>
        {({ field, form }) => (
          <label>
            <Checkbox
              type='checkbox'
              disabled={params == 'ViewTopic'}
              {...props}
              checked={field.value.includes(props.value)}
              onChange={() => {
                if (field.value.includes(props.value)) {
                  const nextValue = field.value.filter(value => value !== props.value)
                  form.setFieldValue(props.name, nextValue)
                } else {
                  const nextValue = field.value.concat(props.value)
                  form.setFieldValue(props.name, nextValue)
                }
              }}
            />
          </label>
        )}
      </Field>
    )
  }

  useEffect(() => {
    if (values.MapId) {
      dispatch(setMapTopics(values.MapId))
    }
  }, [values?.MapId])

  const columns = [
    {
      flex: 0.2,
      minWidth: 210,
      field: 'UserName',
      headerName: 'Maps',
      renderCell: ({ row }) => {
        const { MapTitle } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              {/* <StyledLink>@{UserName}</StyledLink> */}
              <Typography noWrap variant='heading'>
                {`${MapTitle}`}
              </Typography>
            </Box>
          </Box>
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
        const { _id } = row

        store.filter(item => {
          topicById?.MapId.filter(map => {
            if (item?._id === map) {
              setChecked(true)
            }
          })
        })

        return <Checkbox1 value={_id} name='MapId' />
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
          <CardHeader title='Maps' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
      {/* <Button onClick={handleSubmit()}>Submit</Button> */}
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

export default UserList

// 1001 END
