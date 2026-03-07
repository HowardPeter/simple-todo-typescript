import express from 'express';
import todoRoute from './todo.route.js';
import { errorMiddleware } from './middlewares/error-handler.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/todos', todoRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});