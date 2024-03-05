/* eslint-disable newline-before-return */
/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, useCallback, useMemo } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
// import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  GridToolbarExport
} from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DatePicker from 'react-datepicker'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Components
import { TextField, Tooltip, tooltipClasses } from '@mui/material'
// import FallbackSpinner from 'src/@core/components/spinner'
import moment from 'moment'
import PickersComponent from 'src/views/pages/datepicker/PickersComponent'
import { GetAllPayment } from 'src/store/slices/AdminSlice'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

import dynamic from 'next/dynamic'

const FallbackSpinner = dynamic(() => import('src/@core/components/spinner'))

// const formatTaxField = taxField => {
//   if (Array.isArray(taxField)) {
//     // Handle the case where Tax is an array of objects
//     return taxField.map(taxObj => `Label: ${taxObj.label}, Percentage: ${taxObj.percentage}`).join('; ')
//   } else if (taxField && typeof taxField === 'object') {
//     // Handle the case where Tax is a single object
//     return `Label: ${taxField.label}, Percentage: ${taxField.percentage}`
//   }
//   // Handle other cases (e.g., when Tax is not defined or has an unexpected format)
//   return ''
// }

// const getJson = apiRef => {
//   // Select rows and columns
//   const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef)
//   const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef)

//   // Format the data. Here we only keep the value
//   const data = filteredSortedRowIds.map(id => {
//     const row = {}
//     visibleColumnsField.forEach(field => {
//       if (field === 'Tax') {
//         const taxField = apiRef.current.getCellParams(id, field).value
//         row[field] = formatTaxField(taxField)
//       } else {
//         row[field] = apiRef.current.getCellParams(id, field).value
//       }
//     })
//     return row
//   })

//   // Stringify with some indentation
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
//   return JSON.stringify(data, null, 2)
// }

const getJson = apiRef => {
  // Select rows and columns
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef)
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef)

  // Format the data. Here we only keep the value
  const data = filteredSortedRowIds.map(id => {
    const row = {}
    visibleColumnsField.forEach(field => {
      row[field] = JSON.stringify(apiRef.current.getCellParams(id, field).value)
    })
    return row
  })

  // Stringify with some indentation
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#parameters
  return JSON.stringify(data, null, 2)
}

const exportBlob = (blob, filename) => {
  // Save the blob in a json file
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  })
}

function JsonExportMenuItem(props) {
  const apiRef = useGridApiContext()

  const { hideMenu } = props

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef)

        const blob = new Blob([jsonString], {
          type: 'text/json'
        })
        exportBlob(blob, 'DataGrid_demo.json')

        // Hide the export menu after the export
        hideMenu?.()
      }}
    >
      Export JSON
    </MenuItem>
  )
}

const csvOptions = { delimiter: ';' }

function CustomExportButton(props) {
  return (
    <GridToolbarExportContainer {...props}>
      <GridCsvExportMenuItem options={csvOptions} />
      {/* <JsonExportMenuItem /> */}
    </GridToolbarExportContainer>
  )
}

function CustomToolbar(props) {
  return (
    <GridToolbarContainer {...props}>
      {/* <CustomExportButton /> */}
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      {/* <GridToolbarExport /> */}
    </GridToolbarContainer>
  )
}

const userStatusObj = {
  Success: 'success',
  Cancelled: 'warning',
  Unsuccessful: 'secondary',
  Aborted: 'primary',
  Failure: 'info'
}

