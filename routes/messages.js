const express = require("express");
const multer = require('multer')

const messageActions = require("../controllers/actions/message");
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






router.get('/', messageActions.getAllMessages);
router.get('/:uID', messageActions.getMessage);
router.post('/add', upload.array('myFiles'), messageActions.addMessage);
router.post('/public/add', upload.array('myFiles'), messageActions.addPublicMessage);
router.patch('/update/:uID', messageActions.updateMessage);
router.delete('/:uID', messageActions.deleteMessage);

module.exports = router;