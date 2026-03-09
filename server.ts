import express from 'express';

import { errorMiddleware } from './middlewares/error-handler.js';
import todoRoute from './todo.route.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/todos', todoRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}`);
});
