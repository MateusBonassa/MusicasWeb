import Categoria from "../categoria.js";
import categoriaDAL from "../categoriadal.js"

export default class categoriaController{
    

    async buscarCategorias(req,res)
    {
        const dal = new categoriaDAL();
        let cats = [];
        cats = await dal.buscarCategorias();
        res.status(200).json(cats);
    }

}