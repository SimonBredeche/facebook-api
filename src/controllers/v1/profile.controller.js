import * as ProfileModel from '../../models/v1/profile.model';
import {HttpException, HttpStatus } from '../../errors/errors'

export const updateProfile = async (_request,response,next) => {
    const profileData = _request.body;
    const {id} = _request.params;
    const checkProfile = await ProfileModel.getById(id);
    if(checkProfile == null){
      next(new HttpException('Profile not found', HttpStatus.NOT_FOUND));
    }else if(checkProfile.userId == _request.user.id){
        const profile = await ProfileModel.updateProfile({
          firstName: profileData.firstName ,
          lastName: profileData.lastName,
          userId: id
      });
      response.status(201).json(profile);
    }else{
      next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
    }

}

export const getById = async(_request, response) => {
  const id = _request.params.id;
  
  response.json({
    profile: await ProfileModel.getById(id)
  })

}




