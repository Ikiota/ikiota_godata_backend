const express = require("express");
const multer = require('multer')

const storeActions = require("../controllers/actions/store");
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






router.get('/', storeActions.getAllStores);
router.get('/:uID', storeActions.getStore);
router.post('/add', upload.array('myFiles'), storeActions.addStore);
router.patch('/update/:uID', storeActions.updateStore);
router.delete('/:uID', storeActions.deleteStore);

module.exports = router;