import { api } from "./ApiService";
import type { Cliente } from "@/types/cliente";

export const getClientes = () => api.get<Cliente[]>('/clientes');
export const createCliente = (payload: Omit<Cliente, 'id_cliente'>) => api.post('/clientes', payload);
export const updateCliente = (id_cliente: number, payload: Partial<Cliente>) => api.patch(`/clientes/${id_cliente}`, payload);
export const deleteCliente = (id_cliente: number) => api.delete(`/clientes/${id_cliente}`);
