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


const Addresses = require('../../models/Address.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllAddresses = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM addresses ORDER BY dateCreated DESC';


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

const getAddress = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM addresses WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Address not found"
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

const addAddress = async (req, res) => {
    

    //validate data before using it
    // const {error} = registerValidation(req.body);
    // if(error) return res.status(400).json({
    //     success: false,
    //     message: error.details[0].message
    // });


   
    


    let bodyData =  req.body;
    
    const newAddress = new Addresses({

            userID: bodyData.userID,
            label: bodyData.label,
            contactName: bodyData.contactName,
            contactPhone: bodyData.contactPhone,
            place: bodyData.place,
            latitude: bodyData.latitude,
            longitude: bodyData.longitude,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM addresses WHERE userID = ? AND label = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.userID, bodyData.label], (error, rows, fields) => {
            
            if (!error){
                
                if(rows[0]){


                    res.status(404).json({
                        success: false,
                        message: "You have already created an address with this address label!"
                    });

                   
                }else{

                    const mQuery = 'INSERT INTO addresses SET?';
                    mysqlConnection.query(mQuery, newAddress, (error, rows) => {
                       

                        if (!error){
            



                            const uID = rows.insertId;

                            const mQuery = 'SELECT * FROM addresses WHERE id = ?';
       

                            mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
                                
                                if (!error)
                                    if(!rows)
                                        res.status(404).json({
                                            success: false,
                                            message: "Address not found"
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





            
                            // res.status(200).json({
                            //     success: true,
                            //     contentData: rows
                            // });
            
                      
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




const updateAddress = async (req, res) => {

    const uID = req.params.uID;
    
    let bodyData =  req.body;
  
    const newAddress = new Addresses({

        userID: bodyData.userID,
        label: bodyData.label,
        contactName: bodyData.contactName,
        contactPhone: bodyData.contactPhone,
        place: bodyData.place,
        latitude: bodyData.latitude,
        longitude: bodyData.longitude,
        status: bodyData.status,
        dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE addresses SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newAddress, uID], (error, rows, fields) => {
            
            if (!error){


                res.status(200).json({
                    success: true,
                    contentData: newAddress
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


const deleteAddress = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM addresses WHERE id = ?';
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


module.exports.getAllAddresses = getAllAddresses;
module.exports.addAddress = addAddress;
module.exports.getAddress = getAddress;
module.exports.updateAddress = updateAddress;
module.exports.deleteAddress = deleteAddress;