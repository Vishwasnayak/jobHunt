import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
import {BadRequestError, UnAuthenticatedError} from "../errors/index.js"
import attachCookie from '../utils/attachCookies.js';
  
const register=async (req,res) =>{
   const {name,email,password,mobileNumber} =req.body;
   if (!name || !email || !password || !mobileNumber) {
    throw new BadRequestError('please provide all values');
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  const user = await User.create({ name, email, password, mobileNumber });
  const token=user.createJWT()
  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      mobileNumber: user.mobileNumber,
      location: user.location,
      userType:user.userType,
      name: user.name,
    },

    location: user.location,
  });
}

const login= async (req,res) =>{
    const {email,password}=req.body;
    if(!password || !email){
      throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ email }).select('+password'); //since password select is false in model
    if(!user){
      throw new UnAuthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect=await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError('Invalid Credentials');
    }
    const token = user.createJWT();
    attachCookie({ res, token });

    user.password = undefined; //to hide password since we are not sending password
    res.status(StatusCodes.OK).json({user,location:user.location})
}

const updateUser = async (req, res) => {
  const { email, name, location, mobileNumber } = req.body;
  if (!email || !name  || !location || !mobileNumber) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });
  
  user.email = email;
  user.name = name;
  user.location = location;
  user.mobileNumber=mobileNumber;

  await user.save(); 

  const token = user.createJWT();
  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ user, location: user.location });
};


export {register,login,updateUser}