import * as functions from "firebase-functions";
import cors from "cors";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import {
  CreateUserUC,
  CreateUserUCInput
} from "./src/business/useCases/user/createUser";
import { UserDataBase } from "./src/data/userDataBase";
import { BcryptImplamantation } from "./src/services/bcryptCryptography";
import { UuidIdGenerator } from "./src/services/uuidIdGenerator";
import { JWTCryptography } from "./src/services/JWTCryptography";
import { LoginUC, LoginUCInput } from "./src/business/useCases/auth/login";
import {
  SendCpfUserUC,
  SendCpfUserUCInput
} from "./src/business/useCases/user/sendCpf";
import {
  SendFullNameUserUC,
  SendFullNameUserUCInput
} from "./src/business/useCases/user/sendFullName";
import {
  SendPhoneNumberUserUC,
  SendPhoneNumberUserUCInput
} from "./src/business/useCases/user/sendPhoneNumber";
import {
  SendBirthdayUserUC,
  SendBirthdayUserUCInput
} from "./src/business/useCases/user/sendBirthday";
import {
  SendAdressUserUc,
  SendAdressUserUcInput
} from "./src/business/useCases/user/sendAdress";
import { ViaCep } from "./src/services/viaCep";
import { SendAmountRequestedUC, SendAmountRequestedUCInput } from "./src/business/useCases/user/sendAmountRequested";

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

const getTokenFromHeaders = (headers: any): string => {
  return (headers["auth"] as string) || "";
};

app.post("/createUser", async (req: Request, res: Response) => {
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
      message: err.message
    });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const useCase = new LoginUC(
      new UserDataBase(),
      new BcryptImplamantation(),
      new JWTCryptography()
    );

    const input: LoginUCInput = {
      email: req.body.email,
      password: req.body.password
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
});

app.post("/sendCpfUser", async (req: Request, res: Response) => {
  try {
    const useCase = new SendCpfUserUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendCpfUserUCInput = {
      token: getTokenFromHeaders(req.headers),
      data: req.body.data
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
});

app.post("/sendFullName", async (req: Request, res: Response) => {
  try {
    const useCase = new SendFullNameUserUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendFullNameUserUCInput = {
      token: getTokenFromHeaders(req.headers),
      data: req.body.data
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
});

app.post("/sendFhoneNumber", async (req: Request, res: Response) => {
  try {
    const useCase = new SendPhoneNumberUserUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendPhoneNumberUserUCInput = {
      token: getTokenFromHeaders(req.headers),
      data: req.body.data
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
});

app.post("/sendBirthday", async (req: Request, res: Response) => {
  try {
    const useCase = new SendBirthdayUserUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendBirthdayUserUCInput = {
      token: getTokenFromHeaders(req.headers),
      data: req.body.data
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
});

app.post("/sendAdress", async (req: Request, res: Response) => {
  try {
    const useCase = new SendAdressUserUc(
      new JWTCryptography(),
      new UserDataBase(),
      new ViaCep(),
      new UserDataBase()
    );

    const input: SendAdressUserUcInput = {
      token: getTokenFromHeaders(req.headers),
      cep: req.body.cep,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
});

app.post("/sendAmountRequested", async (req: Request, res: Response) => {
  try {
    const useCase = new SendAmountRequestedUC(
      new JWTCryptography(),
      new UserDataBase(),
      new UserDataBase()
    );

    const input: SendAmountRequestedUCInput = {
      token: getTokenFromHeaders(req.headers),
      data: req.body.data
    };

    const result = await useCase.execute(input);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
});
export const proviTeste = functions.https.onRequest(app);
