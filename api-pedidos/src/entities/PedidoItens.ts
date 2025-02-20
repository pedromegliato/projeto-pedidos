import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  import { Pedido } from './Pedido';
  import { Produto } from './Produto';
  
  @Entity({ name: 'pedido_itens' })
  export class PedidoItem {
    @PrimaryGeneratedColumn()
    id_pedido_item: number;
  
    @ManyToOne(() => Pedido, pedido => pedido.itens)
    @JoinColumn({ name: 'id_pedido' })
    pedido: Pedido;
  
    @ManyToOne(() => Produto)
    @JoinColumn({ name: 'id_produto' })
    produto: Produto;
  
    @Column({ type: 'int' })
    qtde: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco: number;
  
    @CreateDateColumn()
    data_criacao: Date;
  
    @UpdateDateColumn()
    data_atualizacao: Date;
  }
  