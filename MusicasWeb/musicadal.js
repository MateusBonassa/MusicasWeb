
import { MongoClient } from 'mongodb'
import Musica from './musica.js';

export default class musicaDAL{
    async buscarNomeCat(id)
    {
        var retorno;
        const client = await new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect()
        .then(()=>{
            const dbo = client.db("musicasdb").collection("categorias");
            return dbo.findOne({"_id":id});
        })
        .then((result) =>{
            //console.log(result);
            retorno= result.nome;
           
            
        })
        .catch((erro) => {
            console.error(erro);
        })
        .finally(() => {
          
            //client.close();
        });  
        return retorno;
    }
    async buscarIdCat(nome)
    {
        var retorno;
        const client = await new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect()
        .then(()=>{
            const dbo = client.db("musicasdb").collection("categorias");
            return dbo.findOne({"nome":nome});
        })
        .then((result) =>{
        
            retorno= result._id;
           
            
        })
        .catch((erro) => {
            console.error(erro);
        })
        .finally(() => {
          
            client.close();
        });  
        return retorno;
    }
    async buscaFiltrada(obj)
    {
        var musicas = [];let musica;
        const client =  new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect()
        .then(()=>{
            
            const dbo = client.db("musicasdb").collection("musicas");
         
            if(obj==null)
               return dbo.find({}).toArray()
            else
                return dbo.find(obj).toArray()
                
        })
        .then((result) =>{
    
   
           
            result.forEach(msc => {
                musica = new Musica(0,"","",0,null);
                musica.artista = msc.artista;
                musica.categoria_id = msc.categoria_id;
                musica.duracao = msc.duracao;
                musica.titulo = msc.titulo;
                musica._id = msc._id;
                musicas.push(musica);
            });
           
            
        })
        .catch((erro) => {
            console.error(erro);
        })
        .finally(() => {
          
            client.close();
        });  
        
        return musicas;
    }

    async cadastrar(m)
    {
        let res=false;
        const client =  new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect()
        .then(()=>{
            const dbo = client.db("musicasdb").collection("categorias");
            return dbo.findOne({"nome":m.categoria_id});
        })
        .then((result)=>{
            const dbo = client.db("musicasdb").collection("musicas");
            m.categoria_id = result._id;
            res = dbo.insertOne(m);
        })
        .catch((erro) => {
            console.error(erro);
        })
        .finally(() => {
            
        });  
        return res;
    }
    async selecionarAleatoria()
    {
            
        const client =  new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
        
        let musica = new Musica(0,"","",0,null);
        await client.connect()
        .then(()=>{
            const dbo = client.db("musicasdb").collection("musicas");
            return dbo.find({}).toArray();  
        })
        .then((result) =>{
            
            let x = parseInt(Math.random()*result.length)
            musica.artista = result[x].artista;
            musica.categoria_id = result[x].categoria_id;
            musica.duracao = result[x].duracao;
            musica.titulo = result[x].titulo;
            musica._id = result[x]._id;

            const dbo = client.db("musicasdb").collection("categorias");
            return dbo.findOne({"_id":musica.categoria_id});
        })
        .then((result) => {
            musica.categoria_id = result.nome;
        })
        .catch((erro) => {
            console.error(erro);
        })
        .finally(() => {
          
            client.close();
        });     
        return musica;


     }
}