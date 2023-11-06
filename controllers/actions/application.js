
const mysqlConnection = require('../../db');
const express = require('express');
const bodyParser = require('body-parser');





const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Applications = require('../../models/Application.js');
const { string } = require('@hapi/joi');


const router = express.Router();

const getAllApplications = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM applications ORDER BY id DESC';


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

const getApplication = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM applications WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Application not found"
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

const addApplication = async (req, res) => {
   
   
    
   


    let bodyData =  JSON.parse(req.body.bodyData);

    
    const newApplication = new Applications({

       

        
        object                      : bodyData.object,
        description                 : bodyData.description,
        product                     : bodyData.product,
        company                     : bodyData.company,
        amount                      : bodyData.amount,
        project                     : bodyData.project,
        otherDocs                   : bodyData.otherDocs,
        status                      : bodyData.status ?? "pending",
        dateCreated                 : bodyData.dateCreated ?? new Date(),

        });
    
    try{
        

        const mQuerySelect = 'SELECT * FROM applications WHERE product = ? AND company = ?';
        
        mysqlConnection.query(mQuerySelect,[bodyData.product, bodyData.company], (error, rows, fields) => {
            
            if (!error){
                

                if(rows[0]){

                    res.status(404).json({
                        success: false,
                        message: "This user has already applied to this product!"
                    });

                   
                }else{
                   

                    const mQuery = 'INSERT INTO applications SET?';
                    mysqlConnection.query(mQuery, newApplication, (error, rows, fields) => {
                       

                        if (!error){
            
            
                          
                            const uID = rows.insertId;

                            const mQuery = 'SELECT * FROM applications WHERE id = ?';
       

                            mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
                                
                                if (!error)
                                    if(!rows)
                                        res.status(404).json({
                                            success: false,
                                            message: "Application not found"
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


const updateApplication = async (req, res) => {

    const uID = req.params.uID;
    
    let bodyData =  JSON.parse(req.body.bodyData);

    
    const newApplication = new Applications({


        object                      : bodyData.object,
        description                 : bodyData.description,
        product                     : bodyData.product,
        company                     : bodyData.company,
        amount                      : bodyData.amount,
        project                     : bodyData.project,
        otherDocs                   : bodyData.otherDocs,
        status                      : bodyData.status ?? "active",
        dateCreated                 : bodyData.dateCreated ?? new Date(),
    });
    
    try{

        const mQuery = 'UPDATE applications SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newApplication, uID], (error, rows, fields) => {
            
            if (!error){


                const mQuerySelect = 'SELECT * FROM applications WHERE id = ?';
       
        
                mysqlConnection.query(mQuerySelect,[uID], async (error, rows, fields) => {
                    
                    if (!error)
                        if(rows[0]){
                            const application =  rows[0];
                            res.status(200).json({
                                success: true,
                                contentData: application
                            });
                           
                        }else{
        
                            return res.status(400).json({
                                success: false,
                                message: 'Application not found'});
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


const deleteApplication = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM applications WHERE id = ?';
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


module.exports.getAllApplications = getAllApplications;
module.exports.addApplication = addApplication;
module.exports.getApplication = getApplication;
module.exports.updateApplication = updateApplication;
module.exports.deleteApplication = deleteApplication;
