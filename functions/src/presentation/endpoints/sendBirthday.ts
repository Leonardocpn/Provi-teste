import {
  SendBirthdayUserUC,
  SendBirthdayUserUCInput,
} from "../../business/useCases/user/sendBirthday";
import { UserDataBase } from "../../data/userDataBase";
import { JWTCryptography } from "../../services/JWTCryptography";
import { Request, Response } from "express";

export const sendBirthdayEndpoint = async (req: Request, res: Response) => {
  try {
    const useCase = new SendBirthdayUserUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendBirthdayUserUCInput = {
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
