'use client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/utils/constants'; // Se não tiver esse arquivo, me avise

interface MuiLayoutProps {
    children: React.ReactNode;
}

export default function MuiLayout({ children }: MuiLayoutProps) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}