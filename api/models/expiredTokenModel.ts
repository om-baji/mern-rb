import mongoose, { Document, Schema } from "mongoose";

interface expiredToken extends Document {
  token: string;
  createdAt: Date;
}

const expiredTokenSchema: Schema<expiredToken> = new Schema({
    token : {
        type : String || null,
        required : [true,'Required Field']
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

const blackListModel = mongoose.model("Blacklist",expiredTokenSchema)

export default blackListModel;
