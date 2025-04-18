const express=require('express')
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET='Bennyi$ag00dguy'

const router=express.Router();


router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('phoneNumber', 'Invalid phone number').optional().isMobilePhone()
  ], async (req, res) => {
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
    try {
      const { name, email, password, phoneNumber } = req.body;
  
      let existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: "User with this email already exists" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber
      });
  
      const payload = { user: { id: user.id } };
      const authToken = jwt.sign(payload, JWT_SECRET);
  
      res.json({ authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  });  


//route-2: login a user /api/auth/login
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
],async (req,res)=>{
    //if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body
    try{ 
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        console.log(authtoken);
        res.json({authtoken})
        
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})  


// route-3 Get loggedin user details using: POST '/api/auth/getuser'
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})



module.exports=router