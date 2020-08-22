const AuteurDAO = require('../persistance/auteurDAO');
const ArgumentException = require('../exceptions/ArgumentException');

//Cette classe contient toutes les fonctionnalités liées à un auteur
class AuteurService{

    constructor(){
        this.repositoryAuteur = new AuteurDAO();
    }//constructor()
 
    isExist =  async (nom,prenom) => {
        try{
            const result =  await this.repositoryAuteur.countByFirstAndLastName(nom,prenom);
            return result > 0;
        }catch(error){
            console.error(error);
            return Promise.reject(error);
        }
    }//isExist()

    //Cette fonction permet de vérifier que les règles métiers soient bien respectées.
    checkBusiness = async (auteur,isUpdate) =>{
        const errors = [];
        if(!auteur){
            errors.push('Le paramètre est obligatoire');
        }else{
            if(isUpdate && !auteur.id){
                errors.push('L\'identifiant de l\'auteur est obligatoire pour effectuer une mise à jour');
            }
            if(!auteur.nom){
                errors.push('Le nom de l\'auteur est obligatoire');
            }
            if(!auteur.prenom){
                errors.push('Le prénom de l\'auteur est obligatoire');
            }
            try {
                const isExist = await this.isExist(auteur.nom, auteur.prenom);
                if(!isUpdate && this.isExist){
                    errors.push('Un auteur possédant le nom ' + auteur.nom + ' et le prenom ' + auteur.prenom + ' existe déjà en base de données');
                }
            } catch (error) {
                console.error(error);
            }
        }
        if(errors.length > 0){
            return Promise.reject(new ArgumentException(errors));
        } 
    }//checkBusiness()

    createAuthor = async (auteur) => {
        try {
            await this.checkBusiness(auteur,false);
            const result = await this.repositoryAuteur.createAuthor(auteur);
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        } 
    }//createAuthor()

    updateAuthor = async (auteur) => {
        try {
            await this.checkBusiness(auteur,true);
            const result = await this.repositoryAuteur.updateAuthor(auteur);
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }//updateAuthor()

    deleteAuthor = async (id) => {
        try {
            const result = await this.repositoryAuteur.deleteAuthor(id);
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
}//auteurService()

module.exports = AuteurService;