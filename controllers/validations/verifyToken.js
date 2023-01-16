const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    //const token = req.header('auth-token');
    


    

    console.log(req.headers.authorization.split(' ')[0])

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];

        console.log(token)

        if(!token) return res.status(401).json({
            success: false,
            message: 'Access denied, No Token!'
        });

        try{

            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
            
        }catch(error){
            res.status(400).json({
                success: false,
                message: 'Invalid token'
            });
        }

    }else{

        return res.status(401).json({
            success: false,
            message: 'Access denied, No Token!'
        });

    }   
}