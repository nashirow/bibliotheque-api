const AuteurDAO = require('../persistance/auteurDAO');
const ArgumentException = require('../exceptions/ArgumentException');

//Cette classe contient toutes les fonctionnalités liées à un auteur
class AuteurService{

    constructor(){
        this.repositoryAuteur = new AuteurDAO();
    }//constructor()
 
    isExist = async (nom,prenom) => {
        const result = await this.repositoryAuteur.countByFirstAndLastName(nom,prenom);
        if(result > 0){
            return true;
        }else{
            return false;
        }
    }//isExist()

    //Cette fonction permet de vérifier que les règles métiers soient bien respectées.
    checkBusiness = (auteur,isUpdate) =>{
        const errors = [];
        if(!auteur){
            errors.push('Le paramètre est obligatoire');
        }else{
            if(isUpdate && !auteur.id){
                errors.push('L\'identifiant de l\'auteur est obligatoire');
            }
            if(!auteur.nom){
                errors.push('Le nom de l\'auteur est obligatoire');
            }
            if(!auteur.prenom){
                errors.push('Le prénom de l\'auteur est obligatoire');
            }
            if(!isUpdate && this.isExist(auteur.nom, auteur.prenom)){
                errors.push('Un auteur possédant le nom ' + auteur.nom + ' et le prenom ' + auteur.prenom + ' existe déjà en base de données');
            }
        }
        if(errors.length > 0){
            throw new ArgumentException(errors);
        } 
    }//checkBusiness()

    createAuthor = (auteur) => {
        try {
            this.checkBusiness(auteur,false);
            const result = this.repositoryAuteur.createAuthor(auteur);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        } 
    }//createAuthor()

    updateAuthor = (auteur) => {
        try {
            this.checkBusiness(auteur,true);
            const result = this.repositoryAuteur.updateAuthor(auteur);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }//updateAuthor()

    deleteAuthor = (id) => {
        try {
            const result = this.repositoryAuteur.deleteAuthor(id);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}//auteurService()

module.exports = AuteurService;