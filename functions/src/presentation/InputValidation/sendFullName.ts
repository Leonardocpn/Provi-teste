import { celebrate, Segments, Joi } from "celebrate";

export const sendFullNameValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    data: Joi.string().required().min(10),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});
