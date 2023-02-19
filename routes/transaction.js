const express=require('express');
const { gettransaction, addtransaction, deletetransaction } = require('../controller/transaction');
const router=express.Router();

router.route('/')
// .get(gettransaction)
.post(addtransaction);

router.route('/:email')
.get(gettransaction);

router.route('/:email/:id')
.delete(deletetransaction)

module.exports=router;