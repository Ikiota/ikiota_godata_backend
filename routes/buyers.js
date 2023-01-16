const express = require("express");
const multer = require('multer')
const buyerActions = require("../controllers/actions/buyer");
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


router.get('/', buyerActions.getAllBuyers);
router.get('/:uID', buyerActions.getBuyer);
router.post('/register', buyerActions.createBuyer);
router.post("/login", buyerActions.loginBuyer);
router.patch('/update/:uID', upload.array('myFiles'), buyerActions.updateBuyer);
router.delete('/:uID', buyerActions.deleteBuyer);

module.exports = router;
