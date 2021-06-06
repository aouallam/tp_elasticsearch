const db = require("../v1/models");
const Config = require('../config/jwt.configs');
const authKey = Config.authKey;
const jwt = require('jsonwebtoken');


exports.isAuth = async (req, res, next) =>{
    //Si l'access token existe
    if (typeof req.headers['x-access-token'] !== 'string') {
        
        return res.status(301).json({ error: 'Accée refuser veuillez vous connecté' });;
    }
    //Récupération de l'access token
    let XaccessToken = req.headers['x-access-token']
    
    //Verifie si le token est valid
    jwt.verify(XaccessToken,authKey,(err, decoded) => {
        if (err) {
            res.status(400).json({ error: 'Authentification échouée, Token expiré ou invalid' });;
        }else{
            //Récupération de l'tilisateur
            db.user.findOne({where:{uuid:decoded.uuid}})
            .then((user)=>{
                //Test s'il est super administrateur ou administrateur
                if (user) {
                    next()
                }else{
                    res.status(301).json({ error: 'Accée refuser, vous avez pas les droits necessaires' });;
                }
            })
            .catch(()=>{
                res.status(301).json({ error: 'Accée refuser' });;
            })
        }
    });

}