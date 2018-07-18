module.exports = {
  port: process.env.PORT || 8083,
  db: {
    database: process.env.DB_NAME || 'chase',
    user: process.env.DB_USER || 'chase',
    password: process.env.DB_PASS || 'chase',
    options: {
      dialect: 'mysql',
      operatorsAliases: 'false',
      host: '127.0.0.1',
      port: '3306',
      storage: './chase.mysql'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
