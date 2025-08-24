// URL
const BASE = 'http://127.0.0.1:5002';
const VALIDATE_USER = 'api/auth/validate-user';
const SUBMIT_REGISTER = 'api/user/submit-register-data';
const GET_EXISTING_USER = 'api/user/get-existing-user';
const LOGOUT = 'api/auth/logout';
const GET_CURRENT_USER = 'api/user/get-current-user';
const GET_USER_BY_ID = 'api/user/get-user-by-id';
const ADD_COMPETITION = 'api/competition/add';
const GET_EXISTING_COMPETITION = 'api/competition/get-existing-competition';
const GET_ALL_COMPETITION = 'api/competition/get-all-competition';
const EDIT_USER = 'api/user/edit-user';
const TEAMMATES_LIST = 'api/user/get-all-teammates';
const REMOVE_USER = 'api/user/remove-user-teammates';
const REMOVE_COMPETITION = 'api/competition/remove-competition';
const GET_COMPETITION_BY_ID = 'api/competition/get-competition-by-id';
const EDIT_COMPETITION = 'api/competition/edit-competition';
const ADD_WISHLIST_COMPETITION = 'api/team/add-wishlist-competition';
const REMOVE_WISHLIST_COMPETITION = 'api/team/remove-wishlist-competition';
const RECOMMENDATION = 'api/recommend';
const GET_INVITEES_USER = 'api/user/get-invitees-user';
const REMOVE_USER_INVITATION = 'api/user/remove-user-invitation';
const GET_INVITES_USER = 'api/user/get-invites-user';
const ACCEPT_INVITES = 'api/user/accept-invites';
const REJECT_INVITES = 'api/user/reject-invites';
const CHECK_IS_HAVE_TEAM = 'api/user/check-is-have-team';
const CREATE_TEAM = 'api/team/create-team';
const CHECK_IS_LEADER = 'api/team/check-is-leader';

// NAVIGATION CONSTANT
const ValidateUser = BASE + '/' + VALIDATE_USER;
const SubmitRegister = BASE + '/' + SUBMIT_REGISTER;
const GetExistingUser = BASE + '/' + GET_EXISTING_USER;
const Logout = BASE + '/' + LOGOUT;
const GetCurrentUser = BASE + '/' + GET_CURRENT_USER;
const GetUserById = BASE + '/' + GET_USER_BY_ID;
const AddCompetition = BASE + '/' + ADD_COMPETITION;
const GetExistingCompetition = BASE + '/' + GET_EXISTING_COMPETITION;
const GetAllCompetition = BASE + '/' + GET_ALL_COMPETITION;
const EditUser = BASE + '/' + EDIT_USER;
const TeammatesList = BASE + '/' + TEAMMATES_LIST;
const RemoveUser = BASE + '/' + REMOVE_USER;
const RemoveCompetition = BASE + '/' + REMOVE_COMPETITION;
const GetCompetitionById = BASE + '/' + GET_COMPETITION_BY_ID;
const EditCompetition = BASE + '/' + EDIT_COMPETITION;
const AddWishlistCompetition = BASE + '/' + ADD_WISHLIST_COMPETITION;
const RemoveWishlistCompetition = BASE + '/' + REMOVE_WISHLIST_COMPETITION;
const Recommendation = BASE + '/' + RECOMMENDATION;
const GetInviteesUser = BASE + '/' + GET_INVITEES_USER;
const RemoveUserInvitation = BASE + '/' + REMOVE_USER_INVITATION;
const GetInvitesUser = BASE + '/' + GET_INVITES_USER;
const AcceptInvites = BASE + '/' + ACCEPT_INVITES;
const RejectInvites = BASE + '/' + REJECT_INVITES;
const CheckIsHaveTeam = BASE + '/' + CHECK_IS_HAVE_TEAM;
const CreateTeam = BASE + '/' + CREATE_TEAM;
const CheckIsLeader = BASE + '/' + CHECK_IS_LEADER;

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
    AddWishlistCompetition,
    RemoveWishlistCompetition,
    Recommendation,
    GetInviteesUser,
    RemoveUserInvitation,
    GetInvitesUser,
    AcceptInvites,
    RejectInvites,
    CheckIsHaveTeam,
    CreateTeam,
    GetUserById,
    CheckIsLeader
};

export default CommonConstant;
