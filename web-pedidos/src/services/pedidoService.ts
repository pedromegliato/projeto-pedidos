import { api } from "./ApiService";
import type { Pedido } from "@/types/pedido";

export const getPedidos = () => api.get<Pedido[]>('/pedidos');
export const createPedido = (payload: Omit<Pedido, 'id_pedido' | 'data_criacao' | 'data_atualizacao' | 'itens'>) => 
  api.post('/pedidos', payload);
export const updatePedido = (id_pedido: number, payload: Partial<Pedido>) => 
  api.patch(`/pedidos/${id_pedido}`, payload);
export const deletePedido = (id_pedido: number) => 
  api.delete(`/pedidos/${id_pedido}`);
