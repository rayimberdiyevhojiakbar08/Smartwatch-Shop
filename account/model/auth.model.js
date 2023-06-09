import { model, Schema, mongoose } from "mongoose";
mongoose.set('strictQuery', false);

let auth = new Schema({
    name:{type:String, required:true},
    sure:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
},
    {
        timestamps:true
    }
);

export default model("auth", auth);