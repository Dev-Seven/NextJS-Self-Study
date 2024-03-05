// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from 'next/link'

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
          placeholder='Search Question'
          onChange={e => handleFilter(e.target.value)}
        />

        <Link prefetch={false} href='/QuizManager/QuestionBank/AddQuestionBank' style={{ textDecoration: 'none' }}>
          <Button sx={{ mb: 2 }} onClick={() => localStorage.removeItem('id')} variant='contained'>
            Add Question Bank
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default TableHeader
