export const ROUTE_PATHS = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/home',
    COMPETITION: '/competitions',
    ADD_COMPETITION: '/competitions/add',
    PROFILE: '/profile',
    TEAMMATES_LIST: '/teammates'
};

export const generatePath = (path, params) => {
    let generatedPath = path;
    Object.keys(params).forEach(key => {
        generatedPath = generatedPath.replace(`:${key}`, params[key]);
    });

    return generatedPath;
}