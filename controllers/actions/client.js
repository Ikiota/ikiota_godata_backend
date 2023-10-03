

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


const Clients = require('../../models/Client.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllClients = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM clients';


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

const getClient = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM clients WHERE id = ?';
       

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

const createClient = async (req, res) => {
   
    //hash password
    const salt = bcrypt.genSaltSync(10);

    
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    let bodyData =  req.body;
    
    const newClient = new Clients({


            firstName: bodyData.firstName,
            otherNames: bodyData.otherNames,
            email: bodyData.email,
            phone: bodyData.phone,
            password: hashedPassword,
            profile: bodyData.profile,
            sponsor: bodyData.sponsor,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM clients WHERE email = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.email], (error, rows, fields) => {
            
            if (!error){
                

                if(rows[0]){

                    res.status(404).json({
                        success: false,
                        message: "An account has already been created with this email!"
                    });

                   
                }else{

                    const mQuery = 'INSERT INTO clients SET?';
                    mysqlConnection.query(mQuery, newClient, (error, rows, fields) => {
                        
                        if (!error){
            
            
                          
                            const uID = rows.insertId;

                            const mQuery = 'SELECT * FROM clients WHERE id = ?';
       

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


const loginClient = async (req, res) => {

    //validate data before using it
    // const {error} = loginValidation(req.body);
    // if(error) return res.status(400).json({
    //     success: false,
    //     message: error.details[0].message
    // });


    const bodyData = req.body;
    

    try{

        const mQuerySelect = 'SELECT * FROM clients WHERE email = ?';
       
        
        mysqlConnection.query(mQuerySelect,[bodyData.email], async (error, rows, fields) => {
           
            if (!error)
            
                if(rows[0]){
                    const client =  rows[0];

                    
                    const validPass = await bcrypt.compare(bodyData.password, client.password);
                    if(!validPass) return res.status(400).json({
                        success: false,
                        message: 'Invalid password'});
                
                
                        const token = jwt.sign({_id: client.id.toString()}, process.env.TOKEN_SECRET);
                
                        res.header('auth-token', token).json(
                        { 
                            success: true,
                            message: client.id.toString(),
                            authToken: token,
                            contentData: client
                
                        });
                }else{

                    return res.status(400).json({
                        success: false,
                        message: 'Incorect email or password'});
                }
            })

        }catch(err){

            res.status(404).json({
                success: false,
                message: err
            });
        }


    
}


const updateClient = async (req, res) => {

    const uID = req.params.uID;
    
    let bodyData =  JSON.parse(req.body.bodyData);
    const files = req.files;
    let mProfile = bodyData.profile;
    if (files || files.length != 0){
        let mFiles = files.map(element => element.path.replace("\\", "/")); 
        mProfile = mFiles[0];
    }

    
    const newClient = new Clients({

            firstName: bodyData.firstName,
            otherNames: bodyData.otherNames,
            email: bodyData.email,
            phone: bodyData.phone,
            password: bodyData.password,
            profile: mProfile,
            sponsor: bodyData.sponsor,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE clients SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newClient, uID], (error, rows, fields) => {
            
            if (!error){


                const mQuerySelect = 'SELECT * FROM clients WHERE id = ?';
       
        
                mysqlConnection.query(mQuerySelect,[uID], async (error, rows, fields) => {
                    
                    if (!error)
                        if(rows[0]){
                            const client =  rows[0];
                            res.status(200).json({
                                success: true,
                                contentData: client
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


const deleteClient = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM clients WHERE id = ?';
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


module.exports.getAllClients = getAllClients;
module.exports.createClient = createClient;
module.exports.loginClient = loginClient;
module.exports.getClient = getClient;
module.exports.updateClient = updateClient;
module.exports.deleteClient = deleteClient;