const editeurDAO = require('../persistance/EditeurDAO');
const ArgumentException = require('../exceptions/ArgumentException');



/**
 * Cette classe gère l'ensemble des fonctionnalités liées à un editeur
 */
class EditeurService{

    constructor(){
        this.repositoryEditeur = new editeurDAO();
    }//constructor

    /**
     * La fonction isExist permet de vérifier qu'un editeur n'existe pas en base de données en fonction des paramètres donnés
     * @param {*} nom : nom de l'editeur à cherche dans la base de données
     * Return boolean
     */
    isExist = async (nom) => {
        try{
            const result = await this.repositoryEditeur.countByName(nom);
            return result > 0;
        }catch(error){
            return Promise.reject(error);
        }

    }//isExist

    checkBusiness = async (editeur,isUpdate) => {
        const errors = [];
        if(!editeur){
            errors.push('L\'editeur est obligatoire');
        }
        else{
            if(isUpdate && !editeur.id){
                errors.push('L\'identifiant de l\'editeur est obligatoire afin de le mettre à jour');
            }
            if(!editeur.nom){
                errors.push('L\'editeur doit obligatoirement avoir un nom');
            }
            try{
                if(!isUpdate && this.isExist(editeur.nom)){
                errors.push('L\'editeur  ayant pour nom : ' + editeur.nom + ' existe déjà en base de données');
                }
            }catch(error){
                console.error(error);
            }   
        }
        if(errors.length > 0){
            return Promise.reject(new ArgumentException(errors));
        }
    }//checkBusniess()

    createEditeur = async (editeur) =>{
        try {
            await this.checkBusiness(editeur,false);
            const result = await this.repositoryEditeur.createEditeur(editeur);
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        } 
    }//createEditeur()

    updateEditeur = async (editeur) => {
        try {
            await this.checkBusiness(editeur,true);
            const result = await this.repositoryEditeur.updateEditeur(editeur);
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }//updateEditeur()

    deleteEditeur = async (id) => {
        try{
            const result = await this.repositoryEditeur.deleteEditeur(id);
            return result;
        } catch(error) {
            console.error(error);
            return Promise.reject(error);
        }
    }//deleteEditeur()

    getAllEditeurs = async () => {
        try {
            const result = await this.repositoryEditeur.getAllEditeurs();
            return result;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }//getAllEditeurs()

}//EditeurService

module.exports = EditeurService;