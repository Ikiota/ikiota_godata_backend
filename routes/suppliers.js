const express = require("express");
const multer = require('multer')

const supplierActions = require("../controllers/actions/supplier");
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






router.get('/', supplierActions.getAllSuppliers);
router.get('/:uID', supplierActions.getSupplier);
router.post('/add', upload.array('myFiles'), supplierActions.createSupplier);
router.patch('/update/:uID', supplierActions.updateSupplier);
router.delete('/:uID', supplierActions.deleteSupplier);

module.exports = router;