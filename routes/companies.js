const express = require("express");
const multer = require('multer')
const companyActions = require("../controllers/actions/companies");
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


router.get('/', companyActions.getAllCompanies);
router.get('/:uID', companyActions.getCompany);
router.post('/register', upload.array('myFiles'), companyActions.registerCompany);
router.post("/login", companyActions.loginCompany);
router.patch('/update/:uID', upload.array('myFiles'), companyActions.updateCompany);
router.delete('/:uID', companyActions.deleteCompany);

router.post('/upload', upload.array('myFiles'), function(req, res, err) {
    if (err) {
      console.log('error');
      console.log(err);
    }
    var file = req.files;
    res.end();
    console.log(req.files);
  });

module.exports = router;
