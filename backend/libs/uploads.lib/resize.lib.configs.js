
const sharp = require('sharp')
const _ = require('lodash')
const fs = require('fs')

module.exports = (DIR,FILESIZE) => {
        return (req, res, next) => {
            try {
                const url = req.protocol + '://' + req.get('host')
                
                if(req.file){
                    const { filename: image } = req.file 
                    var object = {}
                    Object.entries(FILESIZE).forEach(async entry => {
                        const [key, value] = entry;
                        _.assign(object,{[value.width+'x'+value.height]:url+ DIR +'/'+ value.width+'x'+value.height+'_'+ image}) 
                        await sharp(req.file.path)
                            .resize(value.width,value.height)
                            .jpeg({quality: 100})
                            .toFile('.'+ DIR +'/'+value.width+'x'+value.height+'_'+ image)
                          
                        
                        const path = ".\\"+req.file.path
                        fs.unlink(path, (err) => {
                            
                        }) 
                    });
                    req.AllMediaFile = object
                    next()
                }else{
                    req.AllMediaFile = {}
                    next()
                }
               
                
            } 
            catch {
            return res.status(500).json({ error: 'Erreur Server or Only .png, .jpg and .jpeg format allowed!' });
            }
        }
}