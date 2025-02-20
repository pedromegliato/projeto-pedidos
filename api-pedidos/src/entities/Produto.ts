import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert
  } from 'typeorm';
  import { v4 as uuidv4 } from 'uuid';
  
  @Entity({ name: 'produtos' })
  export class Produto {
    @PrimaryGeneratedColumn()
    id_produto: number;
  
    @Column({ type: 'varchar', length: 255 })
    nome: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    preco: number;
  
    @Column({ type: 'varchar', length: 36, unique: true })
    sku: string;
  
    @CreateDateColumn()
    data_criacao: Date;
  
    @UpdateDateColumn()
    data_atualizacao: Date;
  
    @BeforeInsert()
    generateSKU() {
      this.sku = uuidv4();
    }
  }
  