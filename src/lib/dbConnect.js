import mongoose from "mongoose";
import dns from "dns";

// Force Node to use Google's DNS servers for lookups (fixes
// "querySrv ECONNREFUSED" on Windows machines whose default/ISP DNS
// resolver doesn't properly resolve MongoDB Atlas SRV records).
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const MONGODB_URI = "mongodb+srv://technaz-website-personal:pM0VmIELyUvk6Zqb@technaz-website-cluster.0p0ik0z.mongodb.net/modified-content";

if (!MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

let cached = global._mongooseConn;

if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default dbConnect;