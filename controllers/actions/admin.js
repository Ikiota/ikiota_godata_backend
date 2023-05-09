// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const {registerValidation, loginValidation} = require('../validations/buyer');

// const jwt = require('jsonwebtoken');


// const app = express();

// app.use(express.json())


// ////app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// const Buyers = require('../../models/Buyer.js');
// const { string } = require('@hapi/joi');




// const router = express.Router();

// const getAllBuyers = async(req, res) => {

//     try{
//         const buyers = await Buyers.find();

//         res.status(200).json({
//             success: true,
//             message: buyers._id,
//             contentData: buyers
//         });
//     }catch(error){

//         res.status(404).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

// const getBuyer = async(req, res) => {
//     const uID = req.params.uID;
//     try{

        
       
//         const buyer = await Buyers.findById({
//             _id: uID
//         });
//         if(!buyer){
//             res.status(404).json({
//                 success: false,
//                 message: "Buyer not found",
//                 contentData: buyer
//             });
           
//         }else  res.status(200).json({
//             success: true,
//             message: buyer["_id"],
//             contentData: buyer
//         });
        

//     }catch(error){

//         res.status(404).json({
//             success: false,
//             message: error.message
//         });

//     }

// }

// const createBuyer = async (req, res) => {
    

//     //validate data before using it
//     // const {error} = registerValidation(req.body);
//     // if(error) return res.status(400).json({
//     //     success: false,
//     //     message: error.details[0].message
//     // });


//     //check if account already exists to avoid data duplication
//     const phoneExist = await Buyers.findOne({phone: req.body.phone});
//     if(phoneExist) return res.status(400).json({
//         success: false,
//         message: 'Phone number already exists'
//     });

//     //hash password
//     const salt = bcrypt.genSaltSync(10);

    
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);



    
//     const newBuyer = new Buyers({

//         firstName: req.body.firstName,
//         otherNames: req.body.otherNames,
//         storeName: req.body.storeName,
//         address: req.body.address,
//         profileImg: req.body.profileImg,
//         phone: req.body.phone,
//         email: req.body.email,
//         password: hashedPassword,
//         status: req.body.status,
//         dateCreated: req.body.dateCreated
//     });

//     try{
//         await newBuyer.save();
//         res.status(201).json({
//             success: true,
//             message: "Buyer added!",
//             contentData: newBuyer
//         });

//     }catch(error){
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// const loginBuyer = async (req, res) => {

//     //validate data before using it
//     // const {error} = loginValidation(req.body);
//     // if(error) return res.status(400).json({
//     //     success: false,
//     //     message: error.details[0].message
//     // });


//     //check if account already exists to avoid data duplication
//     const buyer = await Buyers.findOne({phone: req.body.phone});
//     if(!buyer) return res.status(400).json({
//         success: false,
//         message: 'Incorect phone or password'});

//     //check if password is correct
    
//     const validPass = await bcrypt.compare(req.body.password, buyer.password);

//     if(!validPass) return res.status(400).json({
//         success: false,
//         message: 'Invalid password'});


//         const token = jwt.sign({_id: buyer._id}, process.env.TOKEN_SECRET);

//         res.header('auth-token', token).json(
//         { 
//             success: true,
//             message: buyer._id,
//             authToken: token,
//             contentData: buyer

//         });

    
// }


// const updateBuyer = async (req, res) => {

//     const uID = req.params.uID;

//     try{

       
//         await Buyers.findByIdAndUpdate(
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


// const deleteBuyer = async (req, res) => {

//     const uID = req.params.uID;
//     try{
//         await Buyers.findByIdAndRemove({
//             _id: uID
//         });
//         res.status(203).json({
//             success: true,
//             message: uID
//             });

//     }catch(error){
//         res.status(402).json({
//             success: false,
//             message: error.message});
//     }
// }


// module.exports.getAllBuyers = getAllBuyers;
// module.exports.createBuyer = createBuyer;
// module.exports.loginBuyer = loginBuyer;
// module.exports.getBuyer = getBuyer;
// module.exports.updateBuyer = updateBuyer;
// module.exports.deleteBuyer = deleteBuyer;

















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


