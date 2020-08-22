const AbstractDAO = require('../persistance/AbstractDAO');
const DatabaseException = require('../exceptions/DatabaseException');

class LivreDAO extends AbstractDAO{

    constructor(){
        super();
    }//constructor()

    isExistByTitle = async (titre) =>{
        const sqlRequest = 'SELECT COUNT (*) as cpt FROM livre WHERE titre = ?';
        try {
            const result = await this.con.query(sqlRequest,titre);
            return result[0].cpt;
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de compter le nombre de livres en base de données.'));
        }
    }//isExistByTitle()

    createLivre = async (livre) => {
        const sqlRequest = "INSERT INTO livre (isbn,titre,publicationDate,pagesMax) VALUES (?,?,?,?)";
        const params = [livre.isbn,livre.titre,livre.publicationDate,livre.nbPages];
        try {
            const result = await this.con.query(sqlRequest,params);
            if(result[0].affectedRows === 0){
                return false;
            }
        }catch(error){
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible d\'insérer le livre dans la base de données'));
        }
    }//createLivre()
}//LivreDAO

module.exports = LivreDAO;