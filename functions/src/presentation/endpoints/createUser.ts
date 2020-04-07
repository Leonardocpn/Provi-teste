import {
  CreateUserUC,
  CreateUserUCInput,
} from "../../business/useCases/user/createUser";
import { Request, Response } from "express";

import { UserDataBase } from "../../data/userDataBase";
import { BcryptImplamantation } from "../../services/bcryptCryptography";
import { UuidIdGenerator } from "../../services/uuidIdGenerator";
import { JWTCryptography } from "../../services/JWTCryptography";

export const createUserEndpoint = async (req: Request, res: Response) => {
  try {
    const useCase = new CreateUserUC(
      new UserDataBase(),
      new BcryptImplamantation(),
      new UuidIdGenerator(),
      new JWTCryptography()
    );

    const input: CreateUserUCInput = {
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
