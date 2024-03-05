/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
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
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Third Party Components
import axios from 'axios'
// import TableHeader from './TableHeader'
import { useRouter } from 'next/router'
import { Button, Modal, Tooltip, tooltipClasses } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { DeleteSupportSubject } from 'src/store/slices/AdminSlice'
import {
  DeleteQuestionBank,
  DeleteQuiz,
  getAllQuestionBank,
  GetAllQuiz,
  GetSubjectByQuestions
} from 'src/store/slices/QuizSlice'
import { getAllSubject, getAllSubjectdropdown } from 'src/store/slices/LearningSlice'
import Toast from 'src/pages/Common/Toast'
import DeleteModal from 'src/pages/Common/DeleteModal'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

const userStatusObj = {
  true: 'success',
  pending: 'warning',
  false: 'secondary'
}

const RowOptions = ({ id, subjectId }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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

  // ** function to handle delete quiz
  const handleDelete = () => {
    dispatch(DeleteQuiz(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
        dispatch(GetAllQuiz())
      } else {
        Toast({ response: res, error: true })
      }
    })
    handleRowOptionsClose()
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
            localStorage.setItem('id', id)
            router.replace({
              pathname: '/QuizManager/Quiz/ViewQuiz'
            })
          }}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.setItem('id', id)
            router.replace({
              pathname: '/QuizManager/Quiz/EditQuiz'
            })
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpen} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>

      <DeleteModal name='Quiz' open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  )
}

const UserList = ({ store }) => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [showAllItems, setShowAllItems] = useState(false)
  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const AllSubject = useSelector(state => state.LearningSlice.getAllSubjectdropdown)

  useEffect(() => {
    dispatch(getAllSubjectdropdown())
  }, [dispatch])

  function filterColumns(allSupportRequest, value) {
    if (!allSupportRequest) return []
    return allSupportRequest.filter(column => {
      return (column?.QuizName ?? '').toLowerCase().includes(value)
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

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
      field: 'QuizName',
      headerName: 'Quiz Name',
      renderCell: ({ row }) => {
        return <Typography variant='header'>{row?.QuizName}</Typography>
      }
    },

    // {
    //   flex: 0.15,
    //   field: 'Subject',
    //   minWidth: 150,
    //   headerName: 'Subject',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {row?.Score}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.15,
      field: 'Description',
      minWidth: 350,
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Box>
            <BootstrapTooltip title={row?.Description} followCursor arrow>
              {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
              <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row?.Description}</Typography>
            </BootstrapTooltip>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'SubjectName',
      minWidth: 120,
      headerName: 'Subject',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.SubjectName}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.08,
      field: 'Score',
      minWidth: 50,
      headerName: 'Score',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row?.Score}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.08,
      minWidth: 110,
      field: 'Status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row?.Status === true ? 'Active' : 'InActive'}
            color={userStatusObj[row?.Status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row._id} subjectId={row?.SubjectId} />
    }
  ]

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <Card>
              <CardHeader title='Quiz' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
                AllSubject={AllSubject}
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
          )}
        </Grid>
      </Grid>
    </>
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
