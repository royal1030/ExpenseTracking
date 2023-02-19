const jwt=require('jsonwebtoken');
const Transaction=require('../model/Transactions');
const cookieParser = require('cookie-parser');



const auth=async(req,res,next)=>{
    try{
    // jwt.verify(token, secretOrPublicKey, [options, callback])
    const tokn=req.cookies.jwt;
    console.log(`Token or jwt by req.cookies.jwt is : ${tokn}`);
    const verify=jwt.verify(tokn,process.env.SECRET_KEY);
    console.log(`Verify gives : ${verify}`);
    const userdetails=await Transaction.findOne({_id:verify._id});
    console.log(`User Detail :  ${userdetails}`);

    req.tokn=tokn;
    req.userdetails=userdetails;

    next();
    
    }catch(e){
        res.status(401).send(e);
    }
}


module.exports=auth;