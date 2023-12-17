import express from "express";
import { MongoClient } from 'mongodb'
import Musica from './musica.js';
const app = express();
//conectando com o servidor MongoDB
const url = "mongodb://localhost:27017/";




let musica = new Musica(0,"","",0,null);
MongoClient.connect("mongodb://localhost:27017/")
.then(db => {
    const dbo = db.db("musicas");
    dbo.collection("musicas").find({}).toArray()
        .then(result => {
            db.close()
            let x = parseInt(Math.random()*result.length)
            musica.artista = result[x].artista;
            musica.categoria = result[x].categoria_id;
            musica.duracao = result[x].duracao;
            musica.titulo = result[x].titulo;
            musica.id = result[x]._id;
        })
 })
.then(db => {
     dbo = db.db("musicas");
    dbo.collection("categorias").find({_id : musica.categoria}).toArray()
        .then(result => {
            db.close()
            musica.categoria =  result[0].nome;
        })
});
    console.log(musica);
// executando o servidor
app.listen(8081, function () {
    console.log("Servidor na porta 8081");
});
