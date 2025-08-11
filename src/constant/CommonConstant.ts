// URL
const BASE = 'http://127.0.0.1:5000';
const VALIDATE_USER = 'api/auth/validate-user';
const SUBMIT_REGISTER = 'api/user/submit-register-data';
const GET_EXISTING_USER = 'api/user/get-existing-user';
const LOGOUT = 'api/auth/logout';
const GET_CURRENT_USER = 'api/user/get-current-user';
const ADD_COMPETITION = 'api/competition/add';
const GET_EXISTING_COMPETITION = 'api/competition/get-existing-competition';
const GET_ALL_COMPETITION = 'api/competition/get-all-competition';
const EDIT_USER = 'api/user/edit-user';
const TEAMMATES_LIST = 'api/user/get-all-teammates';
const REMOVE_USER = 'api/user/remove-user-teammates';
const REMOVE_COMPETITION = 'api/competition/remove-competition';
const GET_COMPETITION_BY_ID = 'api/competition/get-competition-by-id';
const EDIT_COMPETITION = 'api/competition/edit-competition';
const RECOMMENDATION = 'api/recommend';
const GET_INVITED_USER = 'api/user/get-invited-user';
const REMOVE_USER_INVITATION = 'api/user/remove-user-invitation';

// NAVIGATION CONSTANT
const ValidateUser = BASE + '/' + VALIDATE_USER;
const SubmitRegister = BASE + '/' + SUBMIT_REGISTER;
const GetExistingUser = BASE + '/' + GET_EXISTING_USER;
const Logout = BASE + '/' + LOGOUT;
const GetCurrentUser = BASE + '/' + GET_CURRENT_USER;
const AddCompetition = BASE + '/' + ADD_COMPETITION;
const GetExistingCompetition = BASE + '/' + GET_EXISTING_COMPETITION;
const GetAllCompetition = BASE + '/' + GET_ALL_COMPETITION;
const EditUser = BASE + '/' + EDIT_USER;
const TeammatesList = BASE + '/' + TEAMMATES_LIST;
const RemoveUser = BASE + '/' + REMOVE_USER;
const RemoveCompetition = BASE + '/' + REMOVE_COMPETITION;
const GetCompetitionById = BASE + '/' + GET_COMPETITION_BY_ID;
const EditCompetition = BASE + '/' + EDIT_COMPETITION;
const Recommendation = BASE + '/' + RECOMMENDATION;
const GetInvitedUser = BASE + '/' + GET_INVITED_USER;
const RemoveUserInvitation = BASE + '/' + REMOVE_USER_INVITATION;

const CommonConstant = {
    ValidateUser,
    SubmitRegister,
    GetExistingUser,
    Logout,
    GetCurrentUser,
    AddCompetition,
    GetExistingCompetition,
    GetAllCompetition,
    EditUser,
    TeammatesList,
    RemoveUser,
    RemoveCompetition,
    GetCompetitionById,
    EditCompetition,
    Recommendation,
    GetInvitedUser,
    RemoveUserInvitation
};

export default CommonConstant;
