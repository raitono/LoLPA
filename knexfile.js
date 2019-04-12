module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: process.env.DB_USER || 'SVCLOLPAWEB',
      password: process.env.DB_PASS || '9_wEb!:/r\'`N4#F@]A7v',
      database: 'riot'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './out/migrations',
      tableName: 'knex_migrations'
    }
  }
};
