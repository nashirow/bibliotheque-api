const ArgumentException = require('../exceptions/ArgumentException');
const LivreDAO = require('../persistance/LivreDAO');

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
        if(!livre){
            errors.push('Le livre est obligatoire');
        }else{
            if(isUpdate &&!livre.id){
                errors.push('L\'identifiant du livre est obligatoire');
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
            if(!livre.idAuteur){
                errors.push('L\'identifiant de l\'auteur est obligatoire');
            }
            if(!livre.idEditeur){
                errors.push('L\'identifiant de l\'éditeur est obligatoire');
            }
            try {
                const isExist = await this.isExist(livre.titre);
                if(!isUpdate && isExist){
                    errors.push('Le livre existe déjà en base de données');
                }
                } catch (error) {
                    console.error(error);
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

    updateLivre = async (livre) => {
        try {
            await this.checkBusiness(livre,true);
            const result = await this.repositoryLivre.updateLivre(livre);
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
}//LivreService

module.exports = LivreService;