import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User} from '../models/user.model.js'

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {username , email , password} = req.body;
    const user = await User.findOne({email})
    if (user) {
        return res.json ({message : "user already existed"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password : hashedPassword,
    })

    await newUser.save()
    return res.json({status: true, message : "record registered"})
})

router.post('/login' , async (req, res) => {
    const {email , password} = req.body ;
    const user = await User.findOne({email})
    if (!user){
        return res.json({message : "user is not registered"}); 
    }

    const validPassword = await bcrypt.compare(password , user.password) ;
    if (!validPassword) {
        return res.json({message : "password is incorrect"}) ;
    }
    const token = jwt.sign({username: user.username} , process.env.KEY , {expiresIn: '1h'})
    res.cookie('token',token,{httpOnly : true , maxAge: 360000})
    return res.json({status:true , message : "login successfully"}) ;
})

export {router as UserRouter }