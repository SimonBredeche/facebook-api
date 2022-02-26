import express, { response } from 'express';
import routes from './routes/index.js';
import asyncErrorMiddleware from './middlewares/errors.middleware.js';

export const launch = ({ protocol, port, host }) => {
  const application = express();

  application.use(express.json());
  application.use(routes);
  application.use(asyncErrorMiddleware)
  application.listen(
    port,
    () => console.log(`API ready at ${protocol}://${host}:${port}`),
  );
}
