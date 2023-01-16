// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer=require('multer')


// const app = express();

// app.use(express.json())


// ////app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// const Categories = require('../../models/Category.js');
// const { string } = require('@hapi/joi');




// const router = express.Router();

// const getAllCategories = async(req, res) => {

//     try{
//         const categories = await Categories.find();

//         res.status(200).json({
//             success: true,
//             message: categories._id,
//             contentData: categories
//         });
//     }catch(error){

//         res.status(404).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

// const getCategory = async(req, res) => {
//     const uID = req.params.uID;
//     try{

        
       
//         const category = await Categories.findById({
//             _id: uID
//         });
//         if(!category){
//             res.status(404).json({
//                 success: false,
//                 message: "Category not found",
//                 contentData: category
//             });
           
//         }else  res.status(200).json({
//             success: true,
//             message: category["_id"],
//             contentData: category
//         });
        

//     }catch(error){

//         res.status(404).json({
//             success: false,
//             message: error.message
//         });

//     }

// }




// const addCategory = async (req, res, next) => {



//     //check if request has image file
//     const files = req.files
    
   
//     if (!files || files.length == 0) return res.status(400).json({
//         success: false,
//         message: 'No file uploaded'
//     });


//     let mFiles = files.map(element => 
//         element.path.replace("\\", "/")
//     ); 

//     let bodyData = JSON.parse(req.body.bodyData);

//     //check if account already exists to avoid data duplication
//     const nameExist = await Categories.findOne({name: bodyData.name});
//     if(nameExist) return res.status(400).json({
//         success: false,
//         message: 'Category already exists'
//     });

//      //_id: new mongoose.Types.ObjectId(),

     
//      const newCategory = new Categories({

       
//         name: bodyData.name,
//         description: bodyData.description,
//         status: bodyData.status,
//         profileImg: mFiles,
//         lastUpdate: bodyData.lastUpdate
//     });

//     try{
//         await newCategory.save();
//         res.status(201).json({
//             success: true,
//             message: "Category added!",
//             contentData: newCategory
//         });

//     }catch(error){
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// const updateCategory = async (req, res) => {

//     const uID = req.params.uID;


//     let bodyData = JSON.parse(req.body.bodyData);
//     const newCategory = new Categories({

      
//        name: bodyData.name,
//        description: bodyData.description,
//        status: bodyData.status,
//        profileImg: mFiles,
//        lastUpdate: bodyData.lastUpdate
//    });



//     try{

//        await Categories.findByIdAndUpdate(
//             {
//                 _id: uID
//             },
//             bodyData
           
//         )

//         res.status(202).json({
//             success: true,
//             message: uID,
//             contentData: newCategory
//             });

//     }catch (error){

//         res.status(401).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// const deleteCategory = async (req, res) => {

//     const uID = req.params.uID;
//     const categoryExist = await Categories.findById({_id: uID});
//     if(!categoryExist) return res.status(400).json({
//         success: false,
//         message: 'Category does not exist '+uID
//     });

//     try{
//         await Categories.findByIdAndRemove({
//             _id: uID
//         });
//         res.status(203).json({
//             success: true,
//             message: uID
//         });

//     }catch(error){
//         res.status(402).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// module.exports.getAllCategories = getAllCategories;
// module.exports.addCategory = addCategory;
// module.exports.getCategory = getCategory;
// module.exports.updateCategory = updateCategory;
// module.exports.deleteCategory = deleteCategory;
























const mysqlConnection = require('../../db');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//const {registerValidation, loginValidation} = require('../validations/user');

const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Category = require('../../models/Category.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllCategories = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM categories';


        const date = new Date();
       

        mysqlConnection.query(mQuery, (error, rows, fields) => {
            
            if (!error)
            
            res.status(200).json({
                success: true,
                contentData: rows
            });

            else
            //console.log(err.sqlMessage);

            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
            })


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }
}

const getCategory = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM categories WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Category not found"
                    });
                else     
                    res.status(200).json({
                        success: true,
                        contentData: rows[0]
                    });

            else
            //console.log(err.sqlMessage);

            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
            })


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }

}

const addCategory = async (req, res) => {
    


    let bodyData =  req.body;
    
    const newCategory = new Categories({
            name: bodyData.name,
            description: bodyData.description,
            poster: bodyData.poster,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM categories WHERE name = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.name], (error, rows, fields) => {
            
            if (!error){
                console.log(`==========>Category ${rows}`);

                if(!rows[0]){
                    
                    const mQuery = 'INSERT INTO categories SET?';
                    mysqlConnection.query(mQuery, newBrand, (error, rows, fields) => {
                        
                        if (!error){
            
            
                            res.status(200).json({
                                success: true,
                                contentData: rows
                            });
            
                      
                        }
                       else
                       
                        res.status(404).json({
                            success: false,
                            message: error.sqlMessage
                        });
                         })

                   
                }else{

                    res.status(404).json({
                        success: false,
                        message: "A category has already been created with this name!"
                    });

                }
            }
            })


       

       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }
}



const updateCategory = async (req, res) => {

    const uID = req.params.uID;

    let bodyData =  req.body;
    
    const newCategory = new Categories({

    
        name: bodyData.name,
        description: bodyData.description,
        poster: bodyData.poster,
        status: bodyData.status,
        dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE categories SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newCategory, uID], (error, rows, fields) => {
            
            if (!error){


                res.status(200).json({
                    success: true,
                    contentData: rows
                });

          
            }
           else
           
            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
             })


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }
}


const deleteCategory = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM categories WHERE id = ?';
        mysqlConnection.query(mQuery, [uID], (error, rows, fields) => {
            
            if (!error){


                res.status(200).json({
                    success: true,
                    contentData: rows
                });

          
            }
           else
           
            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
             })


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }
}


module.exports.getAllCategories = getAllCategories;
module.exports.addCategory = addCategory;
module.exports.getCategory = getCategory;
module.exports.updateCategory = updateCategory;
module.exports.deleteCategory = deleteCategory;
