import * as functions from "firebase-functions";
import cors from "cors";
import * as admin from "firebase-admin";
import express, { Request, Response } from "express";
import { UserDataBase } from "../data/userDataBase";
import { BcryptImplamantation } from "../services/bcryptCryptography";
import { JWTCryptography } from "../services/JWTCryptography";
import { LoginUC, LoginUCInput } from "../business/useCases/auth/login";
import {
  SendPhoneNumberUserUC,
  SendPhoneNumberUserUCInput,
} from "../business/useCases/user/sendPhoneNumber";

import {
  SendAmountRequestedUC,
  SendAmountRequestedUCInput,
} from "../business/useCases/user/sendAmountRequested";
import { createUserEndpoint } from "./endpoints/createUser";
import { sendCpfEndpoint } from "./endpoints/sendCpf";
import { sendFullNameEndpoint } from "./endpoints/sendFullName";
import { sendAdressEndpoint } from "./endpoints/sendAdress";
import { sendBirthdayEndpoint } from "./endpoints/sendBirthday";

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

app.post("/createUser", createUserEndpoint);

app.post("/login", async (req: Request, res: Response) => {
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
});

app.post("/sendCpfUser", sendCpfEndpoint);

app.post("/sendFullName", sendFullNameEndpoint);

app.post("/sendFhoneNumber", async (req: Request, res: Response) => {
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
});

app.post("/sendBirthday", sendBirthdayEndpoint);

app.post("/sendAdress", sendAdressEndpoint);

app.post("/sendAmountRequested", async (req: Request, res: Response) => {
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
});
export const proviTeste = functions.https.onRequest(app);
