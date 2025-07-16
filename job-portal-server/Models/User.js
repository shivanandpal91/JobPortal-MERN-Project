// const mongoose=require('mongoose');

// const Schema=mongoose.Schema;


// const userSchema=new Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email :{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })


// //This creates a Mongoose model named 'users' based on the provided userSchema.
// // This stores the created model in the variable UserModel.
// // The UserModel can now be used to perform CRUD (Create, Read, Update, Delete) operations on the users collection in the MongoDB database.
// const UserModel=mongoose.model('users',userSchema);
// module.exports=UserModel;


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    default: '',
  },

  location: {
    type: String,
    default: '',
  },

  education: {
    type: String,
    default: '',
  },

  experience: {
    type: String,
    default: '',
  },

  bio: {
    type: String,
    default: '',
  },

  linkedin: {
    type: String,
    default: '',
  },

  github: {
    type: String,
    default: '',
  },

  portfolio: {
    type: String,
    default: '',
  },

  resume: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String, // base64 string (can be changed to URL later)
    default: '',
  },

  appliedJobs: [
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "jobs" // Optional: if you have a separate Job model
    },
    jobTitle: String,
    companyName: String,
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  ],

  
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
