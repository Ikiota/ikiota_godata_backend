const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {registerValidation, loginValidation} = require('../validations/vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Vendors = require('../../models/Vendor.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllVendors = async(req, res) => {

    try{
        const vendors = await Vendors.find();

        res.status(200).json({
            success: true,
            message: vendors._id,
            contentData: vendors
        });
    }catch(error){

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

const getVendor = async(req, res) => {
    const uID = req.params.uID;
    try{

        
       
        const vendor = await Vendors.findById({
            _id: uID
        });
        if(!vendor){
            res.status(404).json({
                success: false,
                message: "Vendor not found",
                contentData: vendor
            });
           
        }else  res.status(200).json({
            success: true,
            message: vendor["_id"],
            contentData: vendor
        });
        

    }catch(error){

        res.status(404).json({
            success: false,
            message: error.message
        });

    }

}

const createVendor = async (req, res) => {

    //validate data before using it
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({
        success: false,
        message: error.details[0].message
    });


    //check if account already exists to avoid data duplication
    const emailExist = await Vendors.findOne({email: req.body.email});
    if(emailExist) return res.status(400).json({
        success: false,
        message: 'Email already exists'
    });

    //hash password
    const salt = bcrypt.genSaltSync(10);

    
    const hashedPassword = await bcrypt.hash(req.body.password, salt);



    const newVendor = new Vendors({

        firstName: req.body.firstName,
        otherNames: req.body.otherNames,
        storeName: req.body.storeName,
        idNat: req.body.idNat,
        address: req.body.address,
        profileImg: req.body.profileImg,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        dateCreated: req.body.dateCreated
    });

    try{
        await newVendor.save();
        res.status(201).json({
            success: true,
            message: newVendor,
            contentData: newVendor
        });

    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}


const loginVendor = async (req, res) => {

    //validate data before using it
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({
        success: false,
        message: error.details[0].message
    });


    //check if account already exists to avoid data duplication
    const vendor = await Vendors.findOne({email: req.body.email});
    if(!vendor) return res.status(400).json({
        success: false,
        message: 'Incorect email or password'});

    //check if password is correct
    
    const validPass = await bcrypt.compare(req.body.password, vendor.password);

    if(!validPass) return res.status(400).json({
        success: false,
        message: 'Invalid password'});


    const token = jwt.sign({_id: vendor._id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json(
       { 
           success: true,
           message: vendor._id,
           authToken: token,
           contentData: vendor
        });

    
}


const updateVendor = async (req, res) => {

    const uID = req.params.uID;

    try{

       await Vendors.findByIdAndUpdate(
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


const deleteVendor = async (req, res) => {

    const uID = req.params.uID;
    try{
        await Vendors.findByIdAndRemove({
            _id: uID
        });
        res.status(203).json({
            success: true,
            message: uID
            });

    }catch(error){
        res.status(402).json({
            success: false,
            message: error.message});
    }
}


module.exports.getAllVendors = getAllVendors;
module.exports.createVendor = createVendor;
module.exports.loginVendor = loginVendor;
module.exports.getVendor = getVendor;
module.exports.updateVendor = updateVendor;
module.exports.deleteVendor = deleteVendor;

























// const mysqlConnection = require('../../db');
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// //const {registerValidation, loginValidation} = require('../validations/user');

// const jwt = require('jsonwebtoken');


// const app = express();

// app.use(express.json())


// ////app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// const Vendors = require('../../models/Vendor.js');
// const { string } = require('@hapi/joi');




// const router = express.Router();

// const getAllVendors = async(req, res) => {

//     try{
       


//         const mQuery = 'SELECT * FROM vendors';


//         const date = new Date();
       

//         mysqlConnection.query(mQuery, (error, rows, fields) => {
            
//             if (!error)
            
//             res.status(200).json({
//                 success: true,
//                 contentData: rows
//             });

//             else
//             //console.log(err.sqlMessage);

//             res.status(404).json({
//                 success: false,
//                 message: error.sqlMessage
//             });
//             })


       
//     }catch(err){

//         res.status(404).json({
//             success: false,
//             message: err
//         });
//     }
// }

// const getVendor = async(req, res) => {
//     const uID = req.params.uID;
    
//     try{
       


//         const mQuery = 'SELECT * FROM vendors WHERE id = ?';
       

//         mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
//             if (!error)
//                 if(!rows)
//                     res.status(404).json({
//                         success: false,
//                         message: "User not found"
//                     });
//                 else     
//                     res.status(200).json({
//                         success: true,
//                         contentData: rows[0]
//                     });

//             else
//             //console.log(err.sqlMessage);

//             res.status(404).json({
//                 success: false,
//                 message: error.sqlMessage
//             });
//             })


       
//     }catch(err){

//         res.status(404).json({
//             success: false,
//             message: err
//         });
//     }

// }

// const createVendor = async (req, res) => {
    

//     //validate data before using it
//     // const {error} = registerValidation(req.body);
//     // if(error) return res.status(400).json({
//     //     success: false,
//     //     message: error.details[0].message
//     // });


   
//     //hash password
//     const salt = bcrypt.genSaltSync(10);

    
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);


//     let bodyData =  req.body;
    
//     const newVendor = new Vendors({


//             surName: bodyData.name,
//             otherNames: bodyData.otherNames,
//             stores: bodyData.stores,
//             email: bodyData.email,
//             phone: bodyData.phone,
//             password: hashedPassword,
//             profile: bodyData.profile,
//             status: bodyData.status,
//             dateCreated: bodyData.dateCreated
//         });
    
//     try{

//         const mQuerySelect = 'SELECT * FROM vendors WHERE phone = ?';
       

//         mysqlConnection.query(mQuerySelect,[bodyData.phone], (error, rows, fields) => {
            
//             if (!error){
//                 console.log(`==========>User ${rows}`);

//                 if(!rows[0]){
                    
//                     const mQuery = 'INSERT INTO vendors SET?';
//                     mysqlConnection.query(mQuery, newClient, (error, rows, fields) => {
                        
//                         if (!error){
            
            
//                             res.status(200).json({
//                                 success: true,
//                                 contentData: rows
//                             });
            
                      
//                         }
//                        else
                       
//                         res.status(404).json({
//                             success: false,
//                             message: error.sqlMessage
//                         });
//                          })

                   
//                 }else{

//                     res.status(404).json({
//                         success: false,
//                         message: "An account has already been created with this phone number!"
//                     });

//                 }
//             }
//             })


       

       
//     }catch(err){

//         res.status(404).json({
//             success: false,
//             message: err
//         });
//     }
// }


// const loginVendor = async (req, res) => {

//     //validate data before using it
//     // const {error} = loginValidation(req.body);
//     // if(error) return res.status(400).json({
//     //     success: false,
//     //     message: error.details[0].message
//     // });


//     const bodyData = req.body;
//     console.log(`==========>User phone ${bodyData.phone}`);


//     try{

//         const mQuerySelect = 'SELECT * FROM vendors WHERE phone = ?';
       
        
//         mysqlConnection.query(mQuerySelect,[bodyData.phone], async (error, rows, fields) => {
            
//             if (!error)
//                 if(rows[0]){
//                     const vendor =  rows[0];

                    
//                     const validPass = await bcrypt.compare(bodyData.password, vendor.password);
//                     if(!validPass) return res.status(400).json({
//                         success: false,
//                         message: 'Invalid password'});
                
                
//                         const token = jwt.sign({_id: vendor.id.toString()}, process.env.TOKEN_SECRET);
                
//                         res.header('auth-token', token).json(
//                         { 
//                             success: true,
//                             message: vendor.id.toString(),
//                             authToken: token,
//                             contentData: vendor
                
//                         });
//                 }else{

//                     return res.status(400).json({
//                         success: false,
//                         message: 'Incorect phone or password'});
//                 }
//             })

//         }catch(err){

//             res.status(404).json({
//                 success: false,
//                 message: err
//             });
//         }


    
// }


// const updateVendor = async (req, res) => {

//     const uID = req.params.uID;

//     let bodyData =  req.body;
    
//     const newVendor = new Vendors({

//             surName: bodyData.name,
//             otherNames: bodyData.otherNames,
//             stores: bodyData.stores,
//             email: bodyData.email,
//             phone: bodyData.phone,
//             password: hashedPassword,
//             profile: bodyData.profile,
//             sponsor: bodyData.sponsor,
//             status: bodyData.status,
//             dateCreated: bodyData.dateCreated
//     });
    
//     try{

//         const mQuery = 'UPDATE vendors SET? WHERE id =?';
//         mysqlConnection.query(mQuery, [newVendor, uID], (error, rows, fields) => {
            
//             if (!error){


//                 res.status(200).json({
//                     success: true,
//                     contentData: rows
//                 });

          
//             }
//            else
           
//             res.status(404).json({
//                 success: false,
//                 message: error.sqlMessage
//             });
//              })


       
//     }catch(err){

//         res.status(404).json({
//             success: false,
//             message: err
//         });
//     }
// }


// const deleteVendor = async (req, res) => {

//     const uID = req.params.uID;

    
//     try{

//         const mQuery = 'DELETE FROM vendors WHERE id = ?';
//         mysqlConnection.query(mQuery, [uID], (error, rows, fields) => {
            
//             if (!error){


//                 res.status(200).json({
//                     success: true,
//                     contentData: rows
//                 });

          
//             }
//            else
           
//             res.status(404).json({
//                 success: false,
//                 message: error.sqlMessage
//             });
//              })


       
//     }catch(err){

//         res.status(404).json({
//             success: false,
//             message: err
//         });
//     }
// }


// module.exports.getAllVendors = getAllVendors;
// module.exports.createVendor = createVendor;
// module.exports.loginVendor = loginVendor;
// module.exports.getVendor = getVendor;
// module.exports.updateVendor = updateVendor;
// module.exports.deleteVendor = deleteVendor;