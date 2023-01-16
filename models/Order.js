const mongoose = require('mongoose');

// const orderSchema = mongoose.Schema({

//     clientID: {
//         type: String,
//         required: true
//     },
//     receiverPhone: {
//         type: String,
//         required: true
//     },
//     items: {
//         type: [{}]
//     },
//     address: {
//         type: {},
//         required: true
//     },
//     deliveryMode: {
//         type: {},
//         required: true
//     },
    
//     dateTimeOrdered: {
//         type: Date,
//         default: Date.now()
//     },
//     dateTimeDelivered: {
//         type: Date,
//         default: Date.now()
//     },

//     totalPrice: {
//         type: Number,
//         required: true
//     },

//     status: {
//         type: String,
//         required: true
//     },
//     deliveryAgent: {
//         type: String,
//         required: true
//     }
    

//     },
//     { collection: 'Orders' }
// );

// var OrderData = mongoose.model('Order', orderSchema);
// module.exports = OrderData;













var Orders = function(order){
    this.clientID               = order.clientID;
    this.receiverPhone          = order.receiverPhone;
    this.email                  = order.email;
    this.items                  = order.items;
    this.address                = order.address;
    this.deliveryMode           = order.deliveryMode;
    this.deliveryAgent          = order.deliveryAgent;
    this.dateTimeDelivered      = order.dateTimeDelivered;
    this.totalPrice             = order.totalPrice;
    this.paymentMode            = order.paymentMode;
    this.paymentStatus          = order.paymentStatus;
    this.status                 = order.status ?? "pending";
    this.dateCreated            = order.dateCreated ?? new Date();
    
  };
module.exports = Orders;