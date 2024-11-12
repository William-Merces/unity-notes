'use client';

import { CircularProgress, Box } from '@mui/material';

export default function LoadingSpinner() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                minHeight: '200px'
            }}
        >
            <CircularProgress />
        </Box>
    );
}