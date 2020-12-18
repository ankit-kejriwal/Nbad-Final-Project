const express = require("express");
const router = express.Router();
const passport = require("passport");
const budget = require("../models/budget");

router.post("/",passport.authenticate('jwt',{session:false}), async(req,res)=>{
    try{
        const {title}=req.body;
        const {cost}=req.body;
        if(!title)
            return res.status(400).json({msg: "Not all fields have been entered"});
        if(!cost)
            return res.status(400).json({msg: "Cost field have not been entered"});

        const saveBudget = await budget.findOneAndUpdate({userId: req.user._id, title:title},{cost:cost},{
            new: true,
            upsert: true
        });
        res.json(saveBudget);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
router.get("/all",passport.authenticate('jwt',{session:false}),async (req,res)=>{
    const budgets= await budget.find({userId: req.user._id},{title:1,cost:1});
    res.json(budgets);
});

module.exports = router;
