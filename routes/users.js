const express = require("express");
const multer = require('multer')
const userActions = require("../controllers/actions/user");
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


router.get('/', userActions.getAllUsers);
router.get('/:uID', userActions.getUser);
router.post('/register', userActions.createUser);
router.post("/login", userActions.loginUser);
router.patch('/update/:uID', upload.array('myFiles'), userActions.updateUser);
router.delete('/:uID', userActions.deleteUser);

module.exports = router;
