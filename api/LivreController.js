const LivreService = require('../services/LivreService');
const Livre = require('../models/Livre');
const ApiResult = require('../models/ApiResult');
class LivreController{

    constructor(app){
        this.app = app;
        this.livreService = new LivreService();
    }//constructor()

    livreRoutes = () =>{

        this.app.post('/livre', async (req,res) =>{
            const body = req.body;
            const livre = new Livre(null,body.isbn,body.titre,body.publicationDate,body.pagesMax,body.idEditeur,body.idAuteur);
            this.livreService.createLivre(livre)
            .then(result => {
                res.status(200).json(new ApiResult(null,result))
            })
            .catch(error => {
                console.error(error);
                res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                .json(new ApiResult(error,null));
            })
        });

        this.app.put('/livre', async (req,res) =>{
            const body = req.body;
            const livre = new Livre(body.id,body.isbn,body.titre,body.publicationDate,body.pagesMax,body.idEditeur,body.idAuteur);
            await this.livreService.updateLivre(livre)
            .then(result => {
                res.status(200).json(new ApiResult(null,result));
            })
            .catch(error => {
                res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                .json(new ApiResult(error,null));
            })
        });

        this.app.delete('/livre/:id', async (req,res) => {
            const paramId = req.params.id;
            await this.livreService.deleteLivre(paramId)
            .then(result => {
                res.status(200).json(new ApiResult(null,result));
            })
            .catch(error => {
                res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                .json(new ApiResult(error,null));
            })
        });

        this.app.get('/livres', async (req,res) => {
            await this.livreService.getAllLivres()
            .then(result => {
                res.status(200).json(new ApiResult(null,result));
            })
            .catch(error =>{
                res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                .json(new ApiResult(error,null));
            })
        });

        this.app.get('/livre/:id', async (req,res) => {
            const paramId = req.params.id;
            await this.livreService.getLivreById(paramId)
            .then(result => {
                res.status(200).json(new ApiResult(null,result));
            })
            .catch(error => {
                console.log(error);
                res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                .json(new ApiResult(error,null));
            })
        });
    }//livreRoutes()
}//LivreController

module.exports = LivreController;