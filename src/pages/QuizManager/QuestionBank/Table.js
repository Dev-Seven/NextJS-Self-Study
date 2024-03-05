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
import { Button, Modal, Tooltip, tooltipClasses } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
// import FallbackSpinner from 'src/@core/components/spinner'
import { DeleteSupportSubject } from 'src/store/slices/AdminSlice'
import { DeleteQuestionBank, getAllQuestionBank } from 'src/store/slices/QuizSlice'
import Toast from 'src/pages/Common/Toast'
import DeleteModal from 'src/pages/Common/DeleteModal'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))
const TableHeader = dynamic(() => import('./TableHeader'))

// ** user object to handle status color in the table
const userStatusObj = {
  true: 'success',
  pending: 'warning',
  false: 'secondary'
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

  // ** function to handle delete question from table
  const handleDelete = () => {
    dispatch(DeleteQuestionBank(id)).then(res => {
      if (res?.payload?.status === 200) {
        Toast({ response: res, remove: true })
        dispatch(getAllQuestionBank())
      } else {
        Toast({ response: res, error: true })
      }
    })
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
          sx={{ '& svg': { mr: 2 } }}
          onClick={() => {
            localStorage.setItem('id', id)
            router.replace({
              pathname: '/QuizManager/QuestionBank/ViewQuestionBank'
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
              pathname: '/QuizManager/QuestionBank/EditQuestionBank'
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

      <DeleteModal name='Question' open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  )
}

const UserList = ({ store }) => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [showAllItems, setShowAllItems] = useState(false)

  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // ** function to handle tooltip in the table
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

  // ** function to handle filter in the table
  function filterColumns(allSupportRequest, value) {
    if (!allSupportRequest) return []
    return allSupportRequest.filter(column => {
      return (column?.Question ?? '').toLowerCase().includes(value)
    })
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  function RenderArrayItems(array) {
    return (
      <>
        {array.map((item, index) => (
          <ol key={item.index}>
            <li>{item?.option}</li>
            <br />
          </ol>
        ))}
        {showAllItems && (
          <div>
            {array.map((item, index) => (
              <ol key={item.index}>
                <li>{item?.option}</li>
                <br />
              </ol>
            ))}
          </div>
        )}
      </>
    )
  }

  function OrderedList(props) {
    const items = props.items.map((item, index) => <li key={index}>{item?.option}</li>)

    return <ol>{items}</ol>
  }

  // ** To render columns in the table
  const columns = [
    {
      flex: 0.3,
      minWidth: 250,
      field: 'Question',
      headerName: 'Question',
      renderCell: ({ row }) => {
        return (
          <BootstrapTooltip
            title={<div contentEditable='true' dangerouslySetInnerHTML={{ __html: row?.Question }}></div>}
            followCursor
            arrow
          >
            <Typography variant='header'>
              <div contentEditable='true' dangerouslySetInnerHTML={{ __html: row?.Question }}></div>
            </Typography>
          </BootstrapTooltip>
        )
      }
    },
    {
      flex: 0.09,
      field: 'SubjectName',
      minWidth: 80,
      headerName: 'Subject Name',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.SubjectName}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.09,
      field: 'ScorePoints',
      minWidth: 80,
      headerName: 'Score Points',
      renderCell: ({ row }) => {
        return (
          <Box>
            {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.ScorePoints}
            </Typography>
          </Box>
        )
      }
    },
    // {
    //   flex: 0.15,
    //   field: 'NegativePoints',
    //   minWidth: 80,
    //   headerName: 'Negative Points',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         {/* <Icon icon={userRoleObj[row.last_name]} fontSize={20} /> */}
    //         <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //           {row?.NegativePoints}
    //         </Typography>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.05,
      minWidth: 100,
      field: 'Status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            skin='light'
            size='small'
            label={row?.Status === true ? 'Active' : 'InActive'}
            color={userStatusObj[row?.Status]}
            sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
          />
        )
      }
    },
    // {
    //   flex: 0.15,
    //   field: 'AnswerOption',
    //   minWidth: 150,
    //   headerName: 'AnswerOption',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         <Tooltip title={<OrderedList items={row?.AnswerOption} />} followCursor arrow>
    //           <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //             <OrderedList items={row?.AnswerOption} />
    //           </Typography>
    //         </Tooltip>
    //       </Box>
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
              <CardHeader title='Question Bank' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
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
                autoHeight
                getRowHeight={() => 'auto'}
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
