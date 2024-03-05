/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useCallback, useMemo } from 'react'

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

// ** Third Party Components
import { useRouter } from 'next/router'
import { DeleteAppBanner, DeleteMapImage, GetAllAppBanner, GetAllMapImage } from 'src/store/slices/AdminSlice'
import Toast from 'src/pages/Common/Toast'
import DeleteModal from 'src/pages/Common/DeleteModal'
import { img_url } from 'src/common/Service'

import dynamic from 'next/dynamic'
import { toast } from 'react-hot-toast'
import ImageModal from '../Common/ImageModal'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

// ** user object to handle status color in the table
const userStatusObj = {
  true: 'success',
  pending: 'warning',
  false: 'secondary'
}

const RowOptions = ({ id, row }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const [imageSrc, setImageSrc] = useState('')
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

  // ** function to handle delete question from table
  const handleDelete = () => {
    dispatch(DeleteMapImage(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
        // dispatch(GetAllMapImage())
      } else {
        Toast({ response: res, error: true })
      }
    })
    handleRowOptionsClose()
  }

  const copyImgToClipboard = async row => {
    try {
      await navigator.clipboard.writeText(row?.FullMapImagePath)
      // console.log('Image URL copied to clipboard:', row?.FullMapImagePath)
      toast.success('Map url copied to clipboard', {
        style: {
          padding: '12px',
          color: ' #787EFF',
          backgroundColor: 'white',
          border: '1px solid #787EFF'
        },
        iconTheme: {
          primary: '#73E028',
          secondary: 'white'
        }
      })
    } catch (error) {
      console.error('Failed to copy image URL to clipboard:', error)
    }
    handleRowOptionsClose()
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
          onClick={() => {
            copyImgToClipboard(row)
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='solar:copy-outline' fontSize={20} />
          Copy URL
        </MenuItem>
        <MenuItem onClick={handleOpen} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>

      <DeleteModal name='Map Image' open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  )
}

const renderClient = (row, handleImageOpen) => {
  return (
    <img src={`${img_url}${row.MapImage}`} style={{ width: '100px' }} onClick={() => handleImageOpen(row.MapImage)} />
  )
}

const UserList = ({ store }) => {
  // ** State
  const [value, setValue] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [openImage, setOpenImage] = useState(false)

  const handleImageOpen = src => {
    setOpenImage(true)
    setImageSrc(src)
  }
  const handleImageClose = () => setOpenImage(false)
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  function filterColumns(store, value) {
    if (!store) {
      return []
    }

    return store?.filter(({ MapImageName = '', SubjectName = '' }) => {
      const searchValue = value.toLowerCase()
      return MapImageName.toLowerCase().includes(searchValue) || SubjectName.toLowerCase().includes(searchValue)
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  // ** To render columns in the table
  const columns = [
    {
      flex: 0.15,
      field: 'MapImage',
      minWidth: 80,
      headerName: 'Map Image',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {/* {row.BannerImage} */}
              {renderClient(row, handleImageOpen)}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      field: 'MapImageName',
      minWidth: 250,
      headerName: 'Map Image Name',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant='body2'>{row.MapImageName}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      field: 'SubjectName',
      minWidth: 250,
      headerName: 'Subject Name',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant='body2'>{row.SubjectName}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'CreatedAdminName',
      minWidth: 80,
      headerName: 'Created By',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.CreatedAdminName}
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
      renderCell: ({ row }) => <RowOptions id={row._id} row={row} />
    }
  ]

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  return (
    <>
      <ImageModal open={openImage} handleClose={handleImageClose} src={imageSrc} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {isLoading === true ? (
            <FallbackSpinner />
          ) : (
            <Card>
              <CardHeader title='Map Image' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
              <CardContent>
                <Grid container spacing={6}></Grid>
              </CardContent>
              <Divider />

              <TableHeader value={value} handleFilter={handleFilter} />
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

export default UserList
