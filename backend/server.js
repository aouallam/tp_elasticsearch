const express = require('express')
const db = require("./v1/models");
const bodyParser =  require('body-parser')
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const http = require("http");


//-----------------------------------------------------------------------------------------------------------------------
//const access = require('./middleware/token.middeleware')
const app = express()


var corsOptions = {
  'origin': "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.use('/public', express.static('public'));



app.get('/initialisation-bdd',  (req, res) => {
  db.sequelize.sync({ alter: true }).then(() => {
    res.status(200).json({message: 'alter and re-sync db.'})
  }) 
}) 

//-----------------------------------------------------------------------------
let PrivatesRoutes = [];

const array = fs.readdirSync(__dirname + '/v1/routes').filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})

array.forEach(file => {
  const route = require(path.join(__dirname  + '/v1/routes', file));
  PrivatesRoutes.push(route);
});

PrivatesRoutes.forEach((route) => {
  app.use('/', route);
});


//--------------------------------------------------------------------------
app.get('/',  (req, res) => {
  return res.status(200).json({message: 'good'})
})

const server = http.createServer(app);

server.listen(8081,  () => {
  console.log('------------------Le Serveur écoute sur le port 8081!--------------------');
})

module.exports = app;