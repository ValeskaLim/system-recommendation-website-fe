// URL
const LOCAL = 'http://127.0.0.1:5000';
const VALIDATE_USER = 'api/auth/validate-user';
const SUBMIT_REGISTER = 'api/user/submit-register-data';
const GET_EXISTING_USER = 'api/user/get-existing-user';

// NAVIGATION CONSTANT
const ValidateUser = LOCAL + '/' + VALIDATE_USER;
const SubmitRegister = LOCAL + '/' + SUBMIT_REGISTER;
const GetExistingUser = LOCAL + '/' + GET_EXISTING_USER;

const CommonConstant = {
    ValidateUser,
    SubmitRegister,
    GetExistingUser
};

export default CommonConstant;
