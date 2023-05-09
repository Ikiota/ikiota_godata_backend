// const mongoose = require('mongoose');

// const buyerSchema = mongoose.Schema({

//     firstName: {
//         type: String,
//         required: true,
//     },
//     otherNames: {
//         type: String,
//         default: ""
//     },
//     storeName: {
//         type: String,
//         default: ""
//     },
//     address: {
//         type: {},
//     },
   
//     phone: {
//         type: String,
//         required: true
//     },
//     profileImg: {
//         type: String,
//         default: ""
//     },
//     email: {
//         type: String,
//         default: ""
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     status: {
//         type: String,
//         default: "Valid"
//     },
    
//     dateCreated: {
//         type: Date,
//         default: Date.now()
//     }

//     },
//     { collection: 'Buyers' }
// );

// var BuyerData = mongoose.model('Buyer', buyerSchema);
// module.exports = BuyerData;



//Buyer object create
var Admin = function(admin){
    this.firstName      = admin.firstName;
    this.otherNames     = admin.otherNames;
    this.phone          = admin.phone;
    this.email          = admin.email;
    this.password       = admin.password;
    this.profile        = admin.profile;
    this.staffID        = admin.staffID;
    this.roles          = admin.roles;
    this.status         = admin.status ?? "active";
    this.dateCreated    = admin.dateCreated ?? new Date();
    
  };
module.exports = Admin;