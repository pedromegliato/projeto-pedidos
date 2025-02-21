-- Cria o banco de dados se não existir e o selecion
CREATE DATABASE IF NOT EXISTS db_pedidos;
USE db_pedidos;

-----------------------------------------------------------
-- Criação das tabelass
-----------------------------------------------------------
-- Tabela: clientees
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

-- Tabela: pdidos
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

-----------------------------------------------------------
-- Inserts de dados fictícios para clientes e produtos
-----------------------------------------------------------
-- Inserindo 20 clintes
INSERT INTO clientes (nome, email, telefone, endereco, cpf, data_nascimento) VALUES
('Cliente 1', 'cliente1@example.com', '1111-1111', 'Rua A, 123', '123.456.789-01', '1990-01-01'),
('Cliente 2', 'cliente2@example.com', '2222-2222', 'Rua B, 456', '123.456.789-02', '1985-02-02'),
('Cliente 3', 'cliente3@example.com', '3333-3333', 'Rua C, 789', '123.456.789-03', '1978-03-03'),
('Cliente 4', 'cliente4@example.com', '4444-4444', 'Rua D, 101', '123.456.789-04', '1992-04-04'),
('Cliente 5', 'cliente5@example.com', '5555-5555', 'Rua E, 202', '123.456.789-05', '1988-05-05'),
('Cliente 6', 'cliente6@example.com', '6666-6666', 'Rua F, 303', '123.456.789-06', '1995-06-06'),
('Cliente 7', 'cliente7@example.com', '7777-7777', 'Rua G, 404', '123.456.789-07', '1980-07-07'),
('Cliente 8', 'cliente8@example.com', '8888-8888', 'Rua H, 505', '123.456.789-08', '1975-08-08'),
('Cliente 9', 'cliente9@example.com', '9999-9999', 'Rua I, 606', '123.456.789-09', '1991-09-09'),
('Cliente 10', 'cliente10@example.com', '1010-1010', 'Rua J, 707', '123.456.789-10', '1983-10-10'),
('Cliente 11', 'cliente11@example.com', '1111-2222', 'Avenida K, 808', '123.456.789-11', '1993-11-11'),
('Cliente 12', 'cliente12@example.com', '2222-3333', 'Avenida L, 909', '123.456.789-12', '1987-12-12'),
('Cliente 13', 'cliente13@example.com', '3333-4444', 'Avenida M, 1010', '123.456.789-13', '1994-01-13'),
('Cliente 14', 'cliente14@example.com', '4444-5555', 'Avenida N, 1111', '123.456.789-14', '1982-02-14'),
('Cliente 15', 'cliente15@example.com', '5555-6666', 'Avenida O, 1212', '123.456.789-15', '1979-03-15'),
('Cliente 16', 'cliente16@example.com', '6666-7777', 'Avenida P, 1313', '123.456.789-16', '1996-04-16'),
('Cliente 17', 'cliente17@example.com', '7777-8888', 'Avenida Q, 1414', '123.456.789-17', '1984-05-17'),
('Cliente 18', 'cliente18@example.com', '8888-9999', 'Avenida R, 1515', '123.456.789-18', '1990-06-18'),
('Cliente 19', 'cliente19@example.com', '9999-0000', 'Avenida S, 1616', '123.456.789-19', '1981-07-19'),
('Cliente 20', 'cliente20@example.com', '0000-1111', 'Avenida T, 1717', '123.456.789-20', '1977-08-20');

-- Inserindo 20 produtos
INSERT INTO produtos (nome, preco, sku) VALUES
('Produto 1', 10.00, 'SKU-0001'),
('Produto 2', 15.50, 'SKU-0002'),
('Produto 3', 20.00, 'SKU-0003'),
('Produto 4', 25.75, 'SKU-0004'),
('Produto 5', 30.00, 'SKU-0005'),
('Produto 6', 35.20, 'SKU-0006'),
('Produto 7', 40.00, 'SKU-0007'),
('Produto 8', 45.80, 'SKU-0008'),
('Produto 9', 50.00, 'SKU-0009'),
('Produto 10', 55.55, 'SKU-0010'),
('Produto 11', 60.00, 'SKU-0011'),
('Produto 12', 65.99, 'SKU-0012'),
('Produto 13', 70.00, 'SKU-0013'),
('Produto 14', 75.75, 'SKU-0014'),
('Produto 15', 80.00, 'SKU-0015'),
('Produto 16', 85.85, 'SKU-0016'),
('Produto 17', 90.00, 'SKU-0017'),
('Produto 18', 95.95, 'SKU-0018'),
('Produto 19', 100.00, 'SKU-0019'),
('Produto 20', 105.50, 'SKU-0020');

-----------------------------------------------------------
-- Inserção de Pedidos e Pedido Itens com múltiplos itens por pedido
-----------------------------------------------------------

DELIMITER $$

CREATE PROCEDURE insert_fake_pedidos()
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE j INT;
  DECLARE num_itens INT;
  DECLARE random_cliente INT;
  DECLARE random_produto INT;
  DECLARE random_qtde INT;
  DECLARE random_data DATE;
  
  WHILE i <= 30 DO
    -- Seleciona um cliente aleatório (entre 1 e 20)
    SET random_cliente = FLOOR(1 + RAND() * 20);
    -- Define uma data aleatória no mês de janeiro de 2025
    SET random_data = DATE_ADD('2025-01-01', INTERVAL FLOOR(RAND()*30) DAY);
    -- Insere o pedido
    INSERT INTO pedidos(data, id_cliente) VALUES (random_data, random_cliente);
    -- Captura o id do pedido inserido
    SET @pedido_id = LAST_INSERT_ID();
    
    -- Define um número aleatório de itens para este pedido (mínimo 1, máximo 5)
    SET num_itens = FLOOR(1 + RAND()*5);
    SET j = 1;
    WHILE j <= num_itens DO
      -- Seleciona um produto aleatório (entre 1 e 20)
      SET random_produto = FLOOR(1 + RAND()*20);
      -- Define uma quantidade aleatória (entre 1 e 10)
      SET random_qtde = FLOOR(1 + RAND()*10);
      -- Insere o item do pedido, buscando o preço unitário do produto
      INSERT INTO pedido_itens (id_pedido, id_produto, qtde, preco)
        SELECT @pedido_id, id_produto, random_qtde, preco
        FROM produtos
        WHERE id_produto = random_produto;
      SET j = j + 1;
    END WHILE;
    
    SET i = i + 1;
  END WHILE;
END$$

DELIMITER ;

-- Procedimento para inserir os pedidos e os itens
CALL insert_fake_pedidos();

-- Remove o procedimento 
DROP PROCEDURE IF EXISTS insert_fake_pedidos;
