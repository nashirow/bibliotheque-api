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
            const livre = new Livre(null,body.isbn,body.titre,body.publicationDate,body.maxPages);
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
    }
}//LivreController

module.exports = LivreController;