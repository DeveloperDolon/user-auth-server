import catchAsync from '../../utiils/catchAsync';
import sendResponse from '../../utiils/sendResponse';
import { AuthService } from './auth.service';

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const result = await AuthService.loginUserFromDB({ username, password });

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = {
  login,
};
