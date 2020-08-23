/**
 * Cette classe représente un livre
 */
class Livre {

    constructor(id,isbn,titre,publicationDate,pagesMax,idEditeur,idAuteur){
        this.id = id;
        this.isbn = isbn;
        this.titre = titre;
        this.pagesMax = pagesMax;
        this.publicationDate = publicationDate;
        this.idEditeur = idEditeur;
        this.idAuteur = idAuteur;
    }//constructor()
}//Livre

module.exports = Livre;