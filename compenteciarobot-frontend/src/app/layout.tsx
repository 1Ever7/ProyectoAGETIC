// src/app/layout.tsx
'use client';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBarWithDrawer from '@/components/Drawer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <body className={inter.className} style={{ margin: 0 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <AppBarWithDrawer>
            {children} {/* Esto es lo que faltaba */}
          </AppBarWithDrawer>
        </ThemeProvider>
      </body>
    </html>
  );
}