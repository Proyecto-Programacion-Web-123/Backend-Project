module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            port:3307,
            user: 'root',
            password: '7465726D696E61 ',
            database: 'db_test'
        },
        migrations: {
            directory: './migrations'
        }
    },

    test: {
        client: 'sqlite3',
        connection: { filename: ':memory:' },
        useNullAsDefault: true,
        migrations: { directory: './migrations' },

    }
};
