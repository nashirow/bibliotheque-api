const mysql = require('mysql2/promise');
const DatabaseException = require('../exceptions/DatabaseException');


class AbstractDAO {

    constructor(){
        this.con = mysql.createPool({
            host: 'localhost',
            user: process.env.USER_DB,
            password: process.env.PASSWORD_DB,
            database: 'bibliotheque',
        });
    }//constructor()
}//AbstractDAO()

module.exports = AbstractDAO;