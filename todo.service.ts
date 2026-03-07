import type { CreateTodoDTO, TodoResponseDTO, UpdateTodoDTO } from './todo.dto.js';
import { TodoRepository } from './todo.repository.js';
import type { ToDo } from './todo.type.js';

export class TodoService {
  constructor(private readonly repo: TodoRepository) { }

  private toResponseDTO(todo: ToDo): TodoResponseDTO {
    return todo;
  }

  async getAll(): Promise<TodoResponseDTO[]> {
    const todos = await this.repo.findAll();
    return todos.map(t => this.toResponseDTO(t));
  }

  async getById(id: number): Promise<TodoResponseDTO | null> {
    const todo = await this.repo.findById(id);
    return todo ? this.toResponseDTO(todo) : null;
  }

  async create(dto: CreateTodoDTO): Promise<TodoResponseDTO> {
    const todo = await this.repo.create(dto);
    return this.toResponseDTO(todo);
  }

  async update(id: number, dto: UpdateTodoDTO): Promise<TodoResponseDTO | null> {
    const todo = await this.repo.update(id, dto);
    return todo ? this.toResponseDTO(todo) : null;
  }

  async delete(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }
}