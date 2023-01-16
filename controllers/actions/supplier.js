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


const Suppliers = require('../../models/Supplier.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllSuppliers = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM suppliers';


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

const getSupplier = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM suppliers WHERE id = ?';
       

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

const createSupplier = async (req, res) => {
    

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
    
    const newSupplier = new Suppliers({


            surName: bodyData.name,
            otherNames: bodyData.otherNames,
            stores: bodyData.stores,
            email: bodyData.email,
            phone: bodyData.phone,
            password: hashedPassword,
            profile: bodyData.profile,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM suppliers WHERE phone = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.phone], (error, rows, fields) => {
            
            if (!error){
                console.log(`==========>User ${rows}`);

                if(!rows[0]){
                    
                    const mQuery = 'INSERT INTO suppliers SET?';
                    mysqlConnection.query(mQuery, newSupplier, (error, rows, fields) => {
                        
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
                        message: "An account has already been created with this phone number!"
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


const loginSupplier = async (req, res) => {

    //validate data before using it
    // const {error} = loginValidation(req.body);
    // if(error) return res.status(400).json({
    //     success: false,
    //     message: error.details[0].message
    // });


    const bodyData = req.body;
    console.log(`==========>User phone ${bodyData.phone}`);


    try{

        const mQuerySelect = 'SELECT * FROM suppliers WHERE phone = ?';
       
        
        mysqlConnection.query(mQuerySelect,[bodyData.phone], async (error, rows, fields) => {
            
            if (!error)
                if(rows[0]){
                    const supplier =  rows[0];

                    
                    const validPass = await bcrypt.compare(bodyData.password, supplier.password);
                    if(!validPass) return res.status(400).json({
                        success: false,
                        message: 'Invalid password'});
                
                
                        const token = jwt.sign({_id: supplier.id.toString()}, process.env.TOKEN_SECRET);
                
                        res.header('auth-token', token).json(
                        { 
                            success: true,
                            message: supplier.id.toString(),
                            authToken: token,
                            contentData: supplier
                
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


const updateSupplier = async (req, res) => {

    const uID = req.params.uID;

    let bodyData =  req.body;
    
    const newSupplier = new Suppliers({

            surName: bodyData.name,
            otherNames: bodyData.otherNames,
            email: bodyData.email,
            phone: bodyData.phone,
            password: hashedPassword,
            profile: bodyData.profile,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE suppliers SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newSupplier, uID], (error, rows, fields) => {
            
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


const deleteSupplier = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM suppliers WHERE id = ?';
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


module.exports.getAllSuppliers = getAllSuppliers;
module.exports.createSupplier = createSupplier;
module.exports.loginSupplier = loginSupplier;
module.exports.getSupplier = getSupplier;
module.exports.updateSupplier = updateSupplier;
module.exports.deleteSupplier = deleteSupplier;