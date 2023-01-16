
// const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({

//     name: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     images: {
//         type: [String],
//         required: true
//     },
//     quantity: {
//         type: [String],
//         required: true
//     },
   
//     madeIn: {
//         type: String,
//         required: true
//     },
//     priceCarton: {
//         type: Number,
//         required: true
//     },
//     priceDozen: {
//         type: Number,
//         required: true
//     },
//     prices: {
//         type: [{}]
//     },
//     weight: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         required: true
//     },
//     expDate: {
//         type: Date,
//         default: Date.now()
//     },
//     lastUpdate: {
//         type: Date,
//         default: Date.now()
//     },
//     seller: {
//         type: String,
//         required: true
//     },

//     },
//     { collection: 'Products' }
// );

// var ProductData = mongoose.model('Product', productSchema);
// module.exports = ProductData;





var Product = function(product){
    this.name               = product.name;
    this.description        = product.description;
    this.vendorId           = product.vendorId;
    this.brand              = product.brand;
    this.category           = product.category;
    this.subCategory        = product.subCategory;
    this.images             = product.images;
    this.quantity           = product.quantity;
    this.madeIn             = product.madeIn;
    this.weight             = product.weight;
    this.poster             = product.poster;
    this.pricePerCarton     = product.pricePerCarton;
    this.pricePerDozen      = product.pricePerDozen;
    this.oldPricePerCarton  = product.oldPricePerCarton;
    this.oldPricePerDozen   = product.oldPricePerDozen;
    this.supplier           = product.supplier;
    this.expDate            = product.expDate ?? new Date();
    this.lastUpdate         = product.lastUpdate ?? new Date();
    this.status             = product.status ?? "valid";
   // this.dateCreated        = product.dateCreated ?? new Date();
    
  };
module.exports = Product;