import { DataSource } from 'typeorm';
import { Cliente } from '../entities/Clientes';
import { Pedido } from '../entities/Pedido';
import { PedidoItem } from '../entities/PedidoItens';
import { Produto } from '../entities/Produto';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'db_pedidos',
  synchronize: true,
  logging: true,
  entities: [Cliente, Pedido, PedidoItem, Produto],});
