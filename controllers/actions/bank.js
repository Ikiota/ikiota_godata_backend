
const mysqlConnection = require('../../db');
const express = require('express');
const bodyParser = require('body-parser');





const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Banks = require('../../models/Bank.js');
const { string } = require('@hapi/joi');


const router = express.Router();

const getAllBanks = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM banks ORDER BY id DESC';


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

const getBank = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM banks WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Bank not found"
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

const addBank = async (req, res) => {
   
   
    
   


    let bodyData =  JSON.parse(req.body.bodyData);

    
    const newBank = new Banks({

       

            name                       : bodyData.name,
            description                : bodyData.description,
            type                       : bodyData.type,
            creator                    : bodyData.creator,
            logo                       : bodyData.logo,
            status                     : bodyData.status ?? "active",
            dateCreated                : bodyData.dateCreated ?? new Date(),
        });
    
    try{
        console.log(newBank);

        const mQuerySelect = 'SELECT * FROM banks WHERE name = ?';
        
        mysqlConnection.query(mQuerySelect,[bodyData.name], (error, rows, fields) => {
            
            if (!error){
                

                if(rows[0]){

                    res.status(404).json({
                        success: false,
                        message: "A bank has already been created with this name!"
                    });

                   
                }else{
                   

                    const mQuery = 'INSERT INTO banks SET?';
                    mysqlConnection.query(mQuery, newBank, (error, rows, fields) => {
                       

                        if (!error){
            
            
                          
                            const uID = rows.insertId;

                            const mQuery = 'SELECT * FROM banks WHERE id = ?';
       

                            mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
                                
                                if (!error)
                                    if(!rows)
                                        res.status(404).json({
                                            success: false,
                                            message: "Bank not found"
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


const updateBank = async (req, res) => {

    const uID = req.params.uID;
    
    let bodyData =  JSON.parse(req.body.bodyData);

    
    const newBank = new Banks({

        name                       : bodyData.name,
        description                : bodyData.description,
        type                       : bodyData.type,
        creator                    : bodyData.creator,
        logo                       : bodyData.logo,
        status                     : bodyData.status ?? "active",
        dateCreated                : bodyData.dateCreated ?? new Date(),
    });
    
    try{

        const mQuery = 'UPDATE banks SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newBank, uID], (error, rows, fields) => {
            
            if (!error){


                const mQuerySelect = 'SELECT * FROM banks WHERE id = ?';
       
        
                mysqlConnection.query(mQuerySelect,[uID], async (error, rows, fields) => {
                    
                    if (!error)
                        if(rows[0]){
                            const bank =  rows[0];
                            res.status(200).json({
                                success: true,
                                contentData: bank
                            });
                           
                        }else{
        
                            return res.status(400).json({
                                success: false,
                                message: 'Bank not found'});
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


const deleteBank = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM banks WHERE id = ?';
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


module.exports.getAllBanks = getAllBanks;
module.exports.addBank = addBank;
module.exports.getBank = getBank;
module.exports.updateBank = updateBank;
module.exports.deleteBank = deleteBank;
