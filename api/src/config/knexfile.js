module.exports = {
    development: {
        client: 'mysql2',
        useNullAsDefault: true,
        // debug: true,
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        }
    },
    production: {
        
    }
}