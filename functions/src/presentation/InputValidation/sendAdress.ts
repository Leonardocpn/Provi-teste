import { celebrate, Segments, Joi } from "celebrate";

export const sendAdressValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    cep: Joi.string()
      .regex(/\d{5}-\d{3}/)
      .error(new Error("Informar o cep no formato 01234-567")),
    street: Joi.string().required(),
    number: Joi.number().required(),
    complement: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required().length(2),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});
