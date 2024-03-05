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
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Third Party Components
import axios from 'axios'
import { DeleteUserByAdmin, GetAllAppUser, ResetDeviceLoginCount } from 'src/store/slices/LearningSlice'
// import TableHeader from './TableHeader'
import { Button, Modal, Tooltip, tooltipClasses } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { useRouter } from 'next/router'
import moment from 'moment'
import { img_url } from 'src/common/Service'
import { styled } from '@mui/material/styles'
import Toast from 'src/pages/Common/Toast'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

// ** To show status colors
const userStatusObj = {
  true: 'success',
  pending: 'warning',
  false: 'secondary'
}

// ** renders client column
const renderClient = row => {
  if (row.ProfileImage) {
    return <CustomAvatar src={`${img_url}${row.ProfileImage}`} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        style={{ textTransform: 'uppercase' }}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.FirstName && row.LastName ? `${row.FirstName} ${row.LastName}` : 'S S')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [open1, setOpen1] = useState(false)
  const handleOpen1 = () => setOpen1(true)
  const handleClose1 = () => setOpen1(false)
  const router = useRouter()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  // ** function to handle delete app users
  const handleDelete = async () => {
    const res = await dispatch(DeleteUserByAdmin(id))
    const status = res?.payload?.status

    if (res?.payload?.status === 200) {
      Toast({ response: res, remove: true }) // Toast successful delete message
    } else {
      Toast({ response: res, error: true }) // Toast error message
    }

    handleRowOptionsClose()

    if (status === 200) {
      dispatch(GetAllAppUser())
    }
  }

  const handleReset = async () => {
    const res = await dispatch(ResetDeviceLoginCount(id))
    const status = res?.payload?.status

    if (res?.payload?.status === 200) {
      Toast({ response: res, update: true }) // Toast successful delete message
    } else {
      Toast({ response: res, error: true }) // Toast error message
    }

    handleRowOptionsClose()

    if (status === 200) {
      dispatch(GetAllAppUser())
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
            localStorage.setItem('AppUser', id)
            router.replace({
              pathname: '/Learning/AppUser/ViewUser/'
            })
          }}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.setItem('AppUser', id)
            router.replace({
              pathname: '/Learning/AppUser/EditUser/'
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
        <MenuItem onClick={handleOpen1} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='ic:round-lock-reset' fontSize={20} />
          Reset Login
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
              Are you sure you want to delete this User?
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
      <div>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Are you sure you want to Reset Login this User?
            </Typography>
            <Box style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant='contained' onClick={handleReset} sx={{ mr: 3 }}>
                Reset
              </Button>
              <Button variant='contained' onClick={handleClose1}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  )
}

const AppUsers = () => {
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.LearningSlice.allUsers)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  useEffect(() => {
    dispatch(GetAllAppUser())
  }, [dispatch])

  // ** function to handle filter in the table
  function filterColumns(store, value) {
    if (!store) return []

    const regex = new RegExp(value, 'i')

    return store.filter(({ UserName, Email }) => {
      return regex.test(UserName) || regex.test(Email)
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  // ** function to handle tooltip on hover in table
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

  // ** to render all the columns in the table
  const columns = [
    {
      flex: 0.2,
      minWidth: 180,
      field: 'UserName',
      headerName: 'User',
      renderCell: ({ row }) => {
        const { UserName } = row
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography noWrap variant='heading'>
                {`${UserName}`}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'Email',
      headerName: 'Email',
      renderCell: ({ row }) => {
        return (
          <Box>
            <BootstrapTooltip title={row?.Email} followCursor arrow>
              <Typography noWrap variant='body2'>
                {row.Email}
              </Typography>
            </BootstrapTooltip>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'createdAt',
      minWidth: 120,
      headerName: 'created Date',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {moment(row?.createdAt).format('DD/MM/YYYY')}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'startDate',
      minWidth: 160,
      // wordBreak: breakAll,
      headerName: 'Subscription Start',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.startDate ? moment(row?.startDate).format('DD/MM/YYYY') : null}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'endDate',
      minWidth: 150,
      headerName: 'Subscription End',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.endDate ? moment(row?.endDate).format('DD/MM/YYYY') : null}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'loginCount',
      minWidth: 110,
      headerName: 'Login Count',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.loginCount}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'AdminStatus',
      headerName: 'Admin Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row?.AdminStatus === true ? 'Active' : 'InActive'}
            color={userStatusObj[row?.AdminStatus]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    // {
    //   flex: 0.2,
    //   minWidth: 100,
    //   field: 'Subscriber',
    //   headerName: 'Subscriber',
    //   renderCell: ({ row }) => {
    //     return (
    //       <CustomChip
    //         skin='dark'
    //         size='small'
    //         label={row?.isSubscriber === true ? 'Yes' : 'No'}
    //         color={userStatusObj[row?.isSubscriber]}
    //         sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
    //       />
    //     )
    //   }
    // },
    {
      flex: 0.2,
      minWidth: 80,
      field: 'isVerified',
      headerName: 'Verified',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row?.isVerified === true ? 'Yes' : 'No'}
            color={userStatusObj[row?.isVerified]}
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
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontal.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} icon={<Icon icon={item.icon} />} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid> */}
      <Grid item xs={12}>
        {isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <Card>
            <CardHeader title='Application User' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <CardContent>
              <Grid container spacing={6}></Grid>
            </CardContent>
            <Divider />

            {/* <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} /> */}
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
        )}
      </Grid>

      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
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

export default AppUsers
