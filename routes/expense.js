const express = require("express");
const router = express.Router();
const passport = require("passport");
const expense = require("../models/expense");


// store Expense of the user
router.post("/",passport.authenticate('jwt',{session:false}),async(req,res)=>{
    try{
        const {title}=req.body;
        const {cost}=req.body;
        const {month}=req.body;
        const {year}=req.body;
        if(!title)
            return res.status(400).json({msg: "Title is missing"});
        if(!cost)
            return res.status(400).json({msg: "Cost is missing"});
        if(!month)
            return res.status(400).json({msg: "Month is missing"});
        if(!year)
            return res.status(400).json({msg: "Year is missing"});
        const newExpense=new expense({
            title,month,year,cost,
            userId: req.user,
        });
        const saveExpense=await newExpense.save();
        res.json(saveExpense);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

// get Expense of the particular user
router.get("/getExpense",passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const expenses=await expense.find({userId: req.user, month:req.query.month , year:req.query.year});
    res.json(expenses);
});

module.exports = router;
