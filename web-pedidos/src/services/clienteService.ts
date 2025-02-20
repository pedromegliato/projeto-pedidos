import { api } from "./ApiService";

export const getClientes = () => api.get('/clientes');
export const createCliente = (payload: any) => api.post('/clientes', payload);
export const updateCliente = (id: number, payload: any) => api.patch(`/clientes/${id}`, payload);
export const deleteCliente = (id: number) => api.delete(`/clientes/${id}`);
