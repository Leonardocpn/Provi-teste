import { celebrate, Segments, Joi } from "celebrate";

export const sendCpfValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    data: Joi.string()
      .required()
      .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .error(new Error("Informar o cpf no formato 123.456.789-10")),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});
