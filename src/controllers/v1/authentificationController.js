import jwt from 'jsonwebtoken';
import * as UserModel from '../../models/v1/user.model'

export const login = async (request,response) => {
    const { email, password } = request.body;
    const user = await UserModel.findByCredentials({email:email, password:password});
    const token = jwt.sign({ email: user.email }, 'SECRET');
    response.json({
      user: user,
      token
    });
}

export const register = async (request, response) => {
    const { email, password } = request.body;
    let updateAt = new Date();
    let createdAt = new Date();
    const user = await UserModel.createUser({email,password,createdAt,updateAt});
    console.log("User created : " + user)
    response
      .status(201)
      .json(user);
  }