import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';

import { Cliente } from './Clientes';
import { PedidoItem } from './PedidoItens';
  
  @Entity({ name: 'pedidos' })
  export class Pedido {
    @PrimaryGeneratedColumn()
    id_pedido: number;
  
    @Column({ type: 'date' })
    data: Date;
  
    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente;
  
    @OneToMany(() => PedidoItem, pedidoItem => pedidoItem.pedido, { cascade: true })
    itens: PedidoItem[];
  
    @CreateDateColumn()
    data_criacao: Date;
  
    @UpdateDateColumn()
    data_atualizacao: Date;
  }
  