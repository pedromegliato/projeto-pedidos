import { api } from "./ApiService";

export const getPedidos = () => api.get('/pedidos');
export const createPedido = (payload: any) => api.post('/pedidos', payload);
export const updatePedido = (id: number, payload: any) => api.patch(`/pedidos/${id}`, payload);
export const deletePedido = (id: number) => api.delete(`/pedidos/${id}`);
