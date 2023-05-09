const express = require("express");
const multer = require('multer')
const adminsActions = require("../controllers/actions/admin");
const verify = require("../controllers/validations/verifyToken");

const router = express.Router();



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    // filename: function (req, file, cb) {
    //   cb(null, new Date().toISOString().replace(/:/g, '-')+"-"+file.originalname)
    // }
  })
   
  var upload = multer({ storage: storage })


router.get('/', adminsActions.getAllAdmins);
router.get('/:uID', adminsActions.getAdmin);
router.post('/register', adminsActions.createAdmin);
router.post("/login", adminsActions.loginAdmin);
router.patch('/update/:uID', upload.array('myFiles'), adminsActions.updateAdmin);
router.delete('/:uID', adminsActions.deleteAdmin);

module.exports = router;
