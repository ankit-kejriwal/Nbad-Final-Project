const mongoose=require("mongoose");

const budgetSchema= new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    cost:{type:Number,required:true},
    userId:{type:String,required:true}
});
budgetSchema.index( {title:1, userId:1}, { unique: true } )
module.exports= Budget = mongoose.model("budget",budgetSchema);