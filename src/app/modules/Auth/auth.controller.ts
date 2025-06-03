import catchAsync from '../../utiils/catchAsync';

const login = catchAsync(async (req, res) => {

    const { email, password } = req.body;

    

});

export const AuthController = {
  login,
};
