const express = require("express");
const {UserModel} = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();





userRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
           if(err){res.send(err)}
           else{ const user = new UserModel({name,email,password:hash});
            await user.save();
            res.send("registerd successfully")}
        });
       
    }
    catch(err){
        res.send(err.message)
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
     
         const user =await UserModel.find({email})
                    if(user.length>0){
                        bcrypt.compare(password, user[0].password, async(err, result)=> {
                              
                            if(err){res.send(err)}
                            else{
                            const token = jwt.sign({ "user":user[0]._id }, 'masai');
                            res.send({"msg":"logged in successfully","token":token})
                        }
                    }) } 
                        else{
                            res.send("something went wrong")
                        }
                    }
    catch(err){
        res.send(err.message)
    }
})

module.exports={userRouter}