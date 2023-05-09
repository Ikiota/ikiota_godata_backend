const express = require("express");
const multer = require('multer')
const driverActions = require("../controllers/actions/driver");
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


router.get('/', driverActions.getAllDrivers);
router.get('/:uID', driverActions.getDriver);
router.post('/register', driverActions.createDriver);
router.post("/login", driverActions.loginDriver);
router.patch('/update/:uID', upload.array('myFiles'), driverActions.updateDriver);
router.delete('/:uID', driverActions.deleteDriver);

module.exports = router;
