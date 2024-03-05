import React from 'react'
import { toast } from 'react-hot-toast'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Toast = ({ response, error = false, update = false, remove = false, customMessage }) => {
  const message = response?.payload?.message
  const status = response?.payload?.status

  // ** for custom messages
  if (customMessage) {
    toast.success(customMessage, {
      style: {
        padding: '12px',
        color: ' #787EFF',
        backgroundColor: 'white',
        border: '1px solid #787EFF'
      },
      iconTheme: {
        primary: '#73E028',
        secondary: 'white'
      }
    })
  }

  if (error) {
    toast.error(message || 'An error occurred', {
      style: {
        padding: '12px',
        color: '#787EFF',
        backgroundColor: 'white',
        border: '1px solid #787EFF'
      },
      iconTheme: {
        primary: 'white',
        secondary: 'red'
      }
    })
  } else if (update) {
    toast.success(message || 'Action was successful', {
      style: {
        padding: '12px',
        color: ' #787EFF',
        backgroundColor: 'white',
        border: '1px solid #787EFF'
      },
      icon: <EditIcon style={{ color: '#787EFF' }} />,
      iconTheme: {
        primary: '#ffa726',
        secondary: '#ffa726'
      }
    })
  } else if (remove) {
    toast.success(message || 'Action was successful', {
      style: {
        padding: '12px',
        color: ' #787EFF',
        backgroundColor: 'white',
        border: '1px solid #787EFF'
      },
      icon: <DeleteIcon style={{ color: 'red' }} />,
      iconTheme: {
        primary: '#ffa726',
        secondary: '#ffa726'
      }
    })
  } else {
    toast.success(message || 'Action was successful', {
      style: {
        padding: '12px',
        color: ' #787EFF',
        backgroundColor: 'white',
        border: '1px solid #787EFF'
      },
      iconTheme: {
        primary: '#73E028',
        secondary: 'white'
      }
    })
  }

  return null
}

export default Toast
