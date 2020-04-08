import { celebrate, Segments, Joi } from "celebrate";

export const sendBirthdayValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    data: Joi.string()
      .required()
      .regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
      .error(new Error("Inserir a data no formato DD/MM/AAAA")),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});
