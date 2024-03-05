/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useCallback, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import axios from 'axios'
// import TableHeader from './TableHeader'
import { useRouter } from 'next/router'
import { Button, IconButton, Menu, MenuItem, Modal } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { DeleteSubjectPrice, GetAllSubjectPrice } from 'src/store/slices/LearningSlice'
import moment from 'moment'
import Toast from 'src/pages/Common/Toast'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

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

  // ** function to handle delete subject price
  const handleDelete = async () => {
    const res = await dispatch(DeleteSubjectPrice(id))
    const status = res?.payload?.status
    if (res?.payload?.status === 200) {
      Toast({ response: res, remove: true })
    } else {
      Toast({ response: res, error: true })
    }

    // toast[status === 200 ? 'success' : 'error'](res?.payload?.message, {
    //   style: {
    //     padding: '16px',
    //     color: theme.palette.primary.main,
    //     border: `1px solid ${theme.palette.primary.main}`
    //   },
    //   iconTheme: {
    //     primary: theme.palette.primary.main,
    //     secondary: theme.palette.primary.contrastText
    //   }
    // })

    handleRowOptionsClose()

    if (status === 200) {
      dispatch(GetAllSubjectPrice())
    }
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
              pathname: '/Learning/subjectPrice/ViewSubjectPrice'
              // query: { id: id, view: true }
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
              pathname: '/Learning/subjectPrice/EditSubjectPrice'
              // query: { id: id }
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Are you sure you want to delete this Subject Price?
            </Typography>
            <Box style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant='contained' onClick={handleDelete} sx={{ mr: 3 }}>
                Delete
              </Button>
              <Button variant='contained' onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  )
}

const UserList = ({ store }) => {
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** To get loading status
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // ** function to handle filter columns
  function filterColumns(store, value) {
    if (!store) return []
    return store.filter(column => {
      return (column?.SubjectName ?? '').toLowerCase().includes(value)
    })
  }

  // ** useMemo to handle filterColumns and lowercase
  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  // ** To render columns
  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: 'SubjectName',
      headerName: 'Subject',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='header'>
            {row.SubjectName}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'Price',
      headerName: 'Price',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='header'>
            ₹ {row.Price}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'StartDate',
      minWidth: 120,
      headerName: 'Start Date',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {moment(row?.StartDate).format('DD/MM/YYYY')}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'EndDate',
      minWidth: 120,
      headerName: 'End Date',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.EndDate ? moment(row?.EndDate).format('DD/MM/YYYY') : '_'}
            </Typography>
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
        return <Box>{!row?.EndDate ? <RowOptions id={row._id} /> : null}</Box>
      }
    }
  ]

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title='Subject Price' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
              <CardContent>
                <Grid container spacing={6}></Grid>
              </CardContent>
              <Divider />

              <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
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
        </Grid>
      )}
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
