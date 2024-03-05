/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 07-03-2023              Login Table With Call api                       DHRUV

// 1001 START
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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Third Party Components
// import TableHeader from './TableHeader'
import { useRouter } from 'next/router'
import { img_url } from 'src/common/Service'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { DeletedAdmin, GetAllUser } from 'src/store/slices/AdminSlice'
import Toast from 'src/pages/Common/Toast'
import DeleteModal from 'src/pages/Common/DeleteModal'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

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

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()
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

  // ** function to handle delete admin user
  const handleDelete = async () => {
    const res = await dispatch(DeletedAdmin(id))
    const status = res?.payload?.status
    if (res?.payload?.status === 200) {
      Toast({ response: res, remove: true })
    } else {
      Toast({ response: res, error: true })
    }

    handleRowOptionsClose()

    if (status === 200) {
      dispatch(GetAllUser())
    }
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
              pathname: '/second-page/User/ViewUser/'
            })
          }}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            // dispatch(setEditUserId(id))
            localStorage.setItem('id', id)
            router.replace({
              pathname: '/second-page/User/EditUser/'
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

      <DeleteModal name='User' open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  )
}

const UserList = () => {
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()

  const store = useSelector(state => state.AdminSlice.allUser)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  function filterColumns(store, value) {
    if (!store) {
      return []
    }

    return store?.filter(({ UserName = '', Email = '', RoleName = '', MobileNumber = '' }) => {
      const searchValue = value.toLowerCase()
      return (
        UserName.toLowerCase().includes(searchValue) ||
        Email.toLowerCase().includes(searchValue) ||
        RoleName.toLowerCase().includes(searchValue) ||
        MobileNumber.includes(value)
      )
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  useEffect(() => {
    dispatch(GetAllUser())
  }, [dispatch])

  const columns = [
    {
      flex: 0.2,
      minWidth: 120,
      field: 'UserName',
      headerName: 'System User',
      renderCell: ({ row }) => {
        const { UserName } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              {/* <StyledLink>@{UserName}</StyledLink> */}
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
          <Typography noWrap variant='body2'>
            {row.Email}
          </Typography>
        )
      }
    },

    // {
    //   flex: 0.15,
    //   field: 'FirstName',
    //   minWidth: 120,
    //   headerName: 'First Name',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {row.FirstName}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },
    // {
    //   flex: 0.15,
    //   field: 'LastName',
    //   minWidth: 120,
    //   headerName: 'Last Name',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {row.LastName}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.15,
      field: 'RoleName',
      minWidth: 100,
      headerName: 'Role',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.RoleName}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'MobileNumber',
      minWidth: 130,
      headerName: 'Mobile Number',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              +{row.CountryCode} {row.MobileNumber}
            </Typography>
          </Box>
        )
      }
    },

    // {
    //   flex: 0.15,
    //   minWidth: 100,
    //   headerName: 'Avatar',
    //   field: 'ProfileImage',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
    //         <img src={row?.ProfileImage} alt='avatar' />
    //       </Typography>
    //     )
    //   }
    // },
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
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <Card>
              <CardHeader title='System User' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
          )}
        </Grid>
      </Grid>
    </>
  )
}

// export const getStaticProps = async () => {
//   const dispatch = useDispatch()
//   const res = await dispatch(GetAllUser())
//   console.log('res', res)
//   const apiData = res.data

//   return {
//     props: {
//       apiData
//     }
//   }
// }

export default UserList

// 1001 END
