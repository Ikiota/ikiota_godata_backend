const express = require("express");
const multer = require('multer')

const addressActions = require("../controllers/actions/address");
const verify = require("../controllers/validations/verifyToken");


const router = express.Router();





var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-')+"-"+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })






router.get('/', addressActions.getAllAddresses);
router.get('/:uID', addressActions.getAddress);
router.post('/add', addressActions.addAddress);
router.patch('/update/:uID', addressActions.updateAddress);
router.delete('/:uID', addressActions.deleteAddress);

module.exports = router;