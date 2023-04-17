// require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
// const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 8000;
const jwt = require("jsonwebtoken");

const auth = require("./middleware/auth");
const transaction = require("./routes/transaction");
const colors = require("colors");
const morgan = require("morgan");
const Transaction = require("./model/Transactions");
const connectDB = require("./config/db");

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/transaction", transaction);
// const pathToHome=path.join(__dirname,"./src/components/Registration")

app.post("/registration", async (req, res) => {
  // res.send('Registration post request executed');
  try {
    const pass = req.body.mypassword;
    const cpass = req.body.cpassword;
    console.log(pass, "pass in register");

    // WE CAN DO LIKE THIS ALSO,  BUT WE REFER BY HOOKS OF MONGOOSE..
    // BY THE HOOKS (pre and post) WE CAN DO MULTIPLE THINGS ..
    // AND ALSO BY THAT WE DID PASSWORD CHANGES ONLY WHEN THERE IS MODIEFIED (I.E first time is also known as modification )
    // const bcryptPassword=await bcrypt.hash(req.body.password,10);
    // console.log(bcryptPassword);
    if (pass === cpass) {
      console.log("inside pass===cpass");
      console.log(req.body, "req body");
      const transactionDetails = new Transaction({
        username: req.body.fullname,
        email: req.body.myemail,
        password: pass,
        transactions: [],
      });

      // calling function (ACT AS MIDDLEWARE) for creating token
      // const token= await transactionDetails.createToken();
      // console.log(token);

      // create cookie and add the jwt in cookie..
      // res.cookie(name,value,[options])..
      // res.cookie("jwt",token,{
      //     expires:new Date(Date.now()+500000),
      //     httpOnly:true,
      // });

      // const hashpssd = await transactionDetails.hashPassword();
      // console.log(hashpssd, "hashpssd");

      const data = await transactionDetails.save();
      console.log(data, "data while register");
      // res.status(201).send("registration completed");
      res.redirect("login");
    } else {
      res.send("Password are not matching");
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// app.get("/logout", auth, async (req, res) => {
//   // console.log(`Token : ${req.cookies.jwt}`);
//   try {
//     console.log("logout started ");
//     res.clearCookie("jwt");
//     // IF WE DON'T DO THIS THEN WE HAVE COOKIES OF JWT (IN WHICH THE DATA IS CLEAR ), SO, I AGREE WE CAN'T ABLE TO ACCESS THE SITES OF AUTH
//     // BUT THAT EMPTY COOKIE CAN'T REMOVE THIS CAN REMOVE AFTER REFRESHING THE PAGE
//     // AUTOMATICALLY
//     // SO , AVOID THAT REFRESHING WE USE SAVE METHOD..
//     req.userdetails.tokens = req.userdetails.tokens.filter((curele) => {
//       console.log(
//         `value of cur token : ${curele.token} and req.token :${req.tokn}`
//       );

//       return curele.token !== req.tokn;
//     });
//     // const data = await req.userdetails.save();
//     res.status(200).send("logout successfully");
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });
// app.get("/logout", (req, res) => {
//   console.log("logout starts");
//   // Remove the email from the localStorage
//   localStorage.removeItem("email");
// IMPORTANT : localStorage is not defined or used in backend..

//   // Redirect the user to the login page
//   // res.redirect("/login");
//   res.send(200);
// });

app.post("/login", async (req, res) => {
  try {
    const myemail = req.body.email;
    const mypassword = req.body.password;
    console.log(myemail, "myemail login");
    console.log(mypassword, "pass login");

    // const duppass=password;
    // const cpas=await bcrypt.hash(duppass,10);
    // console.log(cpas);

    const useremail = await Transaction.findOne({ email: myemail });
    console.log(useremail, "user find login");
    const ismatch = await bcrypt.compare(mypassword, useremail.password);
    console.log(ismatch, "match or not (pass) login ");
    //useremail is the instance of Register..
    // const token1 = await useremail.createToken();
    // console.log(token1);

    // create a cookie..
    // res.cookie("jwt", token1, {
    //   // expires:new Date(Date.now()+50000),
    //   httpOnly: true,
    //   // secure:true
    //   // IF WE DID secure:true then it will only work on htpps..
    // });
    console.log(`ismatch : ${ismatch}`);
    if (ismatch) {
      // const data = await useremail.save();
      res.status(200);
      res.redirect("home");
    } else {
      res.send("Invalid Detailsssss");
    }
  } catch (e) {
    res.status(400).send("Invalid Details");
  }
});

// app.get('/',(req,res)=>{
//     res.send('home page executed');
// })

app.listen(PORT, console.log(`Server running in  on port ${PORT}`));

// ${process.env.NODE_ENV} mode
