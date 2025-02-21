import type { Pedido } from './pedido';
import type { Produto } from './produto';

export interface PedidoItem {
  id_pedido_item?: number;
  pedido: Pedido;
  produto: Produto;
  quantidade: number;
  preco: number;
  data_criacao?: Date;
  data_atualizacao?: Date;
  data_desativacao?: Date;
}
