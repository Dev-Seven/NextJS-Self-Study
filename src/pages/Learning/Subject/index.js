/* eslint-disable lines-around-comment */
import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Link from 'next/link'
import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { GetAllUser } from 'src/store/slices/AdminSlice'
import { useSelector } from 'react-redux'
// import SubjectTable from './SubjectTable'

import dynamic from 'next/dynamic'

const SubjectTable = dynamic(() => import('./SubjectTable'))

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 200,
    editable: true
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'number',
    width: 200,
    editable: true
  },
  {
    field: 'password',
    headerName: 'password',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  }
]

const Index = () => {
  const [tableData, setTableData] = useState([])
  const dispatch = useDispatch()

  // const { Users } = useSelector(({ SystemSlice }) => SystemSlice)
  const [value, setValue] = useState('')

  const handleFilter = React.useCallback(val => {
    setValue(val)
  }, [])

  // useEffect(() => {
  //   dispatch(GetAllUser())
  // }, [dispatch])

  return (
    <div>
      {/* <Card>
        <CardHeader title='Users' />
        <CardContent> */}
      {/* <TableHeader value={value} handleFilter={handleFilter} /> */}
      {/* <Link
        href='/Learning/Subject/AddSubject'
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'flex-end',
          marginBottom: '2rem'
        }}
        prefetch={false}
      >
        <Button variant='contained'>Add Subject</Button>
      </Link> */}
      {/* <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box> */}
      <SubjectTable />
      {/* </CardContent>
      </Card> */}
    </div>
  )
}

export default Index
