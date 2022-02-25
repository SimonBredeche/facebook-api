import jwt from 'jsonwebtoken';
import * as UserModel from '../../models/v1/user.model'
import * as ProfilModel from '../../models/v1/profile.model'
import {HttpException, HttpStatus } from '../../errors/errors'

export const login = async (request,response) => {
    let token = "";
    const { email, password } = request.body;
    const user = await UserModel.findByCredentials({email:email, password:password});
    try{
      if(user != null){
        token = jwt.sign({ email: user.email }, 'SECRET');
        response.json({
          user: user,
          token
        });
      }else{
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
      }
    }catch(err){
      response.status(err.statusCode).json({"error" : err.message})
    }

}

export const register = async (request, response) => {
    const { email, password } = request.body;
    let updateAt = new Date();
    let createdAt = new Date();
    const user = await UserModel.createUser({email,password,createdAt,updateAt});
    const profile = await ProfilModel.upsertProfile({
      firstName: "",
      lastName: "",
      userId: user.id
    })
    response
      .status(201)
      .json(user);
  }