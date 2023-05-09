// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer=require('multer')


// const app = express();

// app.use(express.json())


// ////app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// const Messages = require('../../models/Message.js');
// const { string } = require('@hapi/joi');




// const router = express.Router();

// const getAllMessages = async(req, res) => {

//     try{
//         const messages = await Messages.find();

//         res.status(200).json({
//             success: true,
//             message: messages._id,
//             contentData: messages
//         });
//     }catch(error){

//         res.status(404).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

// const getMessage = async(req, res) => {
//     const uID = req.params.uID;
//     try{

        
       
//         const message = await Messages.findById({
//             _id: uID
//         });
//         if(!message){
//             res.status(404).json({
//                 success: false,
//                 message: "Message not found",
//                 contentData: message
//             });
           
//         }else  res.status(200).json({
//             success: true,
//             message: message["_id"],
//             contentData: message
//         });
        

//     }catch(error){

//         res.status(404).json({
//             success: false,
//             message: error.message
//         });

//     }

// }




// const addMessage = async (req, res, next) => {



//     //check if request has image file
//     const files = req.files
    
   
//     if (!files || files.length == 0) return res.status(400).json({
//         success: false,
//         message: 'No file uploaded'
//     });


//     let mFiles = files.map(element => 
//         element.path.replace("\\", "/")
//     ); 

//     let bodyData = JSON.parse(req.body.bodyData);

   

     
//      const newMessage = new Messages({

       
//         senderID: bodyData.senderID,
//         subject: bodyData.subject,
//         description: bodyData.description,
//         files: mFiles,
//         status: bodyData.status,
//         dateTime: bodyData.dateTime,
//         lastEdit: bodyData.lastEdit
//     });

//     try{
//         await newMessage.save();
//         res.status(201).json({
//             success: true,
//             message: "Message added!",
//             contentData: newMessage
//         });

//     }catch(error){
//         res.status(400).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// const updateMessage = async (req, res) => {

//     const uID = req.params.uID;


//     let bodyData = JSON.parse(req.body.bodyData);
//     const newMessage = new Messages({

      
//         senderID: bodyData.senderID,
//         subject: bodyData.subject,
//         description: bodyData.description,
//         files: mFiles,
//         status: bodyData.status,
//         dateTime: bodyData.dateTime,
//         lastEdit: bodyData.lastEdit
//    });



//     try{

//        await Messages.findByIdAndUpdate(
//             {
//                 _id: uID
//             },
//             bodyData
           
//         )

//         res.status(202).json({
//             success: true,
//             message: uID,
//             contentData: newMessage
//             });

//     }catch (error){

//         res.status(401).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// const deleteMessage = async (req, res) => {

//     const uID = req.params.uID;
//     const messageExist = await Messages.findById({_id: uID});
//     if(!messageExist) return res.status(400).json({
//         success: false,
//         message: 'Message does not exist '+uID
//     });

//     try{
//         await Messages.findByIdAndRemove({
//             _id: uID
//         });
//         res.status(203).json({
//             success: true,
//             message: uID
//         });

//     }catch(error){
//         res.status(402).json({
//             success: false,
//             message: error.message
//         });
//     }
// }


// module.exports.getAllMessages = getAllMessages;
// module.exports.addMessage = addMessage;
// module.exports.getMessage = getMessage;
// module.exports.updateMessage = updateMessage;
// module.exports.deleteMessage = deleteMessage;












const mysqlConnection = require('../../db');
const express = require('express');
const bodyParser = require('body-parser');





const app = express();

app.use(express.json())


////app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const Messages = require('../../models/Message.js');
const PublicMessages = require('../../models/PublicMessages.js');
const { string } = require('@hapi/joi');




const router = express.Router();

const getAllMessages = async(req, res) => {

    try{
       


        const mQuery = 'SELECT * FROM messages';


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


const getMessage = async(req, res) => {
    const uID = req.params.uID;
    
    try{
       


        const mQuery = 'SELECT * FROM messages WHERE id = ?';
       

        mysqlConnection.query(mQuery,[uID], (error, rows, fields) => {
            
            if (!error)
                if(!rows)
                    res.status(404).json({
                        success: false,
                        message: "Message not found"
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

const addMessage = async (req, res) => {
    
    let bodyData = JSON.parse(req.body.bodyData);

    //check if request has image file
    const files = req.files
        
    
   


    let mFiles = files.map(element => 
        element.path.replace("\\", "/")
    ); 



        const newMessage = new Messages({
                    senderID: bodyData.senderID,
                    subject: bodyData.subject,
                    description: bodyData.description,
                    files: mFiles[0],
                    status: bodyData.status,
                    dateTime: bodyData.dateTime,
                    lastEdit: bodyData.lastEdit
               });

              // console.log(newMessage);
    
    try{

                    const mQuery = 'INSERT INTO messages SET?';
                    mysqlConnection.query(mQuery, newMessage, (error, rows, fields) => {
                        
                        if (!error){
            
                            const uID = rows.insertId;
                            newMessage.id = uID;
                            res.status(200).json({
                                success: true,
                                message: "Message added successfully",
                                contentData: newMessage
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



const addPublicMessage = async (req, res) => {
    
    let bodyData = JSON.parse(req.body.bodyData);

    //check if request has image file
    const files = req.files
        
    
   


    let mFiles = files.map(element => 
        element.path.replace("\\", "/")
    ); 



        const newMessage = new PublicMessages({
                    name: bodyData.name,
                    phone: bodyData.phone,
                    email: bodyData.email,
                    subject: bodyData.subject,
                    description: bodyData.description,
                    status: bodyData.status,
                    dateTime: bodyData.dateTime,
                    lastEdit: bodyData.lastEdit
               });

              // console.log(newMessage);
    
    try{

                    const mQuery = 'INSERT INTO public_messages SET?';
                    mysqlConnection.query(mQuery, newMessage, (error, rows, fields) => {
                        
                        if (!error){
            
                            const uID = rows.insertId;
                            newMessage.id = uID;
                            res.status(200).json({
                                success: true,
                                message: "Message added successfully",
                                contentData: newMessage
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




const updateMessage = async (req, res) => {

    const uID = req.params.uID;

    let bodyData = JSON.parse(req.body.bodyData);
     //check if request has image file
     const files = req.files
    
   
    
 
     let mFiles = files.map(element => 
         element.path.replace("\\", "/")
     ); 
 



    
    const newMessage = new Messages({
        senderID: bodyData.senderID,
        subject: bodyData.subject,
        description: bodyData.description,
        files: mFiles,
        status: bodyData.status,
        dateTime: bodyData.dateTime,
        lastEdit: bodyData.lastEdit
   });
    
    try{

        const mQuery = 'UPDATE messages SET? WHERE id =?';
        mysqlConnection.query(mQuery, [newMessage, uID], (error, rows, fields) => {
            
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


const deleteMessage = async (req, res) => {

    const uID = req.params.uID;

    
    try{

        const mQuery = 'DELETE FROM messages WHERE id = ?';
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


module.exports.getAllMessages = getAllMessages;
module.exports.addMessage = addMessage;
module.exports.addPublicMessage = addPublicMessage;
module.exports.getMessage = getMessage;
module.exports.updateMessage = updateMessage;
module.exports.deleteMessage = deleteMessage;
