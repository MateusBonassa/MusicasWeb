
import { MongoClient } from 'mongodb'
import Categoria from './categoria.js';

export default class categoriaDAL{
    
    async buscarCategorias()
    {
            
        const client =  new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
        
        let categoria,categorias=[];
        await client.connect()
        .then(()=>{
            const dbo = client.db("musicasdb").collection("categorias");
            return dbo.find({}).toArray();  
        })
        .then((result) =>{
            
            
            result.forEach(cat => {
                categoria = new Categoria(0,"");
                categoria.id = cat._id;
                categoria.nome = cat.nome;
                categorias.push(categoria);
            });
        })
        .catch((erro) => {
            console.error(erro);
        })
        .finally(() => {
          
            client.close();
        });     
        return categorias;


     }
}