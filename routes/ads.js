const express = require("express");
const multer = require('multer')

const adsActions = require("../controllers/actions/ad");
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






router.get('/', adsActions.getAllAds);
router.get('/:uID', adsActions.getAd);
router.post('/add', upload.array('myFiles'), adsActions.addAd);
router.patch('/update/:uID', adsActions.updateAd);
router.delete('/:uID', adsActions.deleteAd);

module.exports = router;