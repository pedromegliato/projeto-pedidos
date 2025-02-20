export interface CreatePedidoItemDTO {
    id_pedido: number;
    id_produto: number;
    qtde: number;
    preco: number;
  }
  
  export interface UpdatePedidoItemDTO {
    id_pedido?: number;
    id_produto?: number;
    qtde?: number;
    preco?: number;
  }
  