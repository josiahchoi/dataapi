module.exports = {
  type: 'mysql',
  host: process.env['TYPEORM_HOST'] || 'localhost',
  port: 3306,
  username: process.env['TYPEORM_USERNAME'] || 'dataapi',
  password: process.env['TYPEORM_PASSWORD'] || 'dataapi',
  database: 'dataapi',
  synchronize: false,
  entities: [__dirname + './dist/**/*.entity.js', __dirname + './dist/src/**/*.entity.js'],
  cli: {
    migrationsDir: "migration"
  }
};
