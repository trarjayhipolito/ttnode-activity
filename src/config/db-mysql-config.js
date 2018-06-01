exports.database = {
    user: process.env.ENV_DB_USER,
    password: process.env.ENV_DB_PASSWORD,
    server: process.env.ENV_DB_HOST,
    database: process.env.ENV_DB_NAME,
    port:process.env.ENV_DB_PORT,
    options: {
        encrypt: true
    }
};