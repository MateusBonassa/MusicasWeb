import * as express from "express";
import musicaController from "../controllers/musicaController.js";

const musicroutes = express.Router();
const musicacontroller = new musicaController();

musicroutes.get("/musica-aleatoria",musicacontroller.musicaAleatoria)
musicroutes.post("/cadastrar",musicacontroller.cadastrar)
musicroutes.get("/buscar-musicas",musicacontroller.buscaFiltrada)
export default musicroutes