export interface CreateClienteDTO {
    nome: string;
    email: string;
    telefone?: string;
    endereco?: string;
    cpf?: string;
    data_nascimento?: string;
  }
  
  export interface UpdateClienteDTO {
    nome?: string;
    email?: string;
    telefone?: string;
    endereco?: string;
    cpf?: string;
    data_nascimento?: string;
  }
  