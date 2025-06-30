// src/components/AppBarWithDrawer.tsx
'use client';

import { useState, ReactNode } from 'react'; // Importa ReactNode
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Button, 
  Box,
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse,
  Divider,
  Tooltip,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  Home as HomeIcon,
  EmojiEvents as CompetitionsIcon,
  Groups as ParticipantsIcon,
  BarChart as ResultsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  History as RoundsIcon,
  AccountCircle as LoginIcon
} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

// Define las props para incluir children
interface AppBarWithDrawerProps {
  children: ReactNode;
}

export default function AppBarWithDrawer({ children }: AppBarWithDrawerProps) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    competitions: true,
    results: true
  });

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* AppBar con botón de login */}
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#202123'
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Competencia de Robots Sumo
          </Typography>
          
          <Button 
            color="inherit"
            startIcon={<LoginIcon />}
            onClick={() => setLoginOpen(true)}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      
      {/* Drawer estilo ChatGPT */}
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 56,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerOpen ? 240 : 56,
            backgroundColor: '#202123',
            color: 'white',
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            zIndex: (theme) => theme.zIndex.appBar - 1
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
          <Tooltip title={drawerOpen ? 'Contraer menú' : 'Expandir menú'} arrow>
            <IconButton onClick={toggleDrawer} sx={{ color: 'white' }}>
              {drawerOpen ? <CloseIcon /> : <ChevronRight />}
            </IconButton>
          </Tooltip>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <List sx={{ overflow: 'hidden', mt: 1 }}>
          {/* Inicio */}
          <ListItem disablePadding>
            <ListItemButton href="/" sx={{ minHeight: 48, px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto', color: 'white' }}>
                <HomeIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Inicio" />}
            </ListItemButton>
          </ListItem>

          {/* Bienvenida */}
          <ListItem disablePadding>
            <ListItemButton href="/bienvenida" sx={{ minHeight: 48, px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto', color: 'white' }}>
                <HelpIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Bienvenida" />}
            </ListItemButton>
          </ListItem>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />

          {/* Competencias - con desplegable */}
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => toggleSection('competitions')}
              sx={{ minHeight: 48, px: 2.5 }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto', color: 'white' }}>
                <CompetitionsIcon />
              </ListItemIcon>
              {drawerOpen && (
                <>
                  <ListItemText primary="Competencias" />
                  {expandedSections.competitions ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
          </ListItem>
          
          <Collapse in={expandedSections.competitions && drawerOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                href="/competencias/rondas" 
                sx={{ pl: 6, minHeight: 48 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 3, color: 'white' }}>
                  <RoundsIcon />
                </ListItemIcon>
                <ListItemText primary="Rondas" />
              </ListItemButton>
              
              <ListItemButton 
                href="/dashboard/participantes" 
                sx={{ pl: 6, minHeight: 48 }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 3, color: 'white' }}>
                  <ParticipantsIcon />
                </ListItemIcon>
                <ListItemText primary="Participantes" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Resultados - con desplegable */}
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => toggleSection('results')}
              sx={{ minHeight: 48, px: 2.5 }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto', color: 'white' }}>
                <ResultsIcon />
              </ListItemIcon>
              {drawerOpen && (
                <>
                  <ListItemText primary="Resultados" />
                  {expandedSections.results ? <ExpandLess /> : <ExpandMore />}
                </>
              )}
            </ListItemButton>
          </ListItem>
          
          <Collapse in={expandedSections.results && drawerOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton 
                href="/resultados/clasificacion" 
                sx={{ pl: 6, minHeight: 48 }}
              >
                <ListItemText primary="Clasificación" />
              </ListItemButton>
              
              <ListItemButton 
                href="/resultados/estadisticas" 
                sx={{ pl: 6, minHeight: 48 }}
              >
                <ListItemText primary="Estadísticas" />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 1 }} />
          
          {/* Configuración */}
          <ListItem disablePadding>
            <ListItemButton href="/configuracion" sx={{ minHeight: 48, px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto', color: 'white' }}>
                <SettingsIcon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary="Configuración" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <main className={`flex-grow transition-all duration-300 ${
        drawerOpen ? 'ml-[240px]' : 'ml-[56px]'
      } mt-[64px] p-4 min-h-[calc(100vh-64px)] bg-[#f5f5f5]`}>
       <Box sx={{ 
        width: '100%',
        maxWidth: drawerOpen ? 'calc(100vw - 280px)' : 'calc(100vw - 96px)',
        marginLeft: drawerOpen ? '240px' : '56px',
        marginTop: '64px',
        padding: 3,
        backgroundColor: '#f5f5f5',
        minHeight: 'calc(100vh - 64px)',
        transition: 'all 0.3s ease',
        overflowX: 'auto'
        }}>
        {children}
        </Box>
      </main>
    </div>
  );
}