const express = require("express");
const vendorActions = require("../controllers/actions/vendor");
const verify = require("../controllers/validations/verifyToken");

const router = express.Router();

router.get('/', vendorActions.getAllVendors);
router.get('/:uID', vendorActions.getVendor);
router.post('/register', vendorActions.createVendor);
router.post("/login", vendorActions.loginVendor);
router.patch('/update/:uID', vendorActions.updateVendor);
router.delete('/:uID', vendorActions.deleteVendor);

module.exports = router;
