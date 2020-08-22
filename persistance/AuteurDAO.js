const DatabaseException = require('../exceptions/DatabaseException');
const AbstractDAO = require('./AbstractDAO.js');
const { query } = require('express');

class AuteurDAO extends AbstractDAO{

    constructor(){
        super();
    }//constructor()

    countByFirstAndLastName = async (nom,prenom) => {
        if(!nom && !prenom){
            return 0;
        }else{
            const sqlRequest = 'SELECT COUNT (*) as cpt FROM auteur WHERE nom = ? AND prenom = ?';
            const params = [nom, prenom];
            try {
                const result = await this.con.query(sqlRequest,params);
                return result[0].cpt;
            } catch (error) {
                console.error(error);
                return Promise.reject(new DatabaseException('Impossible de compter le nombre d\' auteur dans la base de donnée '));
            }
        }
    }//countByFirstAndLastName()

    createAuthor = async (auteur) => {
        const sqlRequest = 'INSERT INTO auteur (nom, prenom) VALUES (?,?)';
        const params = [auteur.nom,auteur.prenom];
        
        try {
            const results = await this.con.query(sqlRequest,params);
            if(results[0].affectedRows === 0 ){
                return false;
            }
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible d\'insérer l\'auteur en base de données'));
        }
    }//createAuthor()

    updateAuthor = async (auteur) => {
        const sqlRequest = 'UPDATE auteur SET nom = ?, prenom = ? WHERE id = ?';
        const params = [auteur.nom, auteur.prenom, auteur.id];
        try {
            const result = await this.con.query(sqlRequest, params);
            if(result[0].affectedRows === 0){
                throw new DatabaseException('Impossible de mettre à jour l\'auteur en base de données');
            }
        } catch (error) {
            console.error(error);
            throw new DatabaseException('Impossible de mettre à jour l\'auteur en base de données');s
        }
    }//updateAuthor()

    deleteAuthor = async (id) => {
        const sqlRequest = 'DELETE FROM auteur WHERE id = ?';
        try {
            const result = await this.con.query(sqlRequest,id);
            if(result[0].affectedRows > 0){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            throw new DatabaseException('Impossible de supprimer l\'auteur de la base de données');
        }
    }//deleteAuthor()
}//AuteurDAO()

module.exports = AuteurDAO;