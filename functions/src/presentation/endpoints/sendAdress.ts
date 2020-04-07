import {
  SendAdressUserUc,
  SendAdressUserUcInput,
} from "../../business/useCases/user/sendAdress";
import { ViaCep } from "../../services/viaCep";
import { UserDataBase } from "../../data/userDataBase";
import { JWTCryptography } from "../../services/JWTCryptography";
import { Request, Response } from "express";

export const sendAdressEndpoint = async (req: Request, res: Response) => {
  try {
    const useCase = new SendAdressUserUc(
      new JWTCryptography(),
      new UserDataBase(),
      new ViaCep(),
      new UserDataBase()
    );

    const input: SendAdressUserUcInput = {
      token: req.headers.authorization,
      cep: req.body.cep,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
