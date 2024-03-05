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
import { img_url } from 'src/common/Service'
import { Button, Modal, Tooltip, tooltipClasses } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { DeleteSubscription, GetAllSubscription } from 'src/store/slices/LearningSlice'
import {
  deleteSupportRequest,
  DeleteSupportSubject,
  getAllSupportRequest,
  GetAllSupportSubject
} from 'src/store/slices/AdminSlice'
import moment from 'moment'
import Toast from 'src/pages/Common/Toast'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

const userStatusObj = {
  resolved: 'success',
  Hold: 'warning',
  progress: 'secondary',
  open: 'primary',
  close: 'info'
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

  const handleDelete = () => {
    dispatch(deleteSupportRequest(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
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
      //   dispatch(getAllSupportRequest())
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
              pathname: '/Support/SupportRequest/ViewRequest'
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
              pathname: '/Support/SupportRequest/EditRequest'
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
              Are you sure you want to delete this Support Request?
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

const UserList = ({ store }) => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  function filterColumns(allSupportRequest, value) {
    if (!allSupportRequest) return []
    return allSupportRequest.filter(column => {
      return (
        (column?.UserName ?? '').toLowerCase().includes(value) ||
        (column?.Email ?? '').toLowerCase().includes(value) ||
        (column?.Status ?? '').toLowerCase().includes(value) ||
        column?.MobileNo.includes(value)
      )
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
      minWidth: 120,
      field: 'UserName',
      headerName: 'User Name',
      renderCell: ({ row }) => {
        const { UserName } = row

        return (
          // <Box sx={{ display: 'flex', alignItems: 'center' }}>
          //   <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
          <Typography variant='heading'>{UserName}</Typography>
          //   </Box>
          // </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'SupportSubjectName',
      headerName: 'Subject',
      renderCell: ({ row }) => {
        const { UserName } = row

        return <Typography variant='heading'>{row.SupportSubjectName}</Typography>
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'Email',
      headerName: 'Email',
      renderCell: ({ row }) => {
        return <Typography variant='body2'>{row?.Email}</Typography>
      }
    },
    {
      flex: 0.15,
      field: 'MobileNo',
      minWidth: 150,
      headerName: 'Mobile Number',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography sx={{ color: 'text.secondary' }}>{row?.MobileNo}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'createdAt',
      minWidth: 110,
      headerName: 'createdAt',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography sx={{ color: 'text.secondary' }}>{moment(row?.createdAt).format('DD/MM/YYYY')}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'Message',
      minWidth: 150,
      wrapText: true,
      headerName: 'Message',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            {/* <BootstrapTooltip title={row?.Message} followCursor arrow> */}
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row?.Message}</Typography>
            {/* </BootstrapTooltip> */}
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'Status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row?.Status}
            color={
              row?.Status == 'In progress'
                ? userStatusObj['progress']
                : row?.Status == 'Resolved'
                ? userStatusObj['resolved']
                : row?.Status == 'On Hold'
                ? userStatusObj['Hold']
                : row?.Status == 'Open'
                ? userStatusObj['open']
                : userStatusObj['close']
            }
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
              <CardHeader
                title='Support Request'
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
              <DataGrid
                getRowHeight={() => 'auto'}
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
