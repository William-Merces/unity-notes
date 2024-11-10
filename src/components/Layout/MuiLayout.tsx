'use client';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { LessonProvider } from '@/contexts/LessonContext';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    components: {
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    height: 56,
                },
            },
        },
    },
});

export default function MuiLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <LessonProvider>
                    <div suppressHydrationWarning>
                        {children}
                    </div>
                </LessonProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}