import jwt from 'jsonwebtoken';
import * as userModel from '../models/v1/user.model'
import {HttpException, HttpStatus } from '../errors/errors'

const jwtMiddleware = async(request, response, next) => {
  const { authorization: token } = request.headers;
  
  try {
    const {id} = jwt.verify(token, 'SECRET');
    const user = await userModel.getById({id});
    if(!user){
      next(new HttpException('Invalid token', HttpStatus.UNAUTHORIZED));
    }
    request.user = user;
    next();
  } catch (error) {
    next(new HttpException('Invalid token', HttpStatus.UNAUTHORIZED));
  }
}

export default jwtMiddleware;
