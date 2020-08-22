const ArgumentException = require('../exceptions/ArgumentException');
const LivreDAO = require('../persistance/LivreDAO');
const Livre = require('../models/Livre');

/**
 * Cette classe contient toutes les fonctionnalités liées aux livres.
 */
class LivreService{

    constructor(){
        this.repositoryLivre = new LivreDAO();
    }//constructor()

    isExist = async (titre) =>{
        try {
            const result = await this.repositoryLivre.isExistByTitle(titre);
            return result > 0;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }//isExist

    checkBusiness = async (livre,isUpdate) => {
        const errors = [];
        console.log(livre);
        if(!livre){
            errors.push('Le livre est obligatoire');
        }else{
            if(isUpdate &&!livre.id){
                errors.push('Le nom du livre est obligatoire');
            }
            if(!livre.isbn){
                errors.push('L\'isbn du livre est obligatoire');
            }
            if(!livre.titre){
                errors.push('Le titre du livre est obligatoire');
            }
            if(!livre.publicationDate){
                errors.push('La date de publication est obligatoire');
            }
            if(!livre.pagesMax){
                errors.push('Le nombre maximum de pages est obligatoire');
            }
            try {
                const isExist = await this.isExist(livre.titre);
                if(!isUpdate && isExist){
                    errors.push('Le livre existe déjà en base de données');
                }
            } catch (error) {
                console.error(error);
                return Promise.reject(new ArgumentException(errors));
            }
        }
        if(errors.length > 0){
            return Promise.reject(new ArgumentException(errors));
        }
    }//checkBusiness()

    createLivre = async (livre) => {
        try {
            await this.checkBusiness(livre,false);
            const result = await this.repositoryLivre.createLivre(livre);
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }//createLivre()
}//LivreService

module.exports = LivreService;