const Admin = require('../../models/Admin.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllAdmins = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM admins';


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

const getAdmin = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM admins WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "User not found"
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

const createAdmin = async (req, res) => {
    

    //validate data before using it
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(400).json({
    //     success: false,
    //     message: error.details[0].message
    // });


   
    //hash password
    const salt = bcrypt.genSaltSync(10);

    
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    let bodyData =  req.body;
    
    const newAdmin = new Admin({


            firstName: bodyData.firstName,
            otherNames: bodyData.otherNames,
            email: bodyData.email,
            phone: bodyData.phone,
            password: hashedPassword,
            profile: bodyData.profile,
            roles: bodyData.roles,
            staffID: bodyData.staffID,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM admins WHERE phone = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.phone], (error, rows, fields) => {
            
            if (!error){
                console.log(`==========>User ${rows}`);

                if(rows[0]){

                    res.status(404).json({
                        success: false,
                        message: "An account has already been created with this phone number!"
                    });

                   
                }else{

                    const mQuery = 'INSERT INTO admins SET?';
                    mysqlConnection.query(mQuery, newAdmin, (error, rows, fields) => {
                        
                        if (!error){
            
            
                          
                            const uID = rows.insertId;

                            const mQuery = 'SELECT * FROM admins WHERE id = ?';
       

                            mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
                                
                                if (!error)
                                    if(!rows)
                                        res.status(404).json({
                                            success: false,
                                            message: "User not found"
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
                      
                        }
                       else
                       
                        res.status(404).json({
                            success: false,
                            message: error.sqlMessage
                        });
                         })

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


const loginAdmin = async (req, res) => {

    //validate data before using it
    // const {error} = loginValidation(req.body);
    // if(error) return res.status(400).json({
    //     success: false,
    //     message: error.details[0].message
    // });


    const bodyData = req.body;
    

    try{

        const mQuerySelect = 'SELECT * FROM admins WHERE phone = ?';
       
        
        mysqlConnection.query(mQuerySelect,[bodyData.phone], async (error, rows, fields) => {
            
            if (!error)
                if(rows[0]){

                    const admin =  rows[0];

                   
                    const validPass = await bcrypt.compare(bodyData.password, admin.password);
                    if(!validPass) return res.status(400).json({
                        success: false,
                        message: 'Invalid password'});
                
                
                        const token = jwt.sign({_id: admin.id.toString()}, process.env.TOKEN_SECRET);
                
                        res.header('auth-token', token).json(
                        { 
                            success: true,
                            message: admin.id.toString(),
                            authToken: token,
                            contentData: admin
                
                        });
                }else{

                    return res.status(400).json({
                        success: false,
                        message: 'Incorect phone or password'});
                }
            })

        }catch(err){

            res.status(404).json({
                success: false,
                message: err
            });
        }


    
}


const updateAdmin = async (req, res) => {

    const uID = req.params.uID;
    
    let bodyData =  JSON.parse(req.body.bodyData);
    const files = req.files;
    let mProfile = bodyData.profile;
    if (files || files.length != 0){
        let mFiles = files.map(element => element.path.replace("\\", "/")); 
        mProfile = mFiles[0];
    }

    
    const newAdmin = new Admin({

            firstName: bodyData.firstName,
            otherNames: bodyData.otherNames,
            email: bodyData.email,
            phone: bodyData.phone,
            password: bodyData.password,
            profile: mProfile,
            roles: bodyData.roles,
            staffID: bodyData.staffID,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE admins SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newAdmin, uID], (error, rows, fields) => {
            
            if (!error){


                const mQuerySelect = 'SELECT * FROM admins WHERE id = ?';
       
        
                mysqlConnection.query(mQuerySelect,[uID], async (error, rows, fields) => {
                    
                    if (!error)
                        if(rows[0]){
                            const admin =  rows[0];
                            res.status(200).json({
                                success: true,
                                contentData: admin
                            });
                           
                        }else{
        
                            return res.status(400).json({
                                success: false,
                                message: 'User not found'});
                        }
                    })



          
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


const deleteAdmin = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM admins WHERE id = ?';
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


module.exports.getAllAdmins = getAllAdmins;
module.exports.createAdmin = createAdmin;
module.exports.loginAdmin = loginAdmin;
module.exports.getAdmin = getAdmin;
module.exports.updateAdmin = updateAdmin;
module.exports.deleteAdmin = deleteAdmin;