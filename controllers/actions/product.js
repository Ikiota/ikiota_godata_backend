// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// const app = express();

// app.use(express.json())


// ////app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// const Products = require('../../models/Product.js');
// const { string } = require('@hapi/joi');




// const router = express.Router();

// const getAllProducts = async(req, res) => {

//     try{
//         const products = await Products.find();

//         res.status(200).json({
//             success: true,
//             message: products._id,
//             contentData: products
//         });
//     }catch(error){

//         res.status(404).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

// const getProduct = async(req, res) => {
//     const uID = req.params.uID;
//     try{

        
       
//         const product = await Products.findById({
//             _id: uID
//         });
//         if(!product){
//             res.status(404).json({
//                 success: false,
//                 message: "Product not found",
//                 contentData: product
//             });
           
//         }else  res.status(200).json({
//             success: true,
//             message: product["_id"],
//             contentData: product
//         });
        

//     }catch(error){

//         res.status(404).json({
//             success: false,
//             message: error.message
//         });

//     }

// }

// const addProduct = async (req, res) => {



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
//     const nameExist = await Products.findOne({name: bodyData.name});
//     if(nameExist) return res.status(400).json({
//         success: false,
//         message: 'Product already exists'
//     });


    

//     const newProduct = new Products({

//         name: bodyData.name,
//         category: bodyData.category,
//         images: mFiles,
//         quantity: bodyData.quantity,
//         madeIn: bodyData.madeIn,
//         priceCarton: bodyData.priceCarton,
//         priceDozen: bodyData.priceDozen,
//         prices: bodyData.prices,
//         weight: bodyData.weight,
//         description: bodyData.description,
//         status: bodyData.status,
//         expDate: new Date(bodyData.expDate),
//         lastUpdate: bodyData.lastUpdate,
//         seller: bodyData.seller
//     });

//     try{
//         await newProduct.save();
//         res.status(201).json({
//             success: true,
//             message: newProduct,
//             contentData: newProduct
//         });

//     }catch(error){
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// const updateProduct = async (req, res) => {

//     const uID = req.params.uID;

//     try{

//        await Products.findByIdAndUpdate(
//             {
//                 _id: uID
//             },
//             req.body
           
//         )

//         res.status(202).json({
//             success: true,
//             message: uID,
//             });

//     }catch (error){

//         res.status(401).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// const deleteProduct = async (req, res) => {

//     const uID = req.params.uID;
//     try{
//         await Products.findByIdAndRemove({
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


// module.exports.getAllProducts = getAllProducts;
// module.exports.addProduct = addProduct;
// module.exports.getProduct = getProduct;
// module.exports.updateProduct = updateProduct;
// module.exports.deleteProduct = deleteProduct;
































const mysqlConnection = require('../../db');
const express = require('express');
const bodyParser = require('body-parser');





const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//const Products = require('../../models/Product.js');
const { string } = require('@hapi/joi');
const ProspectiveSuppliers = require('../../models/ProspectiveSuppliers.js');



const router = express.Router();

const getAllProducts = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM products';


        const date = new Date();
       

            res.status(200).json({
                success: true,
                contentData: "data received"
            });
            
        mysqlConnection.query(mQuery, (error, rows, fields) => {

            const products = [];
            rows.forEach(element => {
                element.prices = [
                    {
                        "value": element["priceCarton"],
                        "currency": "USD",
                        "unit": "Carton"
                    },
                    {
                        "value": element["priceDozen"],
                        "currency": "USD",
                        "unit": "Dozen"
                    }
                ];
                products.push(element);
            });
            
            if (!error)


            res.status(200).json({
                success: true,
                contentData: products
            });
            
            // res.status(200).json({
            //     success: true,
            //     contentData: rows
            // });

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

const getProduct = async(req, res) => {
    const uID = req.params.uID;
    try{

        
       
        const product = await Products.findById({
            _id: uID
        });
        if(!product){
            res.status(404).json({
                success: false,
                message: "Product not found",
                contentData: product
            });
           
        }else  res.status(200).json({
            success: true,
            message: product["_id"],
            contentData: product
        });
        

    }catch(error){

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

}

const addProduct = async (req, res) => {



    //check if request has image file
    const files = req.files
    
   
    if (!files || files.length == 0) return res.status(400).json({
        success: false,
        message: 'No file uploaded'
    });


    let mFiles = files.map(element => 
        element.path.replace("\\", "/")
    ); 





    let bodyData = JSON.parse(req.body.bodyData);

    //check if account already exists to avoid data duplication
    const nameExist = await Products.findOne({name: bodyData.name});
    if(nameExist) return res.status(400).json({
        success: false,
        message: 'Product already exists'
    });


    

    const newProduct = new Products({

        name: bodyData.name,
        category: bodyData.category,
        images: mFiles,
        quantity: bodyData.quantity,
        madeIn: bodyData.madeIn,
        priceCarton: bodyData.priceCarton,
        priceDozen: bodyData.priceDozen,
        prices: bodyData.prices,
        weight: bodyData.weight,
        description: bodyData.description,
        status: bodyData.status,
        expDate: new Date(bodyData.expDate),
        lastUpdate: bodyData.lastUpdate,
        vendorId: bodyData.vendorId
    });

    try{
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: newProduct,
            contentData: newProduct
        });

    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}


const suggestProduct = async (req, res) => {



    // //check if request has image file
    // const files = req.files
    
   
    // if (!files || files.length == 0) return res.status(400).json({
    //     success: false,
    //     message: 'No file uploaded'
    // });


    // let mFiles = files.map(element => 
    //     element.path.replace("\\", "/")
    // ); 


   

    let bodyData =  req.body;
    console.log(bodyData);

    const newProspect = new ProspectiveSuppliers({
            firstName: bodyData.firstName,
            lastName: bodyData.lastName,
            phone: bodyData.phone,
            email: bodyData.email,
            category: bodyData.category,
            company: bodyData.company,
            product: bodyData.product,
            description: bodyData.description,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
        try{

            const mQuerySelect = 'SELECT * FROM prospective_suppliers WHERE phone = ? AND product =?';
           
    
            mysqlConnection.query(mQuerySelect,[bodyData.phone, bodyData.product], (error, rows, fields) => {
                
                if (!error){
                   
    
                    if(!rows[0]){
                        
                        const mQuery = 'INSERT INTO prospective_suppliers SET?';
                        mysqlConnection.query(mQuery, newProspect, (error, rows, fields) => {
                            
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
                            message: "This product has already been suggested by this induvidual!"
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


const updateProduct = async (req, res) => {

    const uID = req.params.uID;

    try{

       await Products.findByIdAndUpdate(
            {
                _id: uID
            },
            req.body
           
        )

        res.status(202).json({
            success: true,
            message: uID,
            });

    }catch (error){

        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}


const deleteProduct = async (req, res) => {

    const uID = req.params.uID;
    try{
        await Products.findByIdAndRemove({
            _id: uID
        });
        res.status(203).json({
            success: true,
            message: uID
        });

    }catch(error){
        res.status(402).json({
            success: false,
            message: error.message
        });
    }
}


module.exports.getAllProducts = getAllProducts;
module.exports.addProduct = addProduct;
module.exports.suggestProduct = suggestProduct;
module.exports.getProduct = getProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
