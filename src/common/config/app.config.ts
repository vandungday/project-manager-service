export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongo_uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
    secretRefresh: process.env.JWT_SECRET_REFRESH_KEY,
    expiresInRefresh: process.env.JWT_REFRESH_EXPIRES_IN,
  },
});
