
const mysqlConnection = require('../../db');
const express = require('express');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');


const app = express();

app.use(express.json())


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
    

 
    const hashedPassword = req.body.password;


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

    


    const bodyData = req.body;
    

    try{

        const mQuerySelect = 'SELECT * FROM admins WHERE email = ?';
       
        
        mysqlConnection.query(mQuerySelect,[bodyData.email], async (error, rows, fields) => {
            
            if (!error)
                if(rows[0]){

                    const admin =  rows[0];

                    console.log(bodyData.password);
                    console.log(admin.password);
                   
                    const validPass = bodyData.password == admin.password;
                    if(bodyData.password != admin.password) return res.status(400).json({
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