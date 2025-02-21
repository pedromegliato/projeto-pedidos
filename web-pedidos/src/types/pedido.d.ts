import type { Cliente } from './cliente';
import type { PedidoItem } from './pedidoItem';

export interface Pedido {
  id_pedido?: number;
  data: Date;
  cliente: Cliente | null;
  itens?: PedidoItem[];
  data_criacao?: Date;
  data_atualizacao?: Date;
  data_desativacao?: Date;
}
