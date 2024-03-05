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
import { Button, CircularProgress, Modal } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { DeleteShortCategory, GetAllShortCat } from 'src/store/slices/ShortsSlice'
import Toast from 'src/pages/Common/Toast'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

// ** Vars
const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj = {
  true: 'success',
  pending: 'warning',
  false: 'secondary'
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
  return <img src={`${img_url}${row.BannerImage}`} alt='Category img' style={{ width: '100px' }} />
}

const RowOptions = ({ id, view }) => {
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

  // ** function to handle delete media category
  const handleDelete = () => {
    dispatch(DeleteShortCategory(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
        dispatch(GetAllShortCat())
      } else {
        Toast({ response: res, error: true })
      }
      // if (res.payload.status === 200) {
      //   toast.success(res?.payload?.message, {
      //     style: {
      //       padding: '16px',
      //       color: theme.palette.primary.main,
      //       border: `1px solid ${theme.palette.primary.main}`
      //     },
      //     iconTheme: {
      //       primary: theme.palette.primary.main,
      //       secondary: theme.palette.primary.contrastText
      //     }
      //   })
      //   dispatch(GetAllShortCat())
      // } else {
      //   toast.error(res?.payload?.message, {
      //     style: {
      //       padding: '16px',
      //       color: theme.palette.primary.main,
      //       border: `1px solid ${theme.palette.primary.main}`
      //     },
      //     iconTheme: {
      //       primary: theme.palette.primary.main,
      //       secondary: theme.palette.primary.contrastText
      //     }
      //   })
      // }
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
              pathname: '/Short/shortsTopic/ViewShortsTopic/'
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
              pathname: '/Short/shortsTopic/EditShortsTopic/'
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
              Are you sure you want to delete this Media Category?
            </Typography>
            {/*<Typography id='modal-modal-description' sx={{ mt: 2 }}>
Do you really want to delete User?
</Typography>*/}
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

const UserList = ({ apiData }) => {
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

  // ** Hooks
  const dispatch = useDispatch()

  const store = useSelector(state => state.ShortsSlice.allShortsCategory)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  function filterColumns(store, value) {
    if (!store) return []
    return store.filter(column => {
      return (
        (column?.ShortCategoryName ?? '').toLowerCase().includes(value) ||
        (column?.SubjectName ?? '').toLowerCase().includes(value)
      )
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  useEffect(() => {
    dispatch(GetAllShortCat())
  }, [])

  const columns = [
    // {
    //   flex: 0.15,
    //   field: 'BannerImage',
    //   minWidth: 80,
    //   headerName: 'Banner Image',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {/* {row.BannerImage} */}
    //           {row.BannerImage ? renderClient(row) : null}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'ShortCategoryName',
      headerName: 'Media Category',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='header'>
            {row.ShortCategoryName}
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
      renderCell: ({ row }) => <RowOptions id={row._id} />
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
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <Card>
              <CardHeader title='Media Category' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
