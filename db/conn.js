// const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);

// const connectDB = async() => {
//   try {
//     const username=process.env.DB_NAME;
//     console.log(`Username in database ${username}`);
//     // const uri=process.env.MONGODB_URI
//     const conn = await mongoose.connect(`mongodb://localhost:27017/${username}`, {
//       useNewUrlParser: true,
//     });

//     console.log(`MongoDB Connected:`.cyan.underline.bold);
//   } catch (err) {
//     console.log(`Error: ${err.message}`.red);
//     process.exit(1);
//   }
// }

// module.exports = connectDB;


const mongoose=require('mongoose');
mongoose.set('strictQuery', false);

const dbname=process.env.DB_NAME;
mongoose.connect(`mongodb://localhost:27017/${dbname}`, { useNewUrlParser: true }).then(()=>console.log("connection successfull (database )...")).catch( (err)=>console.log(err));