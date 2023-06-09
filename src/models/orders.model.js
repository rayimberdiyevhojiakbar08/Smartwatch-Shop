import { model, Schema, mongoose } from "mongoose";
mongoose.set('strictQuery', false);

let orders = new Schema({
    name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true},
    country:{type:String, required:true},
    state:{type:String, required:true},
    city:{type:String, required:true},
    payment:{type:String, required:true},
    total:{type:String, required:true},
    products:{type:Array,required:true},
    deliver:{type:String, required:true},
    tel_number:{type:String, required:true},
    zip_code:{type:String, required:true},
    code:{type:String, required:true},
},
    {
        timestamps:true
    }
);

export default model("Oders", orders);