import Redis from "ioredis";

let redis = null;

if (process.env.ENABLE_REDIS === "true") {
  redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

  redis.on("connect", () => {
    console.log("Redis connected successfully");
  });

  redis.on("error", (err) => {
    console.error("Redis connection error:", err);
  });
} else {
  console.log("⚠ Redis disabled for development");
}

export default redis;
