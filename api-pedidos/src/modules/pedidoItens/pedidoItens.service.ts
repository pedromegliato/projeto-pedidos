import { IsNull } from 'typeorm';
import { AppDataSource } from '../../config/ormconfig';
import { PedidoItem } from '../../entities/PedidoItens';
import { CreatePedidoItemDTO, UpdatePedidoItemDTO } from './pedidoItens.dto';

export class PedidoItensService {
  private repo = AppDataSource.getRepository(PedidoItem);

  async findAll(): Promise<PedidoItem[]> {
    return this.repo.find({ where: { data_desativacao: IsNull() } });
  }

  async findById(id: number): Promise<PedidoItem | null> {
    return this.repo.findOne({
      where: { id_pedido_item: id, data_desativacao: IsNull() }
    });
  }

  async create(data: CreatePedidoItemDTO): Promise<PedidoItem> {
    const pedidoItem = this.repo.create(data);
    return this.repo.save(pedidoItem);
  }

  async update(id: number, data: UpdatePedidoItemDTO): Promise<PedidoItem | null> {
    const pedidoItem = await this.findById(id);
    if (!pedidoItem) return null;
    Object.assign(pedidoItem, data);
    return this.repo.save(pedidoItem);
  }

  async delete(id: number): Promise<boolean> {
    const pedidoItem = await this.repo.findOneBy({ id_pedido_item: id });
    if (!pedidoItem || pedidoItem.data_desativacao) return false;
    pedidoItem.data_desativacao = new Date();
    await this.repo.save(pedidoItem);
    return true;
  }
}
