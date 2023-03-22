import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  //no need to check bearer
  if (!token) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // const testUser = payload.userId === '63628d5d178e918562ef9ce8';
  console.log("payload",payload)
    
    req.user = { userId: payload.userId };  //fetch user info by getting id
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth; 