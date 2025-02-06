// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// eslint-disable-next-line react/prop-types
const LogoutModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose(); // Close the modal after logging out
      navigate('/'); // Redirect to login after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="flex flex-col items-center justify-center p-8 m-auto max-w-sm bg-white rounded shadow-lg">
        <Typography id="logout-modal-title" variant="h6">
          Are you sure you want to log out?
        </Typography>
        <Box className="flex gap-4 mt-4">
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#FF6767', color: '#fff', '&:hover': { backgroundColor: '#2d3748' } }} // Gray-900 with hover effect
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
