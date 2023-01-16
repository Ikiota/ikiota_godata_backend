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


const Store = require('../../models/Store.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllStores = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM stores';


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

const getStore = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM stores WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Store not found"
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

const addStore = async (req, res) => {
    


    let bodyData =  req.body;
    
    const newStore = new Stores({
            name: bodyData.name,
            owner: bodyData.owner,
            locationLat: bodyData.locationLat,
            locationLng: bodyData.category,
            poster: bodyData.poster,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM stores WHERE name = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.name], (error, rows, fields) => {
            
            if (!error){
                console.log(`==========>store ${rows}`);

                if(!rows[0]){
                    
                    const mQuery = 'INSERT INTO stores SET?';
                    mysqlConnection.query(mQuery, newStore, (error, rows, fields) => {
                        
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
                        message: "A store has already been created with this name!"
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



const updateStore = async (req, res) => {

    const uID = req.params.uID;

    let bodyData =  req.body;
    
    const newStore = new Stores({

            name: bodyData.name,
            owner: bodyData.owner,
            locationLat: bodyData.locationLat,
            locationLng: bodyData.category,
            poster: bodyData.poster,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE stores SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newStore, uID], (error, rows, fields) => {
            
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


const deleteStore = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM stores WHERE id = ?';
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


module.exports.getAllStores = getAllStores;
module.exports.addStore = addStore;
module.exports.getStore = getStore;
module.exports.updateStore = updateStore;
module.exports.deleteStore = deleteStore;
