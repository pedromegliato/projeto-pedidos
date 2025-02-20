import { api } from "./ApiService";

export const getProdutos = () => api.get('/produtos');
export const createProduto = (payload: any) => api.post('/produtos', payload);
export const updateProduto = (id: number, payload: any) => api.patch(`/produtos/${id}`, payload);
export const deleteProduto = (id: number) => api.delete(`/produtos/${id}`);
