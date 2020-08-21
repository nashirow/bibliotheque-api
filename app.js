const express = require('express');
const AuteurController = require('./api/AuteurController');


const app = express();
app.use(express.json());
const port = 8080;
const auteurController = new AuteurController(app);

auteurController.auteurRoutes();

app.get('/', (req,res) => {
    res.status(200).send('Endpoints disponibles : aucun');
});
app.listen(port, () => 
    console.log('Actuellement en écoute via : http://localhost:'+ port));