import { IsNull } from 'typeorm';
import { AppDataSource } from '../../config/ormconfig';
import { Pedido } from '../../entities/Pedido';
import { PedidoItem } from '../../entities/PedidoItens'; 
import { CreatePedidoPayloadDTO, UpdatePedidoPayloadDTO } from './pedidos.dto';

export class PedidosService {
  private repo = AppDataSource.getRepository(Pedido);
  private pedidoItemRepo = AppDataSource.getRepository(PedidoItem);

  async findAll(): Promise<Pedido[]> {
    return this.repo.find({
      where: { data_desativacao: IsNull() },
      relations: ['cliente', 'itens', 'itens.produto']
    });
  }

  async findById(id: number): Promise<Pedido | null> {
    return this.repo.findOne({
      where: { id_pedido: id, data_desativacao: IsNull() },
      relations: ['cliente', 'itens', 'itens.produto']
    });
  }

  async create(data: CreatePedidoPayloadDTO): Promise<Pedido> {
    const pedido = this.repo.create({
      data: new Date(data.data),
      cliente: { id_cliente: data.cliente.id_cliente } as any,
      itens: (data.itens?.map(item => ({
        produto: { id_produto: item.produto.id_produto } as any,
        qtde: item.qtde,
        preco: item.preco,
        pedido: undefined 
      })) as any) || []
    });
    return this.repo.save(pedido);
  }

  async update(id: number, data: UpdatePedidoPayloadDTO): Promise<Pedido | null> {
    const pedido = await this.findById(id);
    if (!pedido) return null;

    if (data.data) {
      pedido.data = new Date(data.data);
    }
    if (data.cliente) {
      pedido.cliente = { id_cliente: data.cliente.id_cliente } as any;
    }

    if (data.itens) {
      const payloadItemIds = new Set<number>();
      data.itens.forEach(item => {
        if (item.id_pedido_item) {
          payloadItemIds.add(item.id_pedido_item);
        }
      });

      const itensParaRemover = pedido.itens.filter(
        item => item.id_pedido_item && !payloadItemIds.has(item.id_pedido_item)
      );
      if (itensParaRemover.length > 0) {
        await this.pedidoItemRepo.remove(itensParaRemover);
      }

      const itensAtualizados: PedidoItem[] = [];
      for (const itemPayload of data.itens) {
        if (itemPayload.id_pedido_item) {
          const itemExistente = pedido.itens.find(
            item => item.id_pedido_item === itemPayload.id_pedido_item
          );
          if (itemExistente) {
            itemExistente.qtde = itemPayload.qtde!;
            itemExistente.preco = itemPayload.preco!;
            itemExistente.produto = { id_produto: itemPayload.produto!.id_produto } as any;
            itensAtualizados.push(itemExistente);
          }
        } else {
          const novoItem = this.pedidoItemRepo.create({
            produto: { id_produto: itemPayload.produto!.id_produto } as any,
            qtde: itemPayload.qtde!,
            preco: itemPayload.preco!,
            pedido: pedido 
          });
          itensAtualizados.push(novoItem);
        }
      }
      pedido.itens = itensAtualizados;
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
