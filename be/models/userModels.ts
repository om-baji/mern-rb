import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  refreshToken: string;
  isAdmin? : boolean;
}

const userSchema = new Schema<User> ({
    name : {
        type : String,
        required : [true,"Required field"]
    },
    email : {
        type : String,
        match : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required : [true,"Required field"],
        unique: true,
    },
    password : {
        type : String,
        required : [true,"Required field"],
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    refreshToken : String,
    isAdmin : {
        type : Boolean,
        default : false
    }
})

const userModel = mongoose.model("User",userSchema);

export default userModel;
