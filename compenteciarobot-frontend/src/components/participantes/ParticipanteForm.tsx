'use client';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { Participante } from '@/types/Participante';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Participante | null;
  
}

export default function ParticipanteForm({ open, onClose, onSuccess, initialData }: Props) {
  const [form, setForm] = useState<any>({
    nombreEquipo: '',
    documentoIdentidad: '',
    nombreCompleto: '',
    fechaNacimiento: '',
    departamento: '',
    provincia: '',
    municipio: '',
    rol: 'participante',
    competencia_id: 1 // por defecto
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, competencia_id: initialData.competencia?.id || 1 });
    }
  }, [initialData]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const method = initialData ? 'updateParticipante' : 'createParticipante';
    const service = (await import('@/services/participantes/participantesService')) as any;
    await service[method](initialData?.id, form);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Editar' : 'Agregar'} Participante</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Nombre Equipo" name="nombreEquipo" value={form.nombreEquipo} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="CI" name="documentoIdentidad" value={form.documentoIdentidad} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Nombre Completo" name="nombreCompleto" value={form.nombreCompleto} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Nacimiento" name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} margin="dense" InputLabelProps={{ shrink: true }} />
        <TextField fullWidth label="Departamento" name="departamento" value={form.departamento} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Provincia" name="provincia" value={form.provincia} onChange={handleChange} margin="dense" />
        <TextField fullWidth label="Municipio" name="municipio" value={form.municipio} onChange={handleChange} margin="dense" />
        <TextField fullWidth select label="Rol" name="rol" value={form.rol} onChange={handleChange} margin="dense">
          <MenuItem value="participante">Participante</MenuItem>
          <MenuItem value="tutor">Tutor</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
