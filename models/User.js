import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        reguired: true,   
    },
    surname: {
        type: String,
        reguired: true,   
    },
    birth_date: {
        type: Date,
        reguired: true,   
    },
    address: {
        type: String,
        reguired: true,   
    },
    phone_number: {
        type: String,
        reguired: true,   
    },
    email: {
      type: String,
      reguired: true,
      unigue: true,
    },
    passwordHash: {
      type: String,
      reguired: true,
    },
  });
  
  export default mongoose.model("User", UserSchema);
  