/* eslint-disable newline-before-return */
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
import AdminSlice, { fetchUsers, GetAllUser } from 'src/store/slices/AdminSlice'

// ** Third Party Components
import axios, { Axios } from 'axios'
// import TableHeader from './TableHeader'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { deleteCategory, GetAllCategory } from 'src/store/slices/LearningSlice'
import { toast } from 'react-hot-toast'
import { Button, CircularProgress, Modal } from '@mui/material'
// import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'

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
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
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
  if (row.avatar) {
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

const RowOptions = ({ id, isUsed, SubjectId }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const router = useRouter()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  // ** function to handle delete category
  const handleDelete = () => {
    dispatch(deleteCategory(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
        dispatch(GetAllCategory())
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
              pathname: '/Learning/Category/ViewCategory/'
            })
          }}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          // disabled={isUsed === true}
          onClick={() => {
            localStorage.setItem('id', id)
            localStorage.setItem('subjectID', SubjectId)
            router.replace({
              pathname: '/Learning/Category/EditCategory/'
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
              Are you sure you want to delete this Category?
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

  // const store = useSelector(state => state.LearningSlice.allCategory)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // ** function to handle filter
  function filterColumns(store, value) {
    if (!store) return []
    return store.filter(column => {
      return (
        (column?.CategoryName ?? '').toLowerCase().includes(value) ||
        (column?.SubjectName ?? '').toLowerCase().includes(value) ||
        (column?.ParentCatName ?? '').toLowerCase().includes(value)
      )
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  // useEffect(() => {
  //   dispatch(GetAllCategory())
  // }, [dispatch])

  // ** To render columns
  const columns = [
    // {
    //   flex: 0.2,
    //   minWidth: 210,
    //   field: 'UserName',
    //   headerName: 'User',
    //   renderCell: ({ row }) => {
    //     const { UserName } = row

    //     return (
    //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //         {renderClient(row)}
    //         <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
    //           {/* <StyledLink>@{UserName}</StyledLink> */}
    //           <Typography noWrap variant='heading'>
    //             {`${UserName}`}
    //           </Typography>
    //         </Box>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'CategoryName',
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='heading'>
            {row.CategoryName}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'SubjectName',
      minWidth: 80,
      headerName: 'Subject',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.SubjectName ? row.SubjectName : '_'}
            </Typography>
          </Box>
        )
      }
    },

    {
      flex: 0.15,
      field: 'ParentCatName',
      minWidth: 120,
      headerName: 'parent Category',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.ParentCatName ? row.ParentCatName : '_'}
            </Typography>
          </Box>
        )
      }
    },
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
    // {
    //   flex: 0.15,
    //   field: 'MobileNumber',
    //   minWidth: 150,
    //   headerName: 'Mobile Number',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           +{row.CountryCode} {row.MobileNumber}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },

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
      renderCell: ({ row }) => <RowOptions isUsed={row.isUsed} id={row._id} SubjectId={row.SubjectId} />
    }
  ]

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Category' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}></Grid>
          </CardContent>
          <Divider />

          <TableHeader value={value} plan={plan} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
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
