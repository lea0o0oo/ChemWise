import "dotenv/config";

export default {
  server: {
    port: 3000,
    cors: {
      origin: "*",
    },
    host:
      process.env.DEV == "true"
        ? "http://localhost:3000"
        : "https://campfirehub-backend.vercel.app",
  },
  database: {
    connection_string: process.env.MONGO_CONNECTION_STR,
  },
  cdn: {
    imgdb_key: process.env.IMGDB_KEY,
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
    expiresIn: "2h",
  },
  projects: {
    comments: {
      maxLength: 250,
    },
  },
};
