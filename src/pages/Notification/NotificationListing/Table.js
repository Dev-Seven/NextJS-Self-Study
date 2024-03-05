/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

import dynamic from 'next/dynamic'
import { getAllNotification } from 'src/store/slices/AdminSlice'
import moment from 'moment'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

function CustomToolbar(props) {
  return (
    <GridToolbarContainer {...props}>
      {/* <CustomExportButton /> */}
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  )
}

const UserList = () => {
  // ** State
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.AdminSlice.getAllNotification)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  useEffect(() => {
    dispatch(getAllNotification())
  }, [dispatch])

  //table columns

  function filterColumns(store, value) {
    if (!store) {
      return []
    }

    return store?.filter(({ title = '', message = '', UserName = '' }) => {
      const searchValue = value.toLowerCase()

      return (
        title.toLowerCase().includes(searchValue) ||
        message.toLowerCase().includes(searchValue) ||
        UserName.toLowerCase().includes(searchValue)
      )
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  const columns = [
    {
      flex: 0.15,
      minWidth: 250,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return <Typography variant='body2'>{row.title}</Typography>
      }
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'UserName',
      headerName: 'User Name',
      renderCell: ({ row }) => {
        return <Typography variant='body2'>{row.UserName}</Typography>
      }
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'sentDate',
      headerName: 'Sent Date',
      renderCell: ({ row }) => {
        return <Typography variant='body2'>{moment(row?.sentDate).format('DD/MM/YYYY')}</Typography>
      }
    },

    {
      flex: 0.2,
      field: 'message',
      minWidth: 450,
      headerName: 'Message',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.message}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'isSeen',
      minWidth: 50,
      headerName: 'Is Seen',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.isSeen ? 'Yes' : 'No'}
            </Typography>
          </Box>
        )
      }
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
          <CardHeader title='Notifications' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}></Grid>
          </CardContent>
          <Divider />

          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          {isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <DataGrid
              getRowHeight={() => 'auto'}
              autoHeight
              rows={rows}
              columns={columns}
              getRowId={row => row._id}
              pageSize={pageSize}
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              components={{
                Toolbar: CustomToolbar
              }}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
