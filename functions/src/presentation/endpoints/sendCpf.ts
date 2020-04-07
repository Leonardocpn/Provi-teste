import {
  SendCpfUserUC,
  SendCpfUserUCInput,
} from "../../business/useCases/user/sendCpf";
import { UserDataBase } from "../../data/userDataBase";
import { JWTCryptography } from "../../services/JWTCryptography";
import { Request, Response } from "express";

export const sendCpfEndpoint = async (req: Request, res: Response) => {
  try {
    const useCase = new SendCpfUserUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendCpfUserUCInput = {
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
