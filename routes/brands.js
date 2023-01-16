const express = require("express");
const multer = require('multer')

const brandActions = require("../controllers/actions/brand");
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






router.get('/', brandActions.getAllBrands);
router.get('/:uID', brandActions.getBrand);
router.post('/add', upload.array('myFiles'), brandActions.addBrand);
router.patch('/update/:uID', brandActions.updateBrand);
router.delete('/:uID', brandActions.deleteBrand);

module.exports = router;