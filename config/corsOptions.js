const corsOptions = {
    origin: ['http://localhost:3004', 'http://localhost:3003', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://localhost:8080/api/devprojects/', 'http://localhost:8080/api/auth/'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}

module.exports = corsOptions;
