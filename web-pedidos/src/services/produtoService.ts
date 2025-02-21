import { Produto } from "@/types/produto";
import { api } from "./ApiService";

export const getProdutos = () => api.get<Produto[]>('/produtos');
export const createProduto = (payload: Omit<Produto, 'id_produto'>) => api.post('/produtos', payload);
export const updateProduto = (id_produto: number, payload:  Partial<Produto>) => api.patch(`/produtos/${id_produto}`, payload);
export const deleteProduto = (id_produto: number) => api.delete(`/produtos/${id_produto}`);
