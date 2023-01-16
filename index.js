const mysqlConnection = require('./db');
const Express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const buyersRouter  = require("./routes/buyers")
const vendorsRouter  = require("./routes/vendors")
const productsRouter  = require("./routes/products")
const addressesRouter  = require("./routes/addresses")
const categoriesRouter  = require("./routes/categories")
const subCategoriesRouter  = require("./routes/subCategories")
const suppliersRouter  = require("./routes/suppliers")
const brandsRouter  = require("./routes/brands")
const storesRouter  = require("./routes/stores")
const ordersRouter  = require("./routes/orders")
const adsRouter  = require("./routes/ads")
const messagesRouter  = require("./routes/messages")
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




    app.use('/buyers', buyersRouter);
    app.use('/vendors', vendorsRouter);
    app.use('/products', productsRouter);
    app.use('/addresses', addressesRouter);    
    app.use('/categories', categoriesRouter);
    app.use('/subCategories', subCategoriesRouter);
    app.use('/orders', ordersRouter);
    app.use('/brands', brandsRouter);
    app.use('/suppliers', suppliersRouter);
    app.use('/stores', storesRouter);
    app.use('/ads', adsRouter);
    app.use('/messages', messagesRouter);



    const port =  process.env.PORT || 900;




    var clients = {};
    //Socket Logic
    socketio.on("connection", (userSocket) => {

        console.log('Server started with socket io');
         console.log(userSocket.id, 'Has joined');
        userSocket.on("add_order", (data) => {
            
            clients[data.clientID] = userSocket;
            userSocket.broadcast.emit("receive_order", data)
        });
        userSocket.on("edit_order", (data) => {


            let targetId = data.clientID;

            clients[targetId] = userSocket;
            if (clients[targetId]) clients[targetId].emit("edited_order", data);

    
        });
    })




    http.listen(port)
    // app.listen(
    //     port,
    //     (_) => {
    //         console.log('Server started');
    //     });