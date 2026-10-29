const sendEmail=require( "../utils/sendEmail.js");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const User=require("../models/User.js");


const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"25d"
    })
}



const registerUser=async(req,res)=>{
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
       

        if(user){
            const otp=Math.floor(100000 + Math.random() * 900000);
            const message=`Your OTP for Shopnet registration is ${otp}. Please do not share it with anyone.`;
          await sendEmail(email, 'Shopnet Registration OTP', message);
         res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token:generateToken(user._id),
            
        });
        }
        else{
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//login user
const loginUser=async(req,res)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUsers=async (req,res)=>{
    try{
        const users=await User.find({}).select("-password");
        res.json(users);
    }
    catch(error){
        res.status(400).json({ message: error.message }); 
    }
}

module.exports={
    registerUser,
    loginUser,
    getUsers, 
};