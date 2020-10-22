import crypto from "crypto";

export default class AuthUtils {
  static generateRandomCode() {
    return crypto.randomBytes(20).toString('hex');
  }
}