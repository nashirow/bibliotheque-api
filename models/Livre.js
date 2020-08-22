/**
 * Cette classe représnete un livre
 */
class Livre {

    constructor(id,isbn,titre,publicationDate,pagesMax){
        this.id = id;
        this.isbn = isbn;
        this.titre = titre;
        this.pagesMax = pagesMax;
        this.publicationDate = publicationDate;
    }//constructor()
}//Livre

module.exports = Livre;