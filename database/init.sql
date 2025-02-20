-- Cria o banco de dados se não existir e o seleciona
CREATE DATABASE IF NOT EXISTS db_pedidos;
USE db_pedidos;

-- Tabela: clientes
CREATE TABLE IF NOT EXISTS clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  endereco TEXT,
  cpf VARCHAR(14),
  data_nascimento DATE,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  data_desativacao DATE
) ENGINE=InnoDB;

-- Tabela: produtos
CREATE TABLE IF NOT EXISTS produtos (
  id_produto INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  sku VARCHAR(36) NOT NULL UNIQUE,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  data_desativacao DATE
) ENGINE=InnoDB;

-- Tabela: pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  data DATE NOT NULL,
  id_cliente INT NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  data_desativacao DATE,
  CONSTRAINT fk_pedidos_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Tabela: pedido_itens
CREATE TABLE IF NOT EXISTS pedido_itens (
  id_pedido_item INT AUTO_INCREMENT PRIMARY KEY,
  id_pedido INT NOT NULL,
  id_produto INT NOT NULL,
  qtde INT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  data_desativacao DATE,
  CONSTRAINT fk_pedido_itens_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_pedido_itens_produto FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;
