import catchAsync from '../../utiils/catchAsync';
import sendResponse from '../../utiils/sendResponse';
import { AuthService } from './auth.service';

const login = catchAsync(async (req, res) => {
  const { username, password, remember_me } = req.body;

  const result = await AuthService.loginUserFromDB({
    username,
    password,
    remember_me,
  });

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const me = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'Unauthorized',
    });
  }

  const user = await AuthService.findUserFromDB(token);

  if (!user) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'User not found',
    });
  }

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: user,
  });
});

const verify = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'Unauthorized',
    });
  }

  const user = await AuthService.verifyFromDB(token);

  if (!user) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'User not found',
    });
  }

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User verified successfully',
    data: user,
  });
});

export const AuthController = {
  login,
  me,
  verify,
};
