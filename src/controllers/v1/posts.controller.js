import { prisma } from '@prisma/client';
import * as PostsModel from '../../models/v1/posts.model.js';
import {HttpException, HttpStatus } from '../../errors/errors'

export const getAll = async (_request, response) => {
    response.json({
      posts: await PostsModel.getAll()
    });
}

export const createPosts = async (_request,response) => {
    const postsData = _request.body;
    const post = await PostsModel.createPosts({
        message: postsData.message,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: _request.user.id
    });
    response.status(201).json(post);
}

export const getById = async(_request, response) => {
  const id = _request.params.id;
  response.json({
    post: await PostsModel.getById(Number(id))
  })

}

export const getByAuthorId = async(_request, response) => {
  const id = _request.params.id;
  
  response.json({
    post: await PostsModel.getByAuthorId(id)
  })

}

export const updatePosts = async (_request, response,next) => {
  const postsData = _request.body;
  const {id} = _request.params;
  const checkPost = await PostsModel.getById(Number(id));
  if(checkPost == null){
    next(new HttpException('Posts not found', HttpStatus.NOT_FOUND));
  }
  else if(checkPost.authorId == _request.user.id){
    const posts = await PostsModel.updateById({
      id: Number(id),
      message: postsData.message,
      updatedAt: new Date()
    })
    response.json({ posts });
  }else{
    next(new HttpException('You do not own this post', HttpStatus.UNAUTHORIZED));
  }
}

export const deleteById = async (_request, response,next) => {
  const {id} = _request.params;
  const checkPost = await PostsModel.getById(Number(id));
  if(checkPost == null){
    next(new HttpException('Posts not found', HttpStatus.NOT_FOUND));
  }
  else if(checkPost.authorId == _request.user.id){
    const result = await PostsModel.deleteById(Number(id))
    response.json({})
  }else{
    next(new HttpException('You do not own this post', HttpStatus.UNAUTHORIZED));
  }
}
