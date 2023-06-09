import { model, Schema, mongoose } from "mongoose";
mongoose.set('strictQuery', false);

let admin = new Schema({
    name:{type:String, required:true},
},
    {
        timestamps:true
    }
);

export default model("admin", admin);