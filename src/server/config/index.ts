const isDevelopment = process.env.NODE_ENV !== 'production'

export const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
// export const corsOptions = {
//     origin: isDevelopment
//     ? process.env.CLIENT_ORIGIN_DEVELOPMENT
//     : process.env.CLIENT_ORIGIN_PRODUCTION,
//     optionsSuccessStatus: 200
// }

export const apiRoute = '/api'

export const baseUrl = isDevelopment 
    ? process.env.SERVER_BASEURL_DEVELOPMENT
    : process.env.SERVER_BASEURL_PRODUCTION