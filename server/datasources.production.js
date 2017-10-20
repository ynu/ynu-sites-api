module.exports = {
  sites: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_DATABASE || 'sites',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  }
};