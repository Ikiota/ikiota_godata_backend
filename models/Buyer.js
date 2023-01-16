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
var Buyer = function(buyer){
    this.firstName        = buyer.firstName;
    this.otherNames     = buyer.otherNames;
    this.phone          = buyer.phone;
    this.email          = buyer.email;
    this.password       = buyer.password;
    this.profile        = buyer.profile;
    this.sponsor        = buyer.sponsor;
    this.status         = buyer.status ?? "active";
    this.dateCreated    = buyer.dateCreated ?? new Date();
    
  };
module.exports = Buyer;