const UserList = () => {
  // ** State

  const [dateOpen, setDateOpen] = useState(null)
  const [dateOpen2, setDateOpen2] = useState(null)

  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)

  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const dispatch = useDispatch()
  const store = useSelector(state => state?.AdminSlice?.GetAllPayment)

  useEffect(() => {
    if (dateOpen && dateOpen2) {
      dispatch(
        GetAllPayment({
          StartDate: moment(dateOpen).add(1, 'days'),
          EndDate: moment(dateOpen2).add(1, 'days'),
          StartYear: '',
          EndYear: ''
        })
      )
    } else {
      dispatch(GetAllPayment({ StartDate: '', EndDate: '', StartYear: '', EndYear: '' }))
    }
  }, [dispatch, dateOpen, dateOpen2])

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

  function filterColumns(store, value) {
    if (!store) {
      return []
    }

    return store?.filter(
      ({ Email = '', SubscriptionTitle = '', CouponCode = '', TarnsactionId = '', order_id = '' }) => {
        const searchValue = value
        return (
          Email.toLowerCase().includes(searchValue) ||
          SubscriptionTitle.toLowerCase().includes(searchValue) ||
          CouponCode.toLowerCase().includes(searchValue) ||
          TarnsactionId.includes(value)
        )
      }
    )
  }

  const rows = useMemo(() => filterColumns(store, value.toLowerCase()), [store, value])

  const columns = [
    {
      flex: 0.15,
      field: 'orderId',
      minWidth: 220,
      headerName: 'Order Id',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.orderId}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'TarnsactionId',
      minWidth: 220,
      headerName: 'Transaction Id',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.TarnsactionId}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.4,
      minWidth: 280,
      field: 'Email',
      headerName: 'Email',
      renderCell: ({ row }) => {
        return <Typography noWrap>{row.Email}</Typography>
      }
    },
    {
      flex: 0.4,
      minWidth: 280,
      field: 'stateName',
      headerName: 'State Name',
      renderCell: ({ row }) => {
        return <Typography noWrap>{row.stateName}</Typography>
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'SubscriptionTitle',
      headerName: 'Subscription Title',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.SubscriptionTitle}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'CouponCode',
      minWidth: 120,
      headerName: 'Coupon Code',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.CouponCode}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'PlanAmount',
      minWidth: 130,
      headerName: 'Plan Amount',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              ₹ {row?.PlanAmount}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'Discount',
      minWidth: 90,
      headerName: 'Discount',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              ₹ {row?.Discount}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'CGST',
      minWidth: 90,
      headerName: 'CGST',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.CGST}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'IGST',
      minWidth: 90,
      headerName: 'IGST',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.IGST}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'SGST',
      minWidth: 90,
      headerName: 'SGST',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.SGST}
            </Typography>
          </Box>
        )
      }
    },
    // {
    //   flex: 0.15,
    //   field: 'TaxStr',
    //   minWidth: 180,
    //   headerName: 'Tax',
    //   renderCell: ({ row }) => {
    //     const taxStrArray = row?.TaxStr.split(',') // Split the string into an array

    //     return (
    //       <Box>
    //         {taxStrArray.map((taxItem, index) => (
    //           <Typography key={index} sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
    //             {taxItem.trim()} {/* Use trim to remove extra spaces */}
    //           </Typography>
    //         ))}
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.15,
      field: 'Amount',
      minWidth: 100,
      headerName: 'Amount',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              ₹ {row?.Amount}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'PaymentDate',
      minWidth: 120,
      headerName: 'Payment Date',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {moment(row?.PaymentDate).format('DD/MM/YYYY')}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
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
                : row?.Status == 'Success'
                ? userStatusObj['Success']
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
    }
    // {
    //   flex: 0.1,
    //   minWidth: 90,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: ({ row }) => <RowOptions id={row._id} />
    // }
  ]

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  return (
    <>
      {/* {isLoading === true ? (
        <FallbackSpinner />
      ) : ( */}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Payment History' />
            <Divider />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size='small'
                    value={value}
                    style={{ height: '2.4375em' }}
                    placeholder='Search Payments'
                    onChange={e => handleFilter(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={8} className='filter-date'>
                  <h3>Sort by : </h3>
                  <DatePickerWrapper className='start-date'>
                    <EditorWrapper>
                      <DatePicker
                        autoComplete='off'
                        isClearable
                        showYearDropdown
                        showMonthDropdown
                        selected={dateOpen}
                        dateFormat='d/MM/yyyy'
                        id='month-year-dropdown'
                        // popperPlacement={popperPlacement}
                        onChange={date => setDateOpen(date)}
                        customInput={<PickersComponent label='Start Date' />}
                      />
                    </EditorWrapper>
                  </DatePickerWrapper>
                  <DatePickerWrapper className='end-date'>
                    <EditorWrapper>
                      <DatePicker
                        autoComplete='off'
                        isClearable
                        showYearDropdown
                        showMonthDropdown
                        selected={dateOpen2}
                        id='month-year-dropdown'
                        dateFormat='d/MM/yyyy'
                        // popperPlacement={popperPlacement}
                        onChange={date => setDateOpen2(date)}
                        customInput={<PickersComponent label='End Date' />}
                      />
                    </EditorWrapper>
                  </DatePickerWrapper>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />

            {/*<TableHeader
                value={value}
                plan={plan}
                handleFilter={handleFilter}
                toggle={toggleAddUserDrawer}
                handlePlanChange={handlePlanChange}
                  />*/}
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
                onSelectionModelChange={store => setSelectedRows(store)}
                components={{ Toolbar: CustomExportButton }}
              />
            )}
          </Card>
        </Grid>
      </Grid>
      {/* )} */}
    </>
  )
}

export default UserList
