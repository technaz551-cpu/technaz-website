import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = "905ba1daeedb7148742eb8e269714d92798b195d031f5f62bbe04c0a3c11bc37";

if (!JWT_SECRET) {
  throw new Error("Please add JWT_SECRET to .env.local");
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export const AUTH_COOKIE_NAME = "technaz_admin_token";

export async function signAuthToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyAuthToken(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err) {
    return null;
  }
}