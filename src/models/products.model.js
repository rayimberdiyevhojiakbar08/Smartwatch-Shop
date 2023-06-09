import { model, Schema, mongoose } from "mongoose";
mongoose.set('strictQuery', false);

let addproduct = new Schema({
    img:{type:String, required:true},
    title:{type:String, required:true},
    text:{type:String, required:true},
    color:{type:String, required:true},
    cost:{type:Number, required:true},
    buy_cost:{type:Number, required:true},
},
    {
        timestamps:true
    }
);

export default model("products", addproduct);