import { Router } from 'express';
import * as profileController from '../../../controllers/v1/profile.controller'
import * as postController from '../../../controllers/v1/posts.controller'
import * as userController from '../../../controllers/v1/user.controller'

const api = Router();

api.get('/:id/posts',postController.getByAuthorId)
api.get('/:id/profile',profileController.getById)
api.patch('/:id/profile',profileController.updateProfile);
api.delete('/:id',userController.deleteById)




export default api;