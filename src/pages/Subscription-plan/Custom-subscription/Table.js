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
import { Button, CircularProgress, Modal, Switch, Tooltip, tooltipClasses } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { DeleteShortCategory, GetAllShortCat } from 'src/store/slices/ShortsSlice'
import {
  AllCustomSubscription,
  DeleteSubscription,
  GetAllSubscription,
  UpdateCustomSubscriptionByAdmin
} from 'src/store/slices/LearningSlice'
import moment from 'moment'
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

  // ** function to handle delete subscriptions
  const handleDelete = () => {
    dispatch(DeleteSubscription(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
        dispatch(GetAllSubscription())
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
              pathname: '/Subscription-plan/Subscriptions/ViewSubscription'
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
              pathname: '/Subscription-plan/Subscriptions/EditSubscription'
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
              Are you sure you want to delete this Subscription?
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
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const dispatch = useDispatch()

  const store = useSelector(state => state.LearningSlice.AllCustomSubscription)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  const handleToggle = (e, row) => {
    // Call API when button is toggled
    dispatch(UpdateCustomSubscriptionByAdmin({ _id: row._id, isActive: e.target.checked })).then(() => {
      dispatch(AllCustomSubscription())
    })
  }

  // ** Hooks

  function filterColumns(store, value) {
    if (!store) return []
    return store.filter(column => {
      return (
        (column?.SubscriptionTitle ?? '').toLowerCase().includes(value) ||
        (column?.Email ?? '').toLowerCase().includes(value) ||
        (column?.UserName ?? '').toLowerCase().includes(value)
      )
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  useEffect(() => {
    dispatch(AllCustomSubscription())
  }, [])

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
      minWidth: 150,
      field: 'UserName',
      headerName: 'User Name',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip title={row?.UserName} followCursor arrow>
            <Typography noWrap variant='header'>
              {row.UserName}
            </Typography>
          </BootstrapTooltip>
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
          <BootstrapTooltip title={row?.SubscriptionTitle} followCursor arrow>
            <Typography noWrap variant='header'>
              {row.Email}
            </Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 165,
      field: 'SubscriptionTitle',
      headerName: 'Subscription Title',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip title={row?.SubscriptionTitle} followCursor arrow>
            <Typography noWrap variant='header'>
              {row.SubscriptionTitle}
            </Typography>
          </BootstrapTooltip>
        )
      }
    },

    // {
    //   flex: 0.15,
    //   field: 'SubscriptionDetail',
    //   minWidth: 120,
    //   headerName: 'Subscription Detail',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         <BootstrapTooltip
    //           title={<div contentEditable='true' dangerouslySetInnerHTML={{ __html: row?.SubscriptionDetail }}></div>}
    //           followCursor
    //           arrow
    //         >
    //           <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //             <div contentEditable='true' dangerouslySetInnerHTML={{ __html: row?.SubscriptionDetail }}></div>
    //           </Typography>
    //         </BootstrapTooltip>
    //       </Box>
    //     )
    //   }
    // },

    {
      flex: 0.15,
      field: 'Amount',
      minWidth: 80,
      headerName: 'Amount',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              ₹ {row.Amount}
            </Typography>
          </Box>
        )
      }
    },

    {
      flex: 0.15,
      field: 'Duration',
      minWidth: 80,
      headerName: 'Duration',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.Duration}
            </Typography>
          </Box>
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
              {moment(row?.EndDate).format('DD/MM/YYYY')}
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
      renderCell: ({ row }) => <Switch checked={row.isActive} onChange={e => handleToggle(e, row)} />
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
          <Card>
            <CardHeader
              title='Custom Subscription'
              sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
            />
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
            {isLoading === true ? (
              <FallbackSpinner />
            ) : (
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
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default UserList
