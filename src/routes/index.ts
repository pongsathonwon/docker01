import { Router } from "express";
import { contactRoute } from "./contacts.routes";

export const appRoute = Router()
appRoute.use("/contacts", contactRoute)