export default () => ({
    secret: process.env.JWT_SECRET,
    databaseUri: process.env.DATABASE_URI     
  });