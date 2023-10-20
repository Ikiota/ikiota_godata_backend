const express = require("express");
const multer = require('multer')
const bankActions = require("../controllers/actions/bank");
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

 
router.get('/', bankActions.getAllBanks);
router.get('/:uID', bankActions.getBank);
router.post('/add',  upload.array('myFiles'), bankActions.addBank);
router.patch('/update/:uID', upload.array('myFiles'), bankActions.updateBank);
router.delete('/:uID', bankActions.deleteBank);

module.exports = router;
