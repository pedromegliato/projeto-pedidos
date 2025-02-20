import { api } from "./ApiService";

export const getPedidoItens = (pedidoId: number) => api.get(`/pedidos/${pedidoId}/itens`);
export const createPedidoItem = (pedidoId: number, payload: any) =>
  api.post(`/pedidos/${pedidoId}/itens`, payload);
export const updatePedidoItem = (pedidoId: number, id: number, payload: any) =>
  api.patch(`/pedidos/${pedidoId}/itens/${id}`, payload);
export const deletePedidoItem = (pedidoId: number, id: number) =>
  api.delete(`/pedidos/${pedidoId}/itens/${id}`);
