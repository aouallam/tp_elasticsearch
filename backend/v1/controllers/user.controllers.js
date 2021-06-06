const db = require("../models");
const table = db.user
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Config = require('../../config/jwt.configs');
const authKey = Config.authKey;

//Déclaration de la fonction
exports.Register = async (req, res) => {
    //Compter si un utilisateur du meme mail existe
    table.count({
        where: {email: req.body.email}
    })
    .then(count =>{
        // si count EXISTE
        if (count) {
            //on renvoi l'erreur
            res.status(409).json({
                error: "L'utilisateur est déjà existant"
            })
        }else{
            //sinon on effectu un hash du mot de passe avec le module  bcrypt
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                //on construit le tableau a ajouter
                const arrayUser={
                    email:req.body.email,
                    password:hash,
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    phone_number:req.body.phone_number
                }
                // la methode création 
                table.create(arrayUser)
                .then(user=>{
                    res.status(201).json(user)
                })
                .catch(()=>{
                    res.status(500).json({ error: "Erreur serveur"})
                })

            })
        }
    })
    .catch(()=>{
        res.status(500).json({error: "Erreur serveur"})
    })
}
exports.Login = async (req, res) => {
    table.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(user=>{
        if (user) {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(valid){
                    res.status(200).json({
                        token: jwt.sign(
                        { 
                            uuid: user.uuid
                        },
                        authKey,
                        { expiresIn: '24h' }
                    )})
                }
                else{
                    res.status(403).json({
                        error:"Votre mdp est incorrecte"
                    })
                }
            })
            .catch(()=>{
                res.status(400).json({error: "Des informations sont manquantes"})
            })
            
        }else{
            res.status(403).json({
                error:"Votre nom d'utilisateur est incorrecte"
            })
        }
        
    })
    .catch(()=>{
        res.status(500).json({error: "Erreur serveur"})
    })

}
exports.Update = async (req, res) => {

}
exports.Delete = async (req, res) => {

}