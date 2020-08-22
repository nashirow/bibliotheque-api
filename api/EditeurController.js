const EditeurService = require('../services/EditeurService');
const ApiResult = require('../models/ApiResult');
const Editeur = require('../models/Editeur');
const DatabaseException = require('../exceptions/DatabaseException');
const ArgumentException = require('../exceptions/ArgumentException');

/**
 * Cette classe permet de gérer les controleurs liés aux éditeurs.
 */
class EditeurController{

    constructor(app){
        this.app = app;
        this.editeurService = new EditeurService();
    }//constructor()

    editeurRoutes = () =>{
        this.app.post('/editeur', (req,res) =>{
                const body = req.body;
                const editeur = new Editeur(null,body.nom);
                this.editeurService.createEditeur(editeur)
                .then( result => {
                    res.status(200).json(new ApiResult(null,result))
                })
                .catch(error => {
                    console.error(error);
                    res.status(error.constructor.nom === 'DatabaseException' ? 500 : 400)
                    .json(new ApiResult(error,null));
                })
        });

        this.app.put('/editeur', (req,res) =>{
                const body = req.body;
                const editeur = new Editeur(body.id,body.nom);
                this.editeurService.updateEditeur(editeur)
                .then(result => {
                    res.status(200).json(new ApiResult(null,result))
                })
                .catch(error => {
                    console.error(error);
                    res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                    .json(new ApiResult(error,null));
                });
        });

        this.app.delete('/editeur/:id', (req,res) =>{
            const id = parseInt(req.params.id);
            const editeur = new Editeur(id,null);
            this.editeurService.deleteEditeur(id)
            .then(result => {
                res.status(200).json(new ApiResult(null,result));
            })
            .catch(error => {
                console.error(error);
                res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                .json(new ApiResult(error,null));
            });
        });

        this.app.get('/editeurs', (req,res) => {
            this.editeurService.getAllEditeurs()
            .then(result => {
                res.status(200).json(new ApiResult(null,result));
            })
            .catch(error => {
                console.error(error);
                res.status(error.constructor.name === 'DatabaseException' ? 500 : 400)
                .json(new ApiResult(error,null));
            });
        });
    }//editeurRoutes

}//EditeurController

module.exports = EditeurController;