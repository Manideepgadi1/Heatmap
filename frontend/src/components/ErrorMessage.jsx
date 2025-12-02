/**
 * Error message component for displaying user-friendly errors.
 */
import React from 'react';
import { Box, Alert, AlertTitle, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        px: 2,
      }}
    >
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon fontSize="large" />}
        sx={{
          maxWidth: '600px',
          width: '100%',
        }}
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          )
        }
      >
        <AlertTitle sx={{ fontWeight: 'bold' }}>Error</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
