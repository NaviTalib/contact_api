import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req,res)=>{
    const {name,email,password} = req.body;
    if(name == "" || email == "" || password == ""){
        return res.json({message : "Please fill all the fields"});
    }

    let user = await User.findOne({email});
    if(user){
        return res.json({message : "User already exists",success : false});
    }
    else{
        res.json({message : "User created successfully",success : true});
    }

    const hashPassword = await bcrypt.hash(password,10);

     user = await User.create({
        name,
        email,
        password:hashPassword
        });
    
    };

    export const login = async (req,res)=>{
        const {email,password} = req.body;
        if(email == "" || password == ""){
            return res.json({message : "Please fill all the fields"});
        }
    
        let user = await User.findOne({email});
        if(!user){
            return res.json({message : "User does not exists",success : false});
        }
    
        const isMatch = await bcrypt.compare(password,user.password);
    
        if(!isMatch){
            return res.json({message : "Invalid credentials",success : false});
        }
        const token = jwt.sign({id : user._id},process.env.JWT,{
            expiresIn : "1d"
        });
        res.json({message : "Login successfully",user:user.name,token,success : true});
    }