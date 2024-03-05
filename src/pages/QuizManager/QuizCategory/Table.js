/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
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

// ** Third Party Components
import axios from 'axios'
// import TableHeader from './TableHeader'
import { useRouter } from 'next/router'
import { Button, Modal } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { DeleteShortCategory, GetAllShortCat } from 'src/store/slices/ShortsSlice'
import { DeleteQuizCategory, GetAllQuizCategory } from 'src/store/slices/QuizSlice'
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

// ** function to handle row options in the table
const RowOptions = ({ id }) => {
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

  // ** function to handle delete quiz category
  const handleDelete = () => {
    dispatch(DeleteQuizCategory(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
        dispatch(GetAllQuizCategory())
      } else {
        Toast({ response: res, error: true })
      }
    })
    handleRowOptionsClose()
  }

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
              pathname: '/QuizManager/quizCategory/ViewQuizCategory'
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
              pathname: '/QuizManager/quizCategory/EditQuizCategory'
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

      <div>
        <DeleteModal name='Quiz Category' open={open} handleClose={handleClose} handleDelete={handleDelete} />
      </div>
    </>
  )
}

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()

  const store = useSelector(state => state.QuizSlice.allQuizcategory)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // ** function to handle table filter
  function filterColumns(store, value) {
    if (!store) return []
    return store.filter(column => {
      return (
        (column?.QuizCategoryName ?? '').toLowerCase().includes(value) ||
        (column?.SubjectName ?? '').toLowerCase().includes(value)
      )
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  useEffect(() => {
    dispatch(GetAllQuizCategory())
  }, [])

  // ** To render columns in the table
  const columns = [
    {
      flex: 0.2,
      minWidth: 250,
      field: 'QuizCategoryName',
      headerName: 'Quiz Category',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='header'>
            {row.QuizCategoryName}
          </Typography>
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
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.SubjectName}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'Status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        // console.log('status', row?.Status)
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.Status == 'true' ? 'Active' : 'InActive'}
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
      renderCell: ({ row }) => <RowOptions id={row._id} />
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
              <CardHeader title='Quiz Category' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
