
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

    // _id: {
    //     type: String,
    // },
    senderID: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: {
        type: [String],
    },
    status: {
        type: String,
        required: true
    },
    
    dateTime: {
        type: Date,
        default: Date.now()
    },
    
    lastEdit: {
        type: Date,
        default: Date.now()
    }

    },
    { collection: 'Messages' }
);

var MessageData = mongoose.model('Message', messageSchema);
module.exports = MessageData;


// var Message = function(message){
//     this.senderID               = message.senderID;
//     this.subject             = message.subject;
//     this.description        = message.description;
//     this.files             = message.files;
//     this.lastUpdate         = message.lastUpdate ?? new Date();
//     this.status             = message.status ?? "pending";
//     this.dateCreated        = message.dateCreated ?? new Date();
    
//   };
// module.exports = Message;