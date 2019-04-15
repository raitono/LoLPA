module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
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
