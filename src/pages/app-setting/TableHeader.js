// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from 'next/link'

const TableHeader = props => {
  // ** Props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link prefetch={false} href='/app-setting/AppBanner' style={{ textDecoration: 'none' }}>
          <Button sx={{ mb: 2 }} onClick={() => localStorage.removeItem('id')} variant='contained'>
            Add App Slider
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default TableHeader
