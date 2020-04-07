import { UserDataBase } from "../../data/userDataBase";
import { JWTCryptography } from "../../services/JWTCryptography";
import {
  SendFullNameUserUC,
  SendFullNameUserUCInput,
} from "../../business/useCases/user/sendFullName";
import { Request, Response } from "express";

export const sendFullNameEndpoint = async (req: Request, res: Response) => {
  try {
    const useCase = new SendFullNameUserUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendFullNameUserUCInput = {
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
