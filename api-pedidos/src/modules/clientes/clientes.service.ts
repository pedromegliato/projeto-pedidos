import { AppDataSource } from '../../config/ormconfig';
import { Cliente } from '../../entities/Clientes';
import { CreateClienteDTO, UpdateClienteDTO } from './clientes.dto';

export class ClientesService {
  private repo = AppDataSource.getRepository(Cliente);

  async findAll(): Promise<Cliente[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<Cliente | null> {
    return this.repo.findOneBy({ id_cliente: id });
  }

  async create(data: CreateClienteDTO): Promise<Cliente> {
    const cliente = this.repo.create({
      ...data,
      data_nascimento: data.data_nascimento ? new Date(data.data_nascimento) : undefined,
    });
    return this.repo.save(cliente);
  }

  async update(id: number, data: UpdateClienteDTO): Promise<Cliente | null> {
    const cliente = await this.findById(id);
    if (!cliente) return null;
    Object.assign(cliente, {
      ...data,
      data_nascimento: data.data_nascimento ? new Date(data.data_nascimento) : cliente.data_nascimento,
    });
    return this.repo.save(cliente);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
