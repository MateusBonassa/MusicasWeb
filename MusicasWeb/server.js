import express, { response } from "express";
import cors from 'cors';

import musicroutes from "./routes/musicasRoutes.js";
import catroutes from "./routes/categoriaRoutes.js";
const app = express();
app.use(express.urlencoded({extended: true }))

app.use(express.json())
app.use(cors());
app.use(musicroutes);
app.use(catroutes);

app.listen(8081, function(){
     console.log("Servidor na porta 8081");
});
//Alunos : Mateus Bonassa Ederli RA 262012715 e Guuilherme Jurazek Guedes RA 262012677

