const express = require("express");
const multer = require('multer')

const categoryActions = require("../controllers/actions/category");
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






router.get('/', categoryActions.getAllCategories);
router.get('/:uID', categoryActions.getCategory);
router.post('/add', upload.array('myFiles'), categoryActions.addCategory);
router.patch('/update/:uID',  categoryActions.updateCategory);
router.delete('/:uID', categoryActions.deleteCategory);

module.exports = router;