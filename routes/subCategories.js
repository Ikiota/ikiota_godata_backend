const express = require("express");
const multer = require('multer')

const subCategoryActions = require("../controllers/actions/subCategory");
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






router.get('/', subCategoryActions.getAllSubCategories);
router.get('/:uID', subCategoryActions.getSubCategory);
router.post('/add', upload.array('myFiles'), subCategoryActions.addSubCategory);
router.patch('/update/:uID', subCategoryActions.updateSubCategory);
router.delete('/:uID', subCategoryActions.deleteSubCategory);

module.exports = router;