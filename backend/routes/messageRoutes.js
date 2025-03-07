import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  createMessage,
  getMessages,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js";

const messageRoutes = express.Router();

messageRoutes.post("/", authenticateUser, createMessage);
messageRoutes.get("/", authenticateUser, getMessages);
messageRoutes.put("/:id", authenticateUser, updateMessage);
messageRoutes.delete("/:id", authenticateUser, deleteMessage);

export default messageRoutes;
