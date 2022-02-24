import { response } from 'express';
import * as userModel from '../../models/v1/user.model'


export const getById = async (_request, response) => {

    const {id} = _request.params;
    response.json({
        user : await userModel.getById({
           id : id
        })
    })
}

export const deleteById = async (request,response) => {
    const {id} = request.params;
    const resp = await userModel.deleteById({id: id})
    response.json({resp})
}