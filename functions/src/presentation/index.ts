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

admin.initializeApp();
const app = express();
app.use(cors({ origin: true }));

app.post("/createUser", createUserEndpoint);
app.post("/login", loginEndpoint);
app.post("/sendCpfUser", sendCpfEndpoint);
app.post("/sendFullName", sendFullNameEndpoint);
app.post("/sendFhoneNumber", sendPhoneNumberEndpoint);
app.post("/sendBirthday", sendBirthdayEndpoint);
app.post("/sendAdress", sendAdressEndpoint);
app.post("/sendAmountRequested", sendAmountRequestedEndpoint);

export const proviTeste = functions.https.onRequest(app);
