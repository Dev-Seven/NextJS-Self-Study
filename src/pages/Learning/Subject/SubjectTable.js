/* eslint-disable newline-before-return */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 07-03-2023              Login Table With Call api                       DHRUV

// 1001 START
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
/* eslint-disable lines-around-comment */
import { useState, useEffect, useCallback } from 'react'

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
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import { useRouter } from 'next/router'
import { img_url } from 'src/common/Service'
import { deleteSubjectById, getAllSubject } from 'src/store/slices/LearningSlice'
import moment from 'moment/moment'
// import TableHeader from './TableHeader'
import { useMemo } from 'react'
import { Button, Modal } from '@mui/material'
// import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

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

  // ** function to handle delete subject
  const handleDelete = () => {
    dispatch(deleteSubjectById(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
      } else {
        Toast({ response: res, error: true })
      }
      handleRowOptionsClose()
      dispatch(getAllSubject())
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
              pathname: '/Learning/Subject/ViewSubject/'
              // query: { view: true }
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
              pathname: '/Learning/Subject/EditSubject/'
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
              Are you sure you want to delete this Subject?
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

const SubjectTable = () => {
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()

  const store = useSelector(state => state.LearningSlice.allSubjects)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  useEffect(() => {
    dispatch(getAllSubject())
  }, [])

  function filterColumns(store, value) {
    if (!store) return []
    return store.filter(column => {
      return (column?.SubjectName ?? '').toLowerCase().includes(value)
      // column?.Price.includes(value) ||
      // column?.EffectiveDate.includes(value)
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  const columns = [
    {
      flex: 0.3,
      minWidth: 250,
      field: 'SubjectName',
      headerName: 'Subject',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.SubjectName}
          </Typography>
        )
      }
    },

    {
      flex: 0.3,
      field: 'IsPaid',
      minWidth: 120,
      headerName: 'Price',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.IsPaid === true ? (row?.Price === undefined ? '_' : `₹ ${row.Price}`) : 'Free'}
            </Typography>
          </Box>
        )
      }
    },

    {
      flex: 0.3,
      field: 'StartDate',
      minWidth: 120,
      headerName: 'Date Validity',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.StartDate && row?.EndDate
                ? moment(row?.StartDate).format('DD/MM/YYYY') + 'To' + moment(row?.EndDate).format('DD/MM/YYYY')
                : null}

              {row?.EndDate == null ? (
                row?.IsPaid === false ? (
                  '_'
                ) : (
                  <>
                    {moment(row?.StartDate).local().format('DD/MM/YYYY')} To{' '}
                    <div dangerouslySetInnerHTML={{ __html: '&infin;' }} />
                  </>
                )
              ) : null}
            </Typography>
          </Box>
        )
      }
    },

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
    //           {row.CountryCode} {row.MobileNumber}
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
      flex: 0.3,
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
      <Grid item xs={12}>
        {isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <Card>
            <CardHeader title='Subject' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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

export default SubjectTable

// 1001 END
