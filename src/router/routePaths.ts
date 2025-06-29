export const ROUTE_PATHS = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/home'
};

export const generatePath = (path, params) => {
    let generatedPath = path;
    Object.keys(params).forEach(key => {
        generatedPath = generatedPath.replace(`:${key}`, params[key]);
    });

    return generatedPath;
}