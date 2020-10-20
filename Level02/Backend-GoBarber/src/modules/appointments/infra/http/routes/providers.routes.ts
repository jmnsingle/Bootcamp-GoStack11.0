import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import MonthProviderAvailabilityController from '@modules/appointments/infra/http/controllers/MonthProviderAvailabilityController';
import DayProviderAvailabilityController from '@modules/appointments/infra/http/controllers/DayProviderAvailabilityController';

const providersRoutes = Router();
const providersController = new ProvidersController();
const monthProviderAvailabilityController = new MonthProviderAvailabilityController();
const dayProviderAvailabilityController = new DayProviderAvailabilityController();

providersRoutes.use(ensureAuthenticaded);

providersRoutes.get('/', providersController.index);
providersRoutes.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  monthProviderAvailabilityController.index,
);
providersRoutes.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  dayProviderAvailabilityController.index,
);

export default providersRoutes;
