var router = require("express").Router();
const Ctrl = require('../controllers/posts.controllers')

const multer = require('multer');

const DIR = '/public/posts/';
const {fileType} = require('../../libs/uploads.lib/fileType.lib.configs')
const storage = require('../../libs/uploads.lib/upload.lib.configs')(DIR,fileType.Posts)
const upload = multer(storage)

const {fileSize} = require('../../libs/uploads.lib/fileSize.lib.configs')
const resize = require('../../libs/uploads.lib/resize.lib.configs')(DIR,fileSize.Posts)

const middlware = require('../../middleware/auth.middlware')

router.post("/api/instafee/v1/post/create", middlware.isAuth ,upload.single('image_link'), resize, Ctrl.Create );
router.get("/api/instafee/v1/posts/get-all", /* middlware.isAuth , */ Ctrl.FindAll );




module.exports = router;
