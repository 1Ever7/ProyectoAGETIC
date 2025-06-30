'use client';
import { useEffect, useState } from 'react';
import {
  Box, Button, TextField, Typography, Stack, CircularProgress,
} from '@mui/material';
import {
  getParticipantes,
  deleteParticipante,
} from '@/services/participantes/participantesService';
import ParticipantesTable from '@/components/participantes/ParticipantesTable';
import ParticipanteForm from '@/components/participantes/ParticipanteForm';
import { Participante } from '@/types/Participante';

export default function ParticipantesPage() {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    documentoIdentidad: '',

    departamento: '',
    provincia: '',
    municipio: '',

  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Participante | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Ojo que el backend espera filtro en snake_case,
      // puedes hacer un mapeo si quieres o adaptar backend/frontend
      // Aquí mando directamente el filtro (ajusta si es necesario)
      const response = await getParticipantes(filtro);
      setParticipantes(response.data);
    } catch (e) {
      console.error('Error al obtener participantes', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteParticipante(id);
      fetchData();
    } catch (error) {
      console.error('Error al eliminar participante', error);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Participantes
      </Typography>

      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap">
        <TextField
          label="Documento Identidad"
          value={filtro.documentoIdentidad}
          onChange={(e) => setFiltro({ ...filtro, documentoIdentidad: e.target.value })}
          size="small"
        />
        
        <TextField
          label="Departamento"
          value={filtro.departamento}
          onChange={(e) => setFiltro({ ...filtro, departamento: e.target.value })}
          size="small"
        />
        <TextField
          label="Provincia"
          value={filtro.provincia}
          onChange={(e) => setFiltro({ ...filtro, provincia: e.target.value })}
          size="small"
        />
        <TextField
          label="Municipio"
          value={filtro.municipio}
          onChange={(e) => setFiltro({ ...filtro, municipio: e.target.value })}
          size="small"
        />
        <Button variant="contained" onClick={fetchData}>
          Buscar
        </Button>
        <Button variant="outlined" onClick={() => {
          setEditData(null);
          setModalOpen(true);
        }}>
          Agregar Participante
        </Button>
       <Button variant="contained" onClick={() => {
        setFiltro({
          documentoIdentidad: '',
          departamento: '',
          provincia: '',
          municipio: '',
        });
        fetchData();
      }}>
        Listar
      </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <ParticipantesTable
          participantes={participantes}
          onRefresh={fetchData}
          onEdit={(data) => {
            setEditData(data);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <ParticipanteForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchData}
        initialData={editData}
      />
    </Box>
  );
}
