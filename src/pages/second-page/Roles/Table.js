/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 07-03-2023                 Roles  Call api                                DHRUV

/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, useCallback, useRef } from 'react'

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
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Button, CircularProgress, Modal } from '@mui/material'
import Toast from 'src/pages/Common/Toast'
import { deleteRoles, GetAllRoles } from 'src/store/slices/AdminSlice'
// import TableHeader from './TableHeader'
// import FallbackSpinner from 'src/@core/components/spinner'

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
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

// ** function to handle row options in the table
const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // const permission = JSON.parse(localStorage.getItem('permission'))
  // console.log('🚀 ~ file: Table.js:116 ~ RowOptions ~ permission:', permission.role.isDelete)

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  // ** function to handle delete Role
  const handleDelete = () => {
    dispatch(deleteRoles(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
      } else {
        Toast({ response: res, error: true })
      }
      dispatch(GetAllRoles())
      // if (res?.payload?.status === 200) {
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
      //   dispatch(GetAllRoles())
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
    border: '1px solid #787EFF',
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
              pathname: '/second-page/Roles/ViewRoles'
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
              pathname: '/second-page/Roles/EditRoles'
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

      <div
        onKeyDown={event => {
          event.preventDefault()
        }}
        tabIndex={0}
      >
        <Modal
          id='customvalues'
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Are you sure you want to delete this Role?
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
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // 1001 START
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.AdminSlice.allRoles)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  function filterColumns(store, value) {
    if (!store) return []

    return store.filter(column => {
      return (column?.RoleName ?? '').toLowerCase().includes(value)
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  useEffect(() => {
    dispatch(GetAllRoles())
  }, [dispatch])

  const columns = [
    // {
    //   flex: 0.2,
    //   minWidth: 230,
    //   field: 'fullName',
    //   headerName: 'User',
    //   renderCell: ({ row }) => {
    //     const { first_name } = row

    //     return (
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         {renderClient(row)}
    //         <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
    //           <StyledLink href='/apps/user/view/overview/'>@{first_name}</StyledLink>
    //           {/* <Typography noWrap variant='caption'>
    //             {`@${username}`}
    //           </Typography> */}
    //         </Box>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'RoleName',
      headerName: 'Role',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='heading'>
            {row.RoleName}
          </Typography>
        )
      }
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: 'isActive',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={Boolean(row?.isActive) === true ? 'Active' : 'InActive'}
            color={userStatusObj[row?.isActive]}
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
            <CardHeader title='Roles' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <CardContent>
              <Grid container spacing={6}></Grid>
            </CardContent>
            <Divider />

            <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
            <DataGrid
              autoHeight
              rows={rows}
              getRowId={row => row._id}
              columns={columns}
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

// 1001 END

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
