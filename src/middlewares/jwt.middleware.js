import jwt from 'jsonwebtoken';

const jwtMiddleware = (request, response, next) => {
  const { authorization: token } = request.headers;
  
  try {
    const payload = jwt.verify(token, 'SECRET');
    request.user = payload;

    next();
  } catch (error) {
    response.status(401).json({
      error: {
        code: 'E010',
        message: 'Unauthorized',
      },
    });
  }
}

export default jwtMiddleware;
