import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import users from './users.routes';
import sessions from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
