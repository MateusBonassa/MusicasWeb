import * as express from "express";
import categoriaController from "../controllers/categoriaController.js";

const catroutes = express.Router();
const categoriacontroller = new categoriaController();

catroutes.get("/buscar-categorias",categoriacontroller.buscarCategorias)

export default catroutes;