import { UserDataBase } from "../../data/userDataBase";
import { BcryptImplamantation } from "../../services/bcryptCryptography";
import { JWTCryptography } from "../../services/JWTCryptography";
import { LoginUC, LoginUCInput } from "../../business/useCases/auth/login";
import { Request, Response } from "express";

export const loginEndpoint = async (req: Request, res: Response) => {
  try {
    const useCase = new LoginUC(
      new UserDataBase(),
      new BcryptImplamantation(),
      new JWTCryptography()
    );

    const input: LoginUCInput = {
      email: req.body.email,
      password: req.body.password,
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
