export const ROUTE_PATHS = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/home',
    COMPETITION: '/competitions',
    ADD_COMPETITION: '/competitions/add',
    EDIT_COMPETITION: '/competitions/edit',
    PROFILE: '/profile',
    TEAMMATES_LIST: '/teammates',
    RECOMMENDATION: '/recommendation',
    VERIFY_EMAIL: '/verify-email/:token',
    VERIFY_PASSWORD : '/verify-password',
    RESET_PASSWORD: '/reset-password',
    RESET_PASSWORD_FINAL: '/reset-password-final/:token',
};

export const generatePath = (path, params) => {
    let generatedPath = path;
    Object.keys(params).forEach(key => {
        generatedPath = generatedPath.replace(`:${key}`, params[key]);
    });

    return generatedPath;
}