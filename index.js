const mysqlConnection = require('./db');
const Express = require('express');
const cors = require('cors');
//const mongoose = require("mongoose");


const adminsRouter = require("./routes/admins")
const clientsRouter  = require("./routes/clients")
const companiesRouter  = require("./routes/companies")
const productsRouter  = require("./routes/products")

const multer = require('multer')



require('dotenv').config();

const app = Express();
const http = require('http').createServer(app);
const socketio = require('socket.io')(http);


// mongoose.connect(
//     process.env.DB_CONNECTION_URL,
    
//    // "mongodb+srv://vic-tests:p@55Tests@cluster0.pnb15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });


//     const con = mongoose.connection;
//     try{

//         con.on('open', () => {
//             console.log('connected...')
//         })

//     }catch(error){
//         console.error("Error: " + error);

//     }



    
   

    /*app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())*/

    
    
    app.use(Express.json())
    app.use(cors());
   
   

app.use('/uploads', Express.static(__dirname +'/uploads'));
//app.use('api/uploads', Express.static('uploads'));
   
//app.use(Express.static('uploads'));


    // app.get("/api/", (req, res) => {
    //    res.send("Hello from ikiota!We are live now!!!");
    // });
    app.get("/", (req, res) => {
        res.send("Hello from ikiota!We are live now!!!");
     });
 

   
    
//app.use(Express.static(__dirname +'uploads'));



    app.use('/admins', adminsRouter);
    app.use('/clients', clientsRouter);
    app.use('/companies', companiesRouter);
    app.use('/products', productsRouter);
    



    const port =  process.env.PORT || 3000;




    var clients = {};
    //Socket Logic
    socketio.on("connection", (userSocket) => {

        console.log('Server started with socket io');
        // console.log(userSocket.id, 'Has joined');
        
    })




    http.listen(port)
    // app.listen(
    //     port,
    //     (_) => {
    //         console.log('Server started');
    //     });
