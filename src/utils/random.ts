import crypto from "crypto";

export const generateEmailCode = () => crypto.randomBytes(20).toString('hex');