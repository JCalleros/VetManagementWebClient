import { Modal } from '@mui/material'
import React from 'react'

export default function CustomModal({open, onClose}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Modal>
  )
}
