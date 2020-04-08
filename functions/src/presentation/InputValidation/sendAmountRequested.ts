import { celebrate, Segments, Joi } from "celebrate";

export const sendAmountRequestedValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    data: Joi.number().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});
