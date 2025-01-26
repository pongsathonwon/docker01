import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContact,
  getContactById,
  updateContact,
} from "../controller";

export const contactRoute = Router();

contactRoute.get("/", getAllContact);
contactRoute.get("/:id", getContactById);
contactRoute.post("/", createContact);
contactRoute.put("/:id", updateContact);
contactRoute.delete("/:id", deleteContact);
