import "dotenv/config";

export const config = {
  port: Number(process.env.PORT ?? 4000),
  // The web app's origin, allowed to call this API from the browser
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV ?? "development",
};
