export interface CreateProdutoDTO {
    nome: string;
    preco: number;
  }
  
  export interface UpdateProdutoDTO {
    nome?: string;
    preco?: number;
  }
  