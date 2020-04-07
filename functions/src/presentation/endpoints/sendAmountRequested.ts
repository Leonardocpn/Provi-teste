import {
  SendAmountRequestedUC,
  SendAmountRequestedUCInput,
} from "../../business/useCases/user/sendAmountRequested";
import { UserDataBase } from "../../data/userDataBase";
import { JWTCryptography } from "../../services/JWTCryptography";
import { Request, Response } from "express";

export const sendAmountRequestedEndpoint = async (
  req: Request,
  res: Response
) => {
  try {
    const useCase = new SendAmountRequestedUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendAmountRequestedUCInput = {
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
