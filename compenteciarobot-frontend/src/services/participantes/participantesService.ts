import api from '../api';

export const getParticipantes = (params?: any) =>
  api.get('/participantes', { params });

export const createParticipante = (data: any) =>
  api.post('/participantes', data);

export const updateParticipante = (id: number, data: any) =>
  api.put(`/participantes/${id}`, data);

export const deleteParticipante = (id: number) =>
  api.delete(`/participantes/${id}`);
