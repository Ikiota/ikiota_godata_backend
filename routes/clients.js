const express = require("express");
const multer = require('multer')
const clientActions = require("../controllers/actions/client");
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


router.get('/', clientActions.getAllClients);
router.get('/:uID', clientActions.getClient);
router.post('/register', clientActions.createClient);
router.post("/login", clientActions.loginClient);
router.patch('/update/:uID', upload.array('myFiles'), clientActions.updateClient);
router.delete('/:uID', clientActions.deleteClient);

module.exports = router;
