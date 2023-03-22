import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";
  
const UserSchema=new mongoose.Schema({
    name:{type:String,required:[true,"Please provide name"] , minlength:3,maxlength:20, trim:true},
    
    email:{ type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
    password:{type:String,required:[true,"Please provide Password"] , minlength:5, select:false},

    mobileNumber:{type:Number,required:[true,"Please provide Mobile Number"] ,
                    // validate:{
                    //     validator:validator.isMobilePhone, 
                    //     message:"Please provide a valid Mobile Number"
                    // }
},
    userType:{type:String ,},
 
    location:{type:String, trim:true, maxlength:20, default:'My city'},

})  


// encrypt password using bcrypt
UserSchema.pre('save',async function(){
  if (!this.isModified('password')) return  //if we are not modifying pswd then dont do anything 
  //if we did we need to hash modified pswd  
    const salt=await bcrypt.genSalt(10)  //10 rounds of hash
    this.password=await bcrypt.hash(this.password,salt)
})

UserSchema.methods.createJWT= function(){  //createjwt custom function
   return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword=async function (userPassword){
   const isMatch=await bcrypt.compare(userPassword,this.password)
   return isMatch
}
export default mongoose.model('User',UserSchema) 