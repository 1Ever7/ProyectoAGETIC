import { Typography, Container, Box } from '@mui/material';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" gutterBottom>
          Bienvenida
        </Typography>
        <Typography paragraph>
          Información sobre la competencia, reglas y objetivos.
        </Typography>
        <Link href="/">Volver al inicio</Link>
      </Box>
    </Container>
  );
}