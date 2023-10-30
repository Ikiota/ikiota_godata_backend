

const mysqlConnection = require('../../db');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Users = require('../../models/User.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllUsers = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM users';


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

const getUser = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM users WHERE id = ?';
       

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

const createUser = async (req, res) => {
   
   
    
    //const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPassword = req.body.password;
    let bodyData =  req.body;

    console.log("==========>");
    console.log(bodyData);
    
    const newUser = new Users({


            name: bodyData.name,
            email: bodyData.email,
            phone: bodyData.phone,
            password: hashedPassword,
            profile: bodyData.profile,
            company: bodyData.company,
            type: bodyData.type,
            location: bodyData.location,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM users WHERE email = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.email], (error, rows, fields) => {
            
            if (!error){
                

                if(rows[0]){

                    res.status(404).json({
                        success: false,
                        message: "An account has already been created with this email!"
                    });

                   
                }else{

                    const mQuery = 'INSERT INTO users SET?';
                    mysqlConnection.query(mQuery, newUser, (error, rows, fields) => {
                        
                        if (!error){
            
            
                          
                            const uID = rows.insertId;

                            const mQuery = 'SELECT * FROM users WHERE id = ?';
       

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


const loginUser = async (req, res) => {

    


    const bodyData = req.body;
    

    try{

        const mQuerySelect = 'SELECT * FROM users WHERE email = ?';
       
        
        mysqlConnection.query(mQuerySelect,[bodyData.email], async (error, rows, fields) => {
           
            if (!error)
            
                if(rows[0]){
                    const user =  rows[0];

                    
                    const validPass = bodyData.password === user.password;
                    if(!validPass) return res.status(400).json({
                        success: false,
                        message: 'Invalid password'});
                
                
                        const token = jwt.sign({_id: user.id.toString()}, process.env.TOKEN_SECRET);
                
                        res.header('auth-token', token).json(
                        { 
                            success: true,
                            message: user.id.toString(),
                            authToken: token,
                            contentData: user
                
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


const updateUser= async (req, res) => {

    const uID = req.params.uID;
    
    let bodyData =  JSON.parse(req.body.bodyData);
    const files = req.files;
    let mProfile = bodyData.profile;
    if (files || files.length != 0){
        let mFiles = files.map(element => element.path.replace("\\", "/")); 
        mProfile = mFiles[0];
    }

    
    const newUser = new Users({

        name: bodyData.name,
        email: bodyData.email,
        phone: bodyData.phone,
        password: hashedPassword,
        profile: bodyData.profile,
        company: bodyData.company,
        type: bodyData.type,
        location: bodyData.location,
        status: bodyData.status,
        dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE users SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newUser, uID], (error, rows, fields) => {
            
            if (!error){


                const mQuerySelect = 'SELECT * FROM users WHERE id = ?';
       
        
                mysqlConnection.query(mQuerySelect,[uID], async (error, rows, fields) => {
                    
                    if (!error)
                        if(rows[0]){
                            const user =  rows[0];
                            res.status(200).json({
                                success: true,
                                contentData: user
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


const deleteUser = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM users WHERE id = ?';
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


module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;