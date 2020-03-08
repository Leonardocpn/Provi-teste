import * as functions from "firebase-functions";
import cors from "cors";
import * as admin from "firebase-admin";
import express, { Request, Response, response } from "express";
import {
  CreateUserUC,
  CreateUserUCInput
} from "./business/useCases/user/createUser";
import { UserDataBase } from "./data/userDataBase";
import { BcryptImplamantation } from "./services/bcryptCryptography";
import { UuidIdGenerator } from "./services/uuidIdGenerator";
import { JWTCryptography } from "./services/JWTCryptography";
import { LoginUC, LoginUCInput } from "./business/useCases/auth/login";
import {
  SendCpfUserUC,
  SendCpfUserUCInput
} from "./business/useCases/user/sendCpf";
import {
  SendFullNameUserUC,
  SendFullNameUserUCInput
} from "./business/useCases/user/sendFullName";
import {
  SendPhoneNumberUserUC,
  SendPhoneNumberUserUCInput
} from "./business/useCases/user/sendPhoneNumber";
import {
  SendBirthdayUserUC,
  SendBirthdayUserUCInput
} from "./business/useCases/user/sendBirthday";
import {
  SendAdressUserUc,
  SendAdressUserUcInput
} from "./business/useCases/user/sendAdress";

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

const getTokenFromHeaders = (headers: any): string => {
  return (headers["auth"] as string) || "";
};

app.get("/hello", (req: Request, res: Response) => {
  try {
    res.send("Hello GET");
  } catch (err) {
    response.status(400).send({
      message: err.message
    });
  }
});

app.post("/hello", (req, res) => {
  res.send("Hello POST");
});

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

export const proviTeste = functions.https.onRequest(app);
