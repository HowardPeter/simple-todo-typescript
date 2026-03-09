import { Router } from 'express';

import { asyncWrapper } from './middlewares/async-wrapper.js';
import { TodoController } from './todo.controller.js';
import { TodoRepository } from './todo.repository.js';
import { TodoService } from './todo.service.js';

const router = Router();

const repo = new TodoRepository();
const service = new TodoService(repo);
const controller = new TodoController(service);

router.get('/', asyncWrapper(controller.getAll));
router.get('/:id', asyncWrapper(controller.getById));
router.post('/', asyncWrapper(controller.create));
router.put('/:id', asyncWrapper(controller.update));
router.delete('/:id', asyncWrapper(controller.delete));

export default router;
