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


const Ads = require('../../models/Ad.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllAds = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM ads';


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

const getAd = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM ads WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Ad not found"
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

const addAd = async (req, res) => {
    


    let bodyData =  req.body;

    
    
    const newAd = new Ads({
            title: bodyData.title,
            description: bodyData.description,
            poster: bodyData.poster,
            type: bodyData.type,
            status: bodyData.status,
            category: bodyData.category,
            link: bodyData.link,
            keyWords: bodyData.keyWords,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM ads WHERE name = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.name], (error, rows, fields) => {
            
            if (!error){
                console.log(`==========>Brand ${rows}`);

                if(!rows[0]){
                    
                    const mQuery = 'INSERT INTO ads SET?';
                    mysqlConnection.query(mQuery, newAd, (error, rows, fields) => {
                        
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
                        message: "An ad has already been created with this name!"
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



const updateAd = async (req, res) => {

    const uID = req.params.uID;

    let bodyData =  req.body;
    
    const newAd = new Ads({

    
        title: bodyData.title,
        description: bodyData.description,
        poster: bodyData.poster,
        type: bodyData.type,
        status: bodyData.status,
        category: bodyData.category,
        link: bodyData.link,
        keyWords: bodyData.keyWords,
        dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE ads SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newAd, uID], (error, rows, fields) => {
            
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


const deleteAd = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM ads WHERE id = ?';
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


module.exports.getAllAds = getAllAds;
module.exports.addAd = addAd;
module.exports.getAd = getAd;
module.exports.updateAd = updateAd;
module.exports.deleteAd = deleteAd;