const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isValid = (email) => {
  return validator.isEmail(email);
};

const TransactionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
  },
  email: {
    type: String,
    required: [true, "Please enter valid email"],
    unique: true,
    validator: [isValid, "Email is not valid"],
  },
  password: {
    type: String,
    required: true,
  },
  transactions: [
    {
      text: { type: String, required: [true, "Please enter the name "] },
      amount: {
        type: Number,
        required: [true, "Please enter a positive or negative number"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// TransactionSchema.methods.createToken=async function(req,res){
//   try{

//     const token1=jwt.sign({_id:this._id},process.env.SECRET_KEY);

//     this.tokens=this.tokens.concat({token:token1});

//     return token1;

//   }catch(e){
//     console.log('error');
//     res.send('error');
//   }
// }

// pre function..
TransactionSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
  }
  next();
});

// TransactionSchema.methods.hashPassword = async function (req, res) {
//   if (this.isModified("password")) {
//     console.log(this.password);
//     this.password = await bcrypt.hash(this.password, 10);
//     // console.log(this.password);
//   }
// };

const Transaction = new mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
