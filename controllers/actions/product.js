
const mysqlConnection = require('../../db');
const express = require('express');
const bodyParser = require('body-parser');





const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Products = require('../../models/Product.js');
const { string } = require('@hapi/joi');


const router = express.Router();

const getAllProducts = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM products';


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

const getProduct = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM products WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Product not found"
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

const addProduct = async (req, res) => {
   
    //hash password
    const salt = bcrypt.genSaltSync(10);

    
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    let bodyData =  req.body;
    
    const newProduct = new Products({

            name                       : bodyData.name,
            description                : bodyData.description,
            type                       : bodyData.type,
            sector                     : bodyData.sector,
            valueMin                   : bodyData.minValue,
            valueMax                   : bodyData.maxValue,
            maturity                   : bodyData.maturity,
            warranty                   : bodyData.warranty,
            provider                   : bodyData.provider,
            cover                      : bodyData.cover,
            status                     : bodyData.status ?? "active",
            dateCreated                : bodyData.dateCreated ?? new Date(),
        });
    
    try{

        const mQuerySelect = 'SELECT * FROM products WHERE name = ?';
       

        mysqlConnection.query(mQuerySelect,[bodyData.name], (error, rows, fields) => {
            
            if (!error){
                

                if(rows[0]){

                    res.status(404).json({
                        success: false,
                        message: "An account has already been created with this name!"
                    });

                   
                }else{

                    const mQuery = 'INSERT INTO products SET?';
                    mysqlConnection.query(mQuery, newProduct, (error, rows, fields) => {
                        
                        if (!error){
            
            
                          
                            const uID = rows.insertId;

                            const mQuery = 'SELECT * FROM products WHERE id = ?';
       

                            mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
                                
                                if (!error)
                                    if(!rows)
                                        res.status(404).json({
                                            success: false,
                                            message: "Product not found"
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


const updateProduct = async (req, res) => {

    const uID = req.params.uID;
    
    let bodyData =  JSON.parse(req.body.bodyData);
    const files = req.files;
    let mProfile = bodyData.profile;
    if (files || files.length != 0){
        let mFiles = files.map(element => element.path.replace("\\", "/")); 
        mProfile = mFiles[0];
    }

    
    const newProduct = new Products({

        name                       : bodyData.name,
        description                : bodyData.description,
        type                       : bodyData.type,
        sector                     : bodyData.sector,
        valueMin                   : bodyData.minValue,
        valueMax                   : bodyData.maxValue,
        maturity                   : bodyData.maturity,
        warranty                   : bodyData.warranty,
        provider                   : bodyData.provider,
        cover                      : bodyData.cover,
        status                     : bodyData.status ?? "active",
        dateCreated                : bodyData.dateCreated ?? new Date(),
    });
    
    try{

        const mQuery = 'UPDATE products SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newProduct, uID], (error, rows, fields) => {
            
            if (!error){


                const mQuerySelect = 'SELECT * FROM products WHERE id = ?';
       
        
                mysqlConnection.query(mQuerySelect,[uID], async (error, rows, fields) => {
                    
                    if (!error)
                        if(rows[0]){
                            const product =  rows[0];
                            res.status(200).json({
                                success: true,
                                contentData: product
                            });
                           
                        }else{
        
                            return res.status(400).json({
                                success: false,
                                message: 'Product not found'});
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


const deleteProduct = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM products WHERE id = ?';
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


module.exports.getAllProducts = getAllProducts;
module.exports.addProduct = addProduct;
module.exports.getProduct = getProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
