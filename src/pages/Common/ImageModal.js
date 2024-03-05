import React from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import Image from 'next/image'
import { img_url } from 'src/common/Service'

const ImageModal = ({ open, handleClose, src }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 455,
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
        <img src={`${img_url}${src}`} alt='image' height={350} width={400} />
      </Box>
    </Modal>
  )
}

export default ImageModal
