
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    // _id: {
    //     type: String,
    // },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    
    profileImg: {
        type: [String],
        required: true
    },
    lastUpdate: {
        type: Date,
        default: Date.now()
    }

    },
    { collection: 'Categories' }
);

var CategoryData = mongoose.model('Category', categorySchema);
module.exports = CategoryData;



// var Category = function(category){
//     this.name               = category.name;
//     this.description        = category.description;
//     this.poster             = category.poster;
//     this.status             = category.status ?? "active";
//     this.dateCreated        = category.dateCreated ?? new Date();
    
//   };
// module.exports = Category;