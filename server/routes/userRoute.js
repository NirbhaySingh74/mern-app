import express from "express";
import {
  create,
  deleteItem,
  getAll,
  getById,
  update,
} from "../controller/userController.js";
const route = express.Router();

route.post("/create", create);
route.get("/users", getAll);
route.get("/:id", getById);
route.put("/:id", update);
route.delete("/:id", deleteItem);
export default route;
