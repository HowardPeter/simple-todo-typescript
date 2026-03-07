import type { ToDo } from './todo.type.js';

export type TodoResponseDTO = ToDo;
export type CreateTodoDTO = Omit<ToDo, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTodoDTO = Partial<Omit<ToDo, 'id' | 'createdAt' | 'updatedAt'>>;