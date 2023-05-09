const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../../db');


const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Orders = require('../../models/Order.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllOrders = async(req, res) => {

    
    
    try{
       


        const mQuery = 'SELECT * FROM orders';


        
       

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
    
    
    
    
    
    
    
    // try{
    //     const orders = await Orders.find();

    //     res.status(200).json({
    //         success: true,
    //         message: orders._id,
    //         contentData: orders
    //     });
    // }catch(error){

    //     res.status(404).json({
    //         success: false,
    //         message: error.message
    //     });
    // }
}
const getCurrentUserOrders = async(req, res) => {

    // try{
    //     const uID = req.params.uID;
    //     const orders = await Orders.find({
    //         clientID: uID
    //     });

    //     res.status(200).json({
    //         success: true,
    //         message: orders._id,
    //         contentData: orders
    //     });
    // }catch(error){

    //     res.status(404).json({
    //         success: false,
    //         message: error.message
    //     });
    // }








    try{
       


        const mQuery = 'SELECT * FROM orders WHERE clientID = ?';

        const uID = req.params.uID;

        const date = new Date();
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
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

const getOrder = async(req, res) => {
    const uID = req.params.uID;




    try{
       


        const mQuery = 'SELECT * FROM orders';


        const date = new Date();
       

        mysqlConnection.query(mQuery, (error, rows, fields) => {
            
            if (!error)
            
            res.status(200).json({
                success: true,
                contentData: rows
            });

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







    // try{

        
       
    //     const order = await Orders.findById({
    //         _id: uID
    //     });
    //     if(!order){
    //         res.status(404).json({
    //             success: false,
    //             message: "Order not found",
    //             contentData: order
    //         });
           
    //     }else  res.status(200).json({
    //         success: true,
    //         message: order["_id"],
    //         contentData: order
    //     });
        

    // }catch(error){

    //     res.status(404).json({
    //         success: false,
    //         message: error.message
    //     });

    // }

}

const addOrder = async (req, res) => {


    let bodyData =  req.body;
   


    const newOrder = new Orders({

        items: bodyData.items,
        clientID: bodyData.clientID,
        clientFcmToken: bodyData.clientFcmToken,
        receiverPhone: bodyData.receiverPhone,
        email: bodyData.email,
        address: bodyData.address,
        deliveryMode: bodyData.deliveryMode,
        deliveryAgent: bodyData.deliveryAgent,
        dateTimeDelivered: bodyData.dateTimeDelivered,
        totalPrice: bodyData.totalPrice,
        paymentMode: bodyData.paymentMode,
        paymentStatus: bodyData.paymentStatus,
        status: bodyData.status,
        qrCode: bodyData.qrCode,
        signature: bodyData.signature,
        dateCreated: bodyData.dateCreated
    });

    try{
        const mQuery = 'INSERT INTO orders SET?';
        mysqlConnection.query(mQuery, newOrder, (error, rows, fields) => {
            
            if (!error){


                const uID = rows.insertId;
                newOrder.id = uID;
                res.status(200).json({
                    success: true,
                    message: "Order added successfully",
                    contentData: newOrder
                });

                

                            // const mQuery = 'SELECT * FROM orders WHERE id = ?';
       

                            // mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
                                
                            //     if (!error)
                            //         if(!rows)
                            //             res.status(404).json({
                            //                 success: false,
                            //                 message: "Address not found"
                            //             });
                            //         else     
                            //             res.status(200).json({
                            //                 success: true,
                            //                 contentData: rows[0]
                            //             });
                    
                            //     else
                            //     //console.log(err.sqlMessage);
                    
                            //     res.status(404).json({
                            //         success: false,
                            //         message: error.sqlMessage
                            //     });
                            //     })

          
            }
           else
           
            res.status(404).json({
                success: false,
                message: error.sqlMessage
            });
             })

    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}


const updateOrder = async (req, res) => {

    const uID = req.params.uID;

    let bodyData =  req.body;

    const mOrder = new Orders({

        items: bodyData.items,
        clientID: bodyData.clientID,
        clientFcmToken: bodyData.clientFcmToken,
        receiverPhone: bodyData.receiverPhone,
        email: bodyData.email,
        address: bodyData.address,
        deliveryMode: bodyData.deliveryMode,
        deliveryAgent: bodyData.deliveryAgent,
        dateTimeDelivered: bodyData.dateTimeDelivered,
        totalPrice: bodyData.totalPrice,
        paymentMode: bodyData.paymentMode,
        paymentStatus: bodyData.paymentStatus,
        status: bodyData.status,
        qrCode: bodyData.qrCode,
        signature: bodyData.signature,
        dateCreated: bodyData.dateCreated
});


    try{

        const mQuery = 'UPDATE orders SET ? WHERE id =?';
        mysqlConnection.query(mQuery, [mOrder, uID], (error, rows, fields) => {
            
            if (!error){


                //console.log(uID);
                
                //const uID = rows.insertId;

                const mQuery = 'SELECT * FROM orders WHERE id = ?';


                mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
                    
                    if (!error)
                        if(!rows)
                            res.status(404).json({
                                success: false,
                                message: "Order not found"
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


       
    }catch(err){

        res.status(404).json({
            success: false,
            message: err
        });
    }





    // try{

    //    await Orders.findByIdAndUpdate(
    //         {
    //             _id: uID
    //         },
    //         req.body
           
    //     )

    //     res.status(202).json({
    //         success: true,
    //         message: uID,
    //         });

    // }catch (error){

    //     res.status(401).json({
    //         success: false,
    //         message: error.message
    //     });
    // }
}


const deleteOrder = async (req, res) => {

    const uID = req.params.uID;



    
    try{

        const mQuery = 'DELETE FROM orders WHERE id = ?';
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





    // try{
    //     await Orders.findByIdAndRemove({
    //         _id: uID
    //     });
    //     res.status(203).json({
    //         success: true,
    //         message: uID
    //     });

    // }catch(error){
    //     res.status(402).json({
    //         success: false,
    //         message: error.message
    //     });
    // }
}


module.exports.getAllOrders = getAllOrders;
module.exports.getCurrentUserOrders = getCurrentUserOrders;
module.exports.addOrder = addOrder;
module.exports.getOrder = getOrder;
module.exports.updateOrder = updateOrder;
module.exports.deleteOrder = deleteOrder;