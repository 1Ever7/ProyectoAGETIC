'use client';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Participante } from '@/types/Participante';

interface Props {
  participantes: Participante[];
  onEdit: (data: Participante) => void;
  onDelete: (id: number) => void;
  onRefresh: () => void;
}

export default function ParticipantesTable({ participantes, onEdit, onDelete }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Equipo</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Provincia</TableCell>
            <TableCell>Municipio</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell> {/* ✅ Aquí van los botones */}
          </TableRow>
        </TableHead>
        <TableBody>
          {participantes.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.nombreEquipo}</TableCell>
              <TableCell>{p.documentoIdentidad}</TableCell>
              <TableCell>{p.nombreCompleto}</TableCell>
              <TableCell>{p.departamento}</TableCell>
              <TableCell>{p.provincia}</TableCell>
              <TableCell>{p.municipio}</TableCell>
              <TableCell>{p.rol}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => onEdit(p)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(p.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
