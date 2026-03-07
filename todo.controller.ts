import type { Request, Response } from 'express';
import type { ApiResponse } from './todo.type.js';
import type { CreateTodoDTO, UpdateTodoDTO, TodoResponseDTO } from './todo.dto.js';
import { TodoService } from './todo.service.js';

export class TodoController {
  constructor(private readonly service: TodoService) { }

  getAll = async (_req: Request, res: Response<ApiResponse<TodoResponseDTO[]>>) => {
    const data = await this.service.getAll();
    res.json({ success: true, data });
  };

  getById = async (req: Request, res: Response<ApiResponse<TodoResponseDTO>>) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const data = await this.service.getById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.json({ success: true, data });
  };

  create = async (req: Request, res: Response<ApiResponse<TodoResponseDTO>>) => {
    const { title, description } = req.body as Partial<CreateTodoDTO>; // các poperties thành Partial (optional)

    // vẫn cần if này vì Partial sẽ mất ở runtime
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'title and description are required',
      });
    }

    const data = await this.service.create({ title, description });
    res.status(201).json({ success: true, data });
  };

  update = async (req: Request, res: Response<ApiResponse<TodoResponseDTO>>) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const dto = req.body as UpdateTodoDTO;
    if (dto.title === undefined && dto.description === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Nothing to update',
      });
    }

    const data = await this.service.update(id, dto);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.json({ success: true, data });
  };

  delete = async (req: Request, res: Response<ApiResponse<null>>) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const ok = await this.service.delete(id);
    if (!ok) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }

    res.json({ success: true, data: null });
  };
}