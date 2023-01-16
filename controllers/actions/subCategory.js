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


const Category = require('../../models/SubCategory.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllSubCategories = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM subCategories';


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

const getSubCategory = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM subCategories WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Category not found"
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

const addSubCategory = async (req, res) => {
    


    let bodyData =  req.body;
    
    const newSubCategory = new SubCategories({
            name: bodyData.name,
            description: bodyData.description,
            poster: bodyData.poster,
            category: bodyData.category,
            status: bodyData.status,
            dateCreated: bodyData.dateCreated
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM subCategories WHERE name = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.name], (error, rows, fields) => {
            
            if (!error){
                console.log(`==========>SubCategory ${rows}`);

                if(!rows[0]){
                    
                    const mQuery = 'INSERT INTO subCategories SET?';
                    mysqlConnection.query(mQuery, newSubCategory, (error, rows, fields) => {
                        
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
                        message: "A subCategory has already been created with this name!"
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



const updateSubCategory = async (req, res) => {

    const uID = req.params.uID;

    let bodyData =  req.body;
    
    const newSubCategory = new SubCategories({

    
        name: bodyData.name,
        category: bodyData.category,
        description: bodyData.description,
        poster: bodyData.poster,
        status: bodyData.status,
        dateCreated: bodyData.dateCreated
    });
    
    try{

        const mQuery = 'UPDATE subCategories SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newSubCategory, uID], (error, rows, fields) => {
            
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


const deleteSubCategory = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM subCategories WHERE id = ?';
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


module.exports.getAllSubCategories = getAllSubCategories;
module.exports.addSubCategory = addSubCategory;
module.exports.getSubCategory = getSubCategory;
module.exports.updateSubCategory = updateSubCategory;
module.exports.deleteSubCategory = deleteSubCategory;
