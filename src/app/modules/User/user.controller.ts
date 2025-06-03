import catchAsync from '../../utiils/catchAsync';
import sendResponse from '../../utiils/sendResponse';
import { UserService } from './user.service';

const signup = catchAsync(async (req, res) => {
  const result = await UserService.createUserIntoDB(req.body);

  return sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  signup,
};
