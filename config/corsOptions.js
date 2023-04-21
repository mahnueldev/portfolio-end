const corsOptions = {
    // origin: ['http://127.0.0.1:8080', 'https://admin360.mahnuel.com:8080', 'https://admin360.mahnuel.com', 'https://admin360.mahnuel.com:8080/api/auth','https://admin360.mahnuel.com:8080/api/devprojects', 'https://admin360.mahnuel.com:8080/api/desprojects'],

    origin: ['http://127.0.0.1:8080', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:3003/login', 'http://localhost:8080', 'http://localhost:8080/api/auth', 'http://localhost:8080/api/devprojects', 'http://localhost:8080/api/desprojects'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}

module.exports = corsOptions;
