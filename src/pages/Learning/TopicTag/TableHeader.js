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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Topic Tag'
          onChange={e => {
            handleFilter(e.target.value)
          }}
        />

        <Link prefetch={false} href='/Learning/topicTag/AddTopicTag/' style={{ textDecoration: 'none' }}>
          <Button sx={{ mb: 2 }} variant='contained' onClick={() => localStorage.removeItem('id')}>
            Add Topic Tag
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default TableHeader
