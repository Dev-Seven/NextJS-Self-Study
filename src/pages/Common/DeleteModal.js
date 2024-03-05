import React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'

const DeleteModal = ({ open, handleClose, handleDelete, name }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 6,
    border: '2px solid #3260CC',
    borderRadius: 1
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Are you sure you want to delete this {name}?
        </Typography>
        <Box style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button variant='contained' onClick={handleDelete} sx={{ mr: 3 }}>
            Delete
          </Button>
          <Button variant='contained' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DeleteModal
