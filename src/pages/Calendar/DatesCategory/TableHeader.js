// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from 'next/link'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const TableHeader = props => {
  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      {/* <Button
        // sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      >
        Export
      </Button> */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Date Category'
          onChange={e => handleFilter(e.target.value)}
        />

        <Link prefetch={false} href='/Calendar/datesCategory/AddDatesCategory' style={{ textDecoration: 'none' }}>
          <Button sx={{ mb: 2 }} onClick={() => localStorage.removeItem('id')} variant='contained'>
            Add Category
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default TableHeader
