const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

module.exports = (DIR,FILETYPE) => {
    return {
        storage : new multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '.' + DIR);
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, uuidv4() + '-' + fileName)
        }
    }),
    fileFilter: (req, file, cb) => {
        if (FILETYPE.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}
}