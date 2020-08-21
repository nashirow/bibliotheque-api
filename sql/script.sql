CREATE DATABASE `Bibliotheque`; 

CREATE TABLE `editeur` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(40) NOT NULL DEFAULT '' COMMENT 'C\'est le nom de l\'éditeur',
    PRIMARY KEY (`id`)
);

CREATE TABLE `auteur` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(40) NOT NULL DEFAULT '' COMMENT 'C\'est le nom de l\'auteur',
    `prenom` VARCHAR(40) NOT NULL DEFAULT '' COMMENT 'C\'est le prenom de l\'auteur',
    PRIMARY KEY (`id`)
);

CREATE TABLE `livre` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `isbn` INT NOT NULL COMMENT 'C\'est le numéro ISBN du livre',
    `titre` VARCHAR(40) NOT NULL DEFAULT '' COMMENT 'C\'est le titre du livre',
    `publicationDate` TIMESTAMP NOT NULL DEFAULT NOW() COMMENT 'C\'est la date de publication du livre',
    `pagesMax` INT NOT NULL COMMENT 'C\'est le nombre maxmimum de pages du livre',
    `idEditeur` INT NOT NULL,
    `idAuteur` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`idEditeur`) REFERENCES `editeur` (`id`),
    FOREIGN KEY (`idAuteur`) REFERENCES `auteur` (`id`)
);