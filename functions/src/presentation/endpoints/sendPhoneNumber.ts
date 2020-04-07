import {
  SendPhoneNumberUserUC,
  SendPhoneNumberUserUCInput,
} from "../../business/useCases/user/sendPhoneNumber";
import { UserDataBase } from "../../data/userDataBase";
import { JWTCryptography } from "../../services/JWTCryptography";
import { Request, Response } from "express";

export const sendPhoneNumberEndpoint = async (req: Request, res: Response) => {
  try {
    const useCase = new SendPhoneNumberUserUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendPhoneNumberUserUCInput = {
      token: req.headers.authorization,
      data: req.body.data,
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
