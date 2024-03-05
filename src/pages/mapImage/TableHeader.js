// ** MUI Imports
import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

const TableHeader = props => {
  const { handleFilter, toggle, value } = props

  // ** Props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search map Image'
          onChange={e => handleFilter(e.target.value)}
        />
        <Link prefetch={false} href='/mapImage/MapImage' style={{ textDecoration: 'none' }}>
          <Button sx={{ mb: 2 }} onClick={() => localStorage.removeItem('id')} variant='contained'>
            Add Map Image
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default TableHeader
