const express = require('express');
const AuteurController = require('./api/AuteurController');
const EditeurController = require('./api/EditeurController');
const LivreController = require('./api/LivreController');


const app = express();
app.use(express.json());
const port = 8080;
const auteurController = new AuteurController(app);
const editeurController = new EditeurController(app);
const livreController = new LivreController(app);

auteurController.auteurRoutes();
editeurController.editeurRoutes();
livreController.livreRoutes();

app.get('/', (req,res) => {
    res.status(200).send('Endpoints disponibles : aucun');
});
app.listen(port, () => 
    console.log('Actuellement en écoute via : http://localhost:'+ port));