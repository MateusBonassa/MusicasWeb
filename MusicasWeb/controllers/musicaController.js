import categoriaDAL from "../categoriadal.js";
import Musica from "../musica.js";
import musicaDAL from "../musicadal.js"

export default class musicaController{
    

    async musicaAleatoria(req,res)
    {
        const dal = new musicaDAL();
        let music = new Musica(0,"","",0);
        music = await dal.selecionarAleatoria();
        res.status(200).json(music);
    }

    async cadastrar(req,res)
    {
        const dal = new musicaDAL();
        let music = new Musica(null,req.body.titulo,req.body.artista,req.body.duracao,req.body.categoria);
        
        let resultado = await dal.cadastrar(music);
        
        if(resultado)
            res.status(200).json({"status":1});
        else
            res.status(400).json({"status":0});
    }

    async buscaFiltrada(req,res)
    {
       let tf = parseInt(req.query.tpfiltro);
   
       let f = req.query.filtro;
       var obj =null;
       const dal = new musicaDAL();
       if(f!="")
       {
        switch(tf)
        {
             case 1: obj ={"titulo":f};
                             break;
             case 2: obj ={"artista":f};
                     break;
             case 3: 
                    obj ={"categoria_id":await dal.buscarIdCat(f)};
                     break;
        }
       }
     
      
   
       let musicas = await dal.buscaFiltrada(obj);

       for(let i=0;i<musicas.length;i++)
        {

            musicas[i].categoria_id = await dal.buscarNomeCat(musicas[i].categoria_id);;
        }
       return res.status(200).json(musicas);
    }
}