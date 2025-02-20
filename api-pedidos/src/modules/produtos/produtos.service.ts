import { IsNull } from 'typeorm';
import { AppDataSource } from '../../config/ormconfig';
import { Produto } from '../../entities/Produto';
import { CreateProdutoDTO, UpdateProdutoDTO } from './produtos.dto';

export class ProdutosService {
  private repo = AppDataSource.getRepository(Produto);

  async findAll(): Promise<Produto[]> {
    return this.repo.find({ where: { data_desativacao: IsNull() } });
}

  async findById(id: number): Promise<Produto | null> {
    return this.repo.findOne({ where: { id_produto: id,  data_desativacao: IsNull()  } });
  }

  async create(data: CreateProdutoDTO): Promise<Produto> {
    const produto = this.repo.create(data);
    return this.repo.save(produto);
  }

  async update(id: number, data: UpdateProdutoDTO): Promise<Produto | null> {
    const produto = await this.findById(id);
    if (!produto) return null;
    Object.assign(produto, data);
    return this.repo.save(produto);
  }

  async delete(id: number): Promise<boolean> {
    const produto = await this.repo.findOneBy({ id_produto: id });
    if (!produto || produto.data_desativacao) return false;
    produto.data_desativacao = new Date();
    await this.repo.save(produto);
    return true;
  }
}
