const AuteurService = require('../services/AuteurService');
const ApiResult = require('../models/ApiResult');
const Auteur = require('../models/Auteur');
const DatabaseException = require('../exceptions/DatabaseException');
const ArgumentException = require('../exceptions/ArgumentException');

class AuteurController{

    constructor(app){
        this.app = app;
        this.auteurService = new AuteurService();
    }//constructor

    auteurRoutes= () => {
        this.app.post('/auteur',(req,res) => {
            
                const body = req.body;
                const auteur = new Auteur(null,body.nom,body.prenom);
                this.auteurService.createAuthor(auteur)
                .then(result => res.status(200).json(new ApiResult(null,result)))
                .catch(error => {
                    console.log(error);
                    res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                    .json(new ApiResult(error,null));
                });   
        });

        this.app.put('/auteur', (req,res) => {

                const body = req.body;
                const auteur = new Auteur(body.id, body.nom, body.prenom);
                this.auteurService.updateAuthor(auteur)
                .then( result => res.status(200).json(new ApiResult(null,result)))
                .catch( error => {
                    console.log(error);
                    res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                    .json(new ApiResult(error,null));
                });
        });

        this.app.delete('/auteur/:id',(req,res) => {
                const paramId = parseInt(req.params.id);
                this.auteurService.deleteAuthor(paramId)
                .then( result => {
                    res.status(200).json(new ApiResult(null,result))
                })
                .catch( error => {
                    console.log(error);
                    res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                    .json(error,null);
                });
        });
    }//auteurRoutes()
}//AuteurController

module.exports = AuteurController;