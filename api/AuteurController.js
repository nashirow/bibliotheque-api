const AuteurService = require('../services/AuteurService');
const ApiResult = require('../models/ApiResult');
const Auteur = require('../models/Auteur');
const DatabaseException = require('../exceptions/DatabaseException');

class AuteurController{

    constructor(app){
        this.app = app;
        this.auteurService = new AuteurService();
    }//constructor

    auteurRoutes= () => {
        this.app.post('/auteur', (req,res) => {
            try {
                const body = req.body;
                const auteur = new Auteur(null,body.nom,body.prenom);
                const result = this.auteurService.createAuthor(auteur);
                res.status(200).json(new ApiResult(null,result));
            } catch (error) {
                console.error(error);
                res.json(new ApiResult(error,null));
                res.status(500);
            }
        });

        this.app.put('/auteur', (req,res) => {
            try {
                const body = req.body;
                const auteur = new Auteur(body.id, body.nom, body.prenom);
                const result = this.auteurService.updateAuthor(auteur);
                res.status(200).json(new ApiResult(null,result));
            } catch (error) {
                console.error(error);
                res.status(500).json(new ApiResult(error,null));
            }
        });

        this.app.delete('/auteur/:id',(req,res) => {
            try {
                const paramId = parseInt(req.params.id);
                const result = this.auteurService.deleteAuthor(paramId);
                res.status(200).json(new ApiResult(null,result));
            } catch (error) {
                console.error(error);
                res.status(500).json(new ApiResult(error,null));
            }
        })
    }//auteurRoutes()
}//AuteurController

module.exports = AuteurController;