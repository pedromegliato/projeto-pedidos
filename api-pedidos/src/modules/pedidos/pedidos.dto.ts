export interface CreatePedidoPayloadDTO {
  data: string;
  cliente: {
    id_cliente: number;
    nome?: string;
    email?: string;
    telefone?: string;
  };
  itens?: CreatePedidoItemPayloadDTO[];
}

export interface UpdatePedidoPayloadDTO {
  data?: string;
  cliente?: {
    id_cliente: number;
    nome?: string;
    email?: string;
    telefone?: string;
  };
  itens?: UpdatePedidoItemPayloadDTO[];
}

export interface CreatePedidoItemPayloadDTO {
  produto: {
    id_produto: number;
    nome?: string;
    preco: number;
    sku?: string;
  };
  qtde: number;
  preco: number;
}

export interface UpdatePedidoItemPayloadDTO {
  id_pedido_item?: number;
  produto?: {
    id_produto: number;
    nome?: string;
    preco: number;
    sku?: string;
  };
  qtde?: number;
  preco?: number;
}
