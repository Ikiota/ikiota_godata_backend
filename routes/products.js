const express = require("express");
const multer = require('multer')
const productActions = require("../controllers/actions/product");
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


router.get('/', productActions.getAllProducts);
router.get('/:uID', productActions.getProduct);
router.post('/add',  upload.array('myFiles'), productActions.addProduct);
router.patch('/update/:uID', productActions.updateProduct);
router.delete('/:uID', productActions.deleteProduct);

module.exports = router;