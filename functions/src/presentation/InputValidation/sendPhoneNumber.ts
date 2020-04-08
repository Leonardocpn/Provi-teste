import { celebrate, Segments, Joi } from "celebrate";

export const sendPhoneNumberValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    data: Joi.string()
      .required()
      .regex(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)
      .error(new Error("Informar o telefone no formato (DD) 99999-9999")),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});
