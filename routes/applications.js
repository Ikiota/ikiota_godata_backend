const express = require("express");
const multer = require('multer')
const applicationActions = require("../controllers/actions/application");
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

 
router.get('/', applicationActions.getAllApplications);
router.get('/:uID', applicationActions.getApplication);
router.post('/add',  upload.array('myFiles'), applicationActions.addApplication);
router.patch('/update/:uID', upload.array('myFiles'), applicationActions.updateApplication);
router.delete('/:uID', applicationActions.deleteApplication);

module.exports = router;
