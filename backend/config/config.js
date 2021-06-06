module.exports = { 
  development: {
    username: "root",
    password: "root",
    database: "instafee_developement",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: true
    },
    timezone: '+01:00'
  },
}
