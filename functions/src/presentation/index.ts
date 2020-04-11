import * as functions from "firebase-functions";
import cors from "cors";
import * as admin from "firebase-admin";
import express from "express";
import { createUserEndpoint } from "./endpoints/createUser";
import { sendCpfEndpoint } from "./endpoints/sendCpf";
import { sendFullNameEndpoint } from "./endpoints/sendFullName";
import { sendAdressEndpoint } from "./endpoints/sendAdress";
import { sendBirthdayEndpoint } from "./endpoints/sendBirthday";
import { sendPhoneNumberEndpoint } from "./endpoints/sendPhoneNumber";
import { sendAmountRequestedEndpoint } from "./endpoints/sendAmountRequested";
import { loginEndpoint } from "./endpoints/login";
import { createUserValidation } from "./InputValidation/createUser";
import { errors } from "celebrate";
import { loginValidation } from "./InputValidation/login";
import { sendCpfValidation } from "./InputValidation/sendCpf";
import { sendFullNameValidation } from "./InputValidation/sendFullName";
import { sendBirthdayValidation } from "./InputValidation/sendBirthday";
import { sendPhoneNumberValidation } from "./InputValidation/sendPhoneNumber";
import { sendAdressValidation } from "./InputValidation/sendAdress";
import { sendAmountRequestedValidation } from "./InputValidation/sendAmountRequested";

admin.initializeApp();
export const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(errors());

app.post("/createUser", createUserValidation, createUserEndpoint);
app.post("/login", loginValidation, loginEndpoint);
app.post("/sendCpfUser", sendCpfValidation, sendCpfEndpoint);
app.post("/sendFullName", sendFullNameValidation, sendFullNameEndpoint);
app.post(
  "/sendPhoneNumber",
  sendPhoneNumberValidation,
  sendPhoneNumberEndpoint
);
app.post("/sendBirthday", sendBirthdayValidation, sendBirthdayEndpoint);
app.post("/sendAdress", sendAdressValidation, sendAdressEndpoint);
app.post(
  "/sendAmountRequested",
  sendAmountRequestedValidation,
  sendAmountRequestedEndpoint
);

export const proviTeste = functions.https.onRequest(app.use(errors()));
