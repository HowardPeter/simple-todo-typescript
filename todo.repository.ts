import { prisma } from './prismaClient.js';

import type { CreateTodoDTO, UpdateTodoDTO } from './todo.dto.js';
import type { ToDo } from './todo.type.js';

export class TodoRepository {
  async findAll(): Promise<ToDo[]> {
    return prisma.todo.findMany({ orderBy: { id: 'desc' } });
  }

  async findById(id: number): Promise<ToDo | null> {
    return prisma.todo.findUnique({ where: { id } });
  }

  async create(data: CreateTodoDTO): Promise<ToDo> {
    return prisma.todo.create({ data });
  }

  async update(id: number, data: UpdateTodoDTO): Promise<ToDo | null> {
    // Prisma update sẽ throw nếu không tồn tại
    const existing = await this.findById(id);

    if (!existing) return null;

    return prisma.todo.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<boolean> {
    const existing = await this.findById(id);

    if (!existing) return false;

    await prisma.todo.delete({ where: { id } });

    return true;
  }
}
