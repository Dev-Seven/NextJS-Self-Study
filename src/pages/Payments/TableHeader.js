/* eslint-disable lines-around-comment */
// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const TableHeader = props => {
  // ** Props
  const { handleFilter, value } = props

  return (
    <Box sx={{ p: 10, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Payments'
          onChange={e => handleFilter(e.target.value)}
        />
      </Box>
    </Box>
  )
}

export default TableHeader
