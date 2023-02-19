const Transaction =require('../model/Transactions');

exports.gettransaction=async(req,res,next)=>{
    try{
        // const email=req.parmas.email;
        console.log(`req.params.id (email) while routing in BACKEND : ${req.params.email}`);
        const userDetail=await Transaction.find({email:req.params.email});
        console.log(userDetail);
        res.status(200).json({data: userDetail})

    }catch(e){
        res.status(500).json({
            success:false,
            error:'Server Error'
        })
    }
}

exports.addtransaction=async(req,res,next)=>{
    try{
        const {text,amount,email}=req.body;
        console.log(`req.body while in controller (backend)-> ${req.body.text}, ${req.body.amount} and ${req.body.email}`);
        // const data = await Transaction.find({email : email});
        const filter={email:email};
        // { $set: {name: "Mickey", address: "Canyon 123" } }
        // var newvalues={$set : {transactions : [{text:text},{amount:amount}]}};
        const update={$push :{transactions : [{text:text,amount:amount}]}}
        // const newTrans = {text: text, amount: amount};


        const doc = await Transaction.findOneAndUpdate(filter, update,{
            new :true
        });
        console.log(` UPDATED DOC  (BACKEND): ${doc}`);
        // const transaction=await Transaction.create();
        
        // const transaction =new Transaction({
        //     transactions:[
        //         // ...this.transactions,
        //         text,
        //         amount
        //     ]
        // })
        // const data=await doc.save();
        // console.log(data);
        res.status(201).json({
            success:true,
            data:doc
        })
    }catch(err){
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
      
            res.status(400).json({
              success: false,
              error: messages
            });
          }
        else{
            res.status(500).json({
                success:false,
                error:'Server Error'
            });
        }
        // console.log(e);
    }

}


exports.deletetransaction=async(req,res,next)=>{
    try{
        const {email, id} = req.params;
        console.log(email);
        console.log(id);
        const transaction=await Transaction.find({email:req.params.email});

        if(!transaction){
            res.status(404).json({
                success:false,
                error:'No transaction found'
            })
        }

        console.log(transaction);
        // console.log(` transaction[0].username :${transaction[0].transactions} `);
        transaction[0].transactions=transaction[0].transactions.filter((doc)=>{
            // console.log(doc._id.toString());
            // console.log(id.toString());

            const res=doc._id.toString()!==id;
            console.log(res);
            return doc._id.toString()!==id;
        });
        // await transaction.save();
        console.log(`transactions :: ${transaction[0].transactions}`)
        console.log(`${transaction}`);
        console.log(`transactions ->${transaction.transactions} `);
        // console.log(`new transactions : ${transdet.length} `);
        
        // console.log(`tranaction: ${transaction}`);
        
        // await transaction.remove();
        // await transaction.save();
        const filter={email:email};
        const update={$set:{transactions:transaction[0].transactions}};
        const newdoc = await Transaction.findOneAndUpdate(filter, update,{
            new :true
        });
        res.status(200).send({
            success:true,
            // data:{}
        })


    }catch(e){
        res.status(500).json({
            success:false,
            error:'Server error'
        })
    }
}

