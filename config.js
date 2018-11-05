module.exports = {
  ENV: process.env.NODE__ENV || "development",
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || "http:localhost:3000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://abcd1234:abcd1234@ds151523.mlab.com:51523/customer_api"
};
