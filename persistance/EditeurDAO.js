const AbstractDAO = require('./AbstractDAO');
const DatabaseException = require('../exceptions/DatabaseException');
const Editeur = require('../models/Editeur');
const { query } = require('express');

/**
 * Cette classe contient les fonctionnalités liées aux éditeurs en interaction avec la base de données.
 */
class EditeurDAO extends AbstractDAO{

    constructor(){
        super();
    }//constructor()

    countByName = async (nom) => {
        const sqlRequest = 'SELECT COUNT (*) as cpt FROM editeur WHERE nom = ?';
        try {
            const result = await this.con.query(sqlRequest,nom);
            return result[0].cpt;
        } catch (error) {
            console.log(error);
            return Promise.reject(new DatabaseException('Impossible de compter le nombre d\'éditeur dans la base de données'));
        }
    }//countByName()

    createEditeur = async (editeur) => {
        const sqlRequest = 'INSERT INTO editeur (nom) VALUES (?)';
        const params = editeur.nom;
        try {
            const results = await this.con.query(sqlRequest,params);
            if(results[0].affectedRows === 0 ){
                return false;
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(new DatabaseException('Impossible d\'insérer l\'éditeur en base de données'));
        }
    }//createEditeur()

    updateEditeur = async (editeur) => {
        const sqlRequest = 'UPDATE editeur SET nom = ? WHERE id = ?';
        const params = [editeur.nom,editeur.id];
        try {
            const result = await this.con.query(sqlRequest,params);
            if(result[0].affectedRows === 0){
                return false;
            }
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de mettre à jour l\'auteur en base de données'));
        }  
    }//updateEditeur()

    deleteEditeur = async (id) => {
        const sqlRequest = 'DELETE from editeur WHERE id = ?';
        try {
            const result = await this.con.query(sqlRequest,id);
            if(result[0].affectedRows === 0){
                return false;
            }else{
                return result[0].affectedRows;
            }
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de supprimer l\'éditeur de la base de données'));
        }
    }//deleteEditeur()

    getAllEditeurs = async () =>{
        const sqlRequest = 'SELECT * FROM editeur';
        try {
            const result = await this.con.query(sqlRequest);
            console.log(result);
            const editeurs = result[0].map(result => new Editeur(result.id,result.nom));
            return editeurs;
        } catch (error) {
            console.error(error);
            return Promise.reject(new DatabaseException('Impossible de récupérer les éditeurs de la base de données'));
        }
    }//getAllEditors()
}//EditeurDAO

module.exports = EditeurDAO;