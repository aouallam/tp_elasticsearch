var router = require("express").Router();
const Ctrl = require('../controllers/user.controllers')



router.post("/api/instafee/v1/register", Ctrl.Register );
router.post("/api/instafee/v1/login", Ctrl.Login );




module.exports = router;
