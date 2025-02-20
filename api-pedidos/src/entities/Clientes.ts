import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  @Entity({ name: 'clientes' })
  export class Cliente {
    @PrimaryGeneratedColumn()
    id_cliente: number;
  
    @Column({ type: 'varchar', length: 255 })
    nome: string;
  
    @Column({ type: 'varchar', length: 255 })
    email: string;
  
    @Column({ type: 'varchar', length: 20, nullable: true })
    telefone?: string;
  
    @Column({ type: 'text', nullable: true })
    endereco?: string;
  
    @Column({ type: 'varchar', length: 14, nullable: true })
    cpf?: string;
  
    @Column({ type: 'date', nullable: true })
    data_nascimento?: Date;
  
    @CreateDateColumn()
    data_criacao: Date;
  
    @UpdateDateColumn()
    data_atualizacao: Date;

    @Column({ type: 'date', nullable: true })
    data_desativacao?: Date;
  }
  