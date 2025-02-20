import { IsNull } from 'typeorm';
import { AppDataSource } from '../../config/ormconfig';
import { Pedido } from '../../entities/Pedido';
import { CreatePedidoDTO, UpdatePedidoDTO } from './pedidos.dto';

export class PedidosService {
  private repo = AppDataSource.getRepository(Pedido);

  async findAll(): Promise<Pedido[]> {
    return this.repo.find({
      where: { data_desativacao: IsNull() },
      relations: ['cliente', 'itens']
    });
  }

  async findById(id: number): Promise<Pedido | null> {
    return this.repo.findOne({
      where: { id_pedido: id, data_desativacao: IsNull() },
      relations: ['cliente', 'itens']
    });
  }

  async create(data: CreatePedidoDTO): Promise<Pedido> {
    const pedido = this.repo.create({
      data: new Date(data.data),
      cliente: { id_cliente: data.id_cliente } as any
    });
    return this.repo.save(pedido);
  }

  async update(id: number, data: UpdatePedidoDTO): Promise<Pedido | null> {
    const pedido = await this.findById(id);
    if (!pedido) return null;
    if (data.data) {
      pedido.data = new Date(data.data);
    }
    if (data.id_cliente) {
      pedido.cliente = { id_cliente: data.id_cliente } as any;
    }
    return this.repo.save(pedido);
  }

  async delete(id: number): Promise<boolean> {
    const pedido = await this.repo.findOneBy({ id_pedido: id });
    if (!pedido || pedido.data_desativacao) return false;
    pedido.data_desativacao = new Date();
    await this.repo.save(pedido);
    return true;
  }
}
