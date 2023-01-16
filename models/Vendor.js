const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    otherNames: {
        type: String,
        required: true
    },
    
    storeName: {
        type: String,
        required: true
    },
    idNat: {
        type: String,
        required: true
    },
    address: {
        type: {},
        required: true
    },
   
    phone: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }

    },
    { collection: 'Vendors' }
);

var VendorData = mongoose.model('Vendor', vendorSchema);
module.exports = VendorData;



//Vendor object create
// var Vendor = function(vendor){
//     this.surName        = vendor.surName;
//     this.otherNames     = vendor.otherNames;
//     this.phone          = vendor.phone;
//     this.email          = vendor.email;
//     this.password       = vendor.password;
//     this.profile        = vendor.profile;
//     this.status         = vendor.status ?? "active";
//     this.dateCreated    = vendor.dateCreated ?? new Date();
    
//   };
// module.exports = Vendor;