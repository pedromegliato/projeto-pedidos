import { DataSource } from 'typeorm';
import { Cliente } from '../entities/Clientes';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'db_pedidos',
  synchronize: false, // use true apenas em desenvolvimento!
  logging: false,
  entities: [Cliente /*, Product, Order, OrderItem */],
});
