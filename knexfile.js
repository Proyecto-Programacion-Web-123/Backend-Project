module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3307, // Puerto expuesto en docker-compose
      user: 'root',
      password: '7465726D696E61', // Contraseña en docker-compose
      database: 'term'
    },
    pool: {
      min: 2,
      max: 10,
      idleTimeoutMillis: 60000,      // 60s inactividad
      createTimeoutMillis: 30000,    // 30s para crear nueva conexión
      acquireTimeoutMillis: 30000    // 30s para adquirir una conexión
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  test: {
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    useNullAsDefault: true,
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds' }
  }
};
