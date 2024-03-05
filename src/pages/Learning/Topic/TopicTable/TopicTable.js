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
import { fetchUsers } from 'src/store/slices/AdminSlice'

// ** Third Party Components
import axios, { Axios } from 'axios'
// import TableHeader from './TableHeader'
import { useRouter } from 'next/router'
import { img_url } from 'src/common/Service'
import { deleteSubjectById, deleteTopic, getAllSubjectById, getAllTopic } from 'src/store/slices/LearningSlice'
import moment from 'moment/moment'
// import TableHeader from './TableHeader'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { Button, Modal, Tooltip, tooltipClasses } from '@mui/material'
import Toast from 'src/pages/Common/Toast'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

const RowOptions = ({ id, view, SubjectId, currentPage, pageSize, value }) => {
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

  // ** function to handle delete topic
  const handleDelete = () => {
    dispatch(deleteTopic(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
        dispatch(getAllTopic({ page: currentPage, take: pageSize, searchStr: value }))
        handleRowOptionsClose()
      } else {
        Toast({ response: res, error: true })
      }
    })
    handleClose()
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
              pathname: '/Learning/Topic/ViewTopic'
              // query: { _id: id, view: true }
            })
          }}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.setItem('id', id)
            localStorage.setItem('SubjectId', SubjectId)
            router.replace({
              pathname: '/Learning/Topic/EditTopic'
              // query: { _id: id }
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
              Are you sure you want to delete this Topic?
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

const TopicTable = () => {
  // ** State
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // ** Hooks
  const dispatch = useDispatch()

  const store = useSelector(state => state.LearningSlice.getAllTopics?.topic)
  const count = useSelector(state => state.LearningSlice.getAllTopics?.count)

  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const totalCount = count
  useEffect(() => {
    dispatch(getAllTopic({ page: currentPage, take: pageSize, searchStr: value })).then(res => {
      if (res?.payload?.status === 200) {
        localStorage.removeItem('Topictree')
      }
    })
  }, [dispatch, currentPage])

  function filterColumns(store, value) {
    if (!store) return []
    return store?.filter(column => {
      return (
        (column?.TopicName ?? '').toLowerCase().includes(value) ||
        (column?.SubjectName ?? '').toLowerCase().includes(value) ||
        (column?.ParentCatName ?? '').toLowerCase().includes(value) ||
        (column?.CreatedAdminName ?? '').toLowerCase().includes(value)
      )
    })
  }

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

  const rows = useMemo(() => filterColumns(store, value?.toLowerCase()), [store, value])

  const columns = [
    {
      flex: 0.2,
      minWidth: 250,
      field: 'TopicName',
      headerName: 'Topic',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip title={row?.TopicName} followCursor arrow>
            <Typography variant='body2'>{row?.TopicName}</Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'SubjectName',
      headerName: 'Subject',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip title={row?.SubjectName} followCursor arrow>
            <Typography variant='body2'>{row?.SubjectName}</Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'CategoryName',
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip title={row?.CategoryName} followCursor arrow>
            <Typography variant='body2'>{row?.CategoryName}</Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'ParentCatName',
      headerName: 'Parent Category',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip title={row?.ParentCatName} followCursor arrow>
            <Typography variant='body2'>{row?.ParentCatName}</Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.15,
      field: 'createdAt',
      minWidth: 120,
      headerName: 'Creation Date',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {moment(row?.createdAt).format('DD/MM/YYYY')}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'CreatedAdminName',
      minWidth: 120,
      headerName: 'Created By',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.CreatedAdminName}
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
        return (
          <RowOptions
            id={row._id}
            SubjectId={row.SubjectId}
            currentPage={currentPage}
            pageSize={pageSize}
            value={value}
          />
        )
      }
    }
  ]

  const handleFilter = useCallback(
    val => {
      setValue(val)
      dispatch(getAllTopic({ page: currentPage, take: pageSize, searchStr: val })).then(res => {})
    },
    [dispatch, currentPage, pageSize]
  )
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  // const onFilterModelChange = newFilterModel => {
  //   const searchStr = newFilterModel.items?.[0]?.value || ''

  //   dispatch(getAllTopic({ page: currentPage, take: pageSize, searchStr }))
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Topics' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}></Grid>
          </CardContent>
          <Divider />

          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />

          {isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <DataGrid
              page={currentPage - 1}
              getRowHeight={() => 'auto'}
              autoHeight
              rows={rows}
              getRowId={row => row._id}
              columns={columns}
              pageSize={pageSize}
              rowCount={totalCount}
              paginationMode='server'
              onPageChange={newPage => {
                setCurrentPage(newPage + 1)
                dispatch(getAllTopic({ page: newPage + 1, take: pageSize, searchStr: value }))
              }}
              onPageSizeChange={newPageSize => {
                setPageSize(newPageSize)
                dispatch(getAllTopic({ page: currentPage, take: newPageSize, searchStr: value }))
              }}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              filterMode='server'
              disableColumnFilter
              // onFilterModelChange={onFilterModelChange}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default TopicTable

// 1001 END
