const AbstractDAO = require('../persistance/AbstractDAO');
const DatabaseException = require('../exceptions/DatabaseException');
const Livre = require('../models/Livre');

/**
 * Cette classe représente les fonctionnalités liées aux livres en interaction avec la base de  données.
 */
class LivreDAO extends AbstractDAO{

    constructor(){
        super();
    }//constructor()

    isExistByTitle = async (titre) =>{
        if(!titre){
            return 0;
        }else{
            const sqlRequest = 'SELECT COUNT (*) as cpt FROM livre WHERE titre = ?';
            try {
                const result = await this.con.query(sqlRequest,titre);
                return result[0].cpt;
            } catch (error) {
                console.error(error);
                return Promise.reject(new DatabaseException('Impossible de compter le nombre de livres en base de données.'));
            }
        }
    }//isExistByTitle()

    isExistByIsbn = async (isbn) => {
        const sqlRequest = 'SELECT COUNT (*) cpt FROM livre WHERE isbn = ?';
        try {
            const result = await this.con.query(sqlRequest,isbn);
            return result[0].cpt;
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de compter le nombre de livre ayant pour numéro isbn : ' + isbn + ' dans la base de données'));
        }
    }//isExistByIsbn()


    createLivre = async (livre) => {
        const sqlRequest = "INSERT INTO livre (isbn,titre,publicationDate,pagesMax,idEditeur,idAuteur) VALUES (?,?,?,?,?,?)";
        const params = [livre.isbn,livre.titre,livre.publicationDate,livre.pagesMax,livre.idEditeur,livre.idAuteur];
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

    updateLivre = async (livre) => {
        const sqlRequest = 'UPDATE livre SET isbn = ?, titre = ?, publicationDate = ?, pagesMax = ?, idEditeur = ?, idAuteur = ? WHERE id = ?';
        const params = [livre.isbn,livre.titre,livre.publicationDate,livre.pagesMax,livre.idEditeur,livre.idAuteur,livre.id];
        try {
            const result = await this.con.query(sqlRequest,params);
            return (result[0].affectedRows > 0) ? true : false;
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de mettre à jour le livre n° : ' + livre.id + ' en base de données'));
        }
    }//updateLivre()

    deleteLivre = async (id) =>{
        const sqlRequest = 'DELETE FROM livre WHERE id = ?';
        try {
            const result = await this.con.query(sqlRequest,id);
            return (result[0].affectedRows > 0) ? true : false;
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de supprimer le livre n ° : ' + id + ' de la base de données'));
        }
    }//deleteLivre()

    getAllLivres = async () => {
        const sqlRequest = 'SELECT * FROM livre';
        try {
            const result = await this.con.query(sqlRequest, []);
            const livres = result[0].map(result => new Livre(result.id, result.isbn, result.titre, result.publicationDate, result.pagesMax, result.idEditeur, result.idAuteur));
            return livres;
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de récupérer les livres dans la base de données'));
        }
    }//getAllLivres()

    getLivreById = async (id) => {
        const sqlRequest = 'SELECT * FROM livre WHERE id = ?';
        try {
            const result = await this.con.query(sqlRequest,id);
            const livre = result[0].map(result => new Livre(result.id, result.isbn, result.titre, result.publicationDate, result.pagesMax, result.idEditeur, result.idAuteur));
            return livre;
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de récupérer le livre n ° : ' + id + ' de la base de données'));
        }
    }
}//LivreDAO

module.exports = LivreDAO;