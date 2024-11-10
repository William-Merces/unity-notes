'use client';

import dynamic from 'next/dynamic';
import { AppBar, Box, IconButton, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const DynamicAppBar = dynamic(
    () => Promise.resolve(({ children }: { children: React.ReactNode }) => (
        <AppBar position="sticky" elevation={0}>
            {children}
        </AppBar>
    )),
    { ssr: false }
);

interface AppHeaderProps {
    date: string;
}

export function AppHeader({ date }: AppHeaderProps) {
    return (
        <DynamicAppBar>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <IconButton edge="start" color="inherit">
                    <MenuIcon />
                </IconButton>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">Unity Notes</Typography>
                    <Typography variant="subtitle2" component="div">{date}</Typography>
                </Box>
            </Box>
        </DynamicAppBar>
    );
}