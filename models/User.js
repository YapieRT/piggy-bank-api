import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,   
    },
    surname: {
        type: String,
        required: true,   
    },
    birth_date: {
        type: Date,
        required: true,   
    },
    address: {
        type: String,
        required: true,   
    },
    phone_number: {
        type: String,
        required: true,   
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  });
  
  export default mongoose.model("User", UserSchema);
  