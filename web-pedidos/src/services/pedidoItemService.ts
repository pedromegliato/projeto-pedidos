import { api } from "./ApiService";
import type { PedidoItem } from "@/types/pedidoItem";

export const getPedidoItens = (pedidoId: number) => 
  api.get<PedidoItem[]>(`/pedidos/${pedidoId}/itens`);
export const createPedidoItem = (
  pedidoId: number, 
  payload: Omit<PedidoItem, 'id_pedido_item' | 'data_criacao' | 'data_atualizacao' | 'pedido'>
) =>
  api.post(`/pedidos/${pedidoId}/itens`, payload);
export const updatePedidoItem = (pedidoId: number, id: number, payload: Partial<PedidoItem>) =>
  api.patch(`/pedidos/${pedidoId}/itens/${id}`, payload);
export const deletePedidoItem = (pedidoId: number, id: number) =>
  api.delete(`/pedidos/${pedidoId}/itens/${id}`);
