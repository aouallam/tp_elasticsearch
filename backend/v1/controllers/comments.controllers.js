const db = require("../models");
const table = db.comment
const jwt = require('jsonwebtoken');
const Config = require('../../config/jwt.configs');
const authKey = Config.authKey;

exports.Create = async (req, res) => {
    let XaccessToken = req.headers['x-access-token']
    let postUuid = req.params.postUuid
    jwt.verify(XaccessToken,authKey,(err, decoded) => {
        if (err) {
            res.status(400).json({ error: 'Authentification échouée, Token expiré ou invalid' });;
        }else{
            const arrayComment ={
                postUuid: postUuid,
                content: req.body.content,
                userUuid: decoded.uuid
            }
            
            // la methode création 
            table.create(arrayComment)
            .then(comment=>{
                res.status(201).json(comment)
            })
            .catch(()=>{
                res.status(500).json({ error: "Erreur serveur"})
            })
           
            
        }
    })
}
