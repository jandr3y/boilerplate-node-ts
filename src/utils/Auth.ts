import crypto from "crypto";
import { JWT_SECRET } from "../settings";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class AuthUtils {
  static generateRandomCode() {
    return crypto.randomBytes(20).toString('hex');
  }

  static jwtEncode(payload: any) {
    return jwt.sign(payload, JWT_SECRET);
  }

  static jwtDecode(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch ( error ) {
      return false;
    }
  }

  static encryptPassword(password: string): Promise<string|any> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err: any, salt: string) => {
        if (err) reject(err);
  
        bcrypt.hash(password, salt, (err: any, hash: string) => {
            if (err) reject(err);
            resolve(hash);
        });
      });
    })
  }

  static passwordIsEqual(password: string, encrypted: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encrypted, function(err, isMatch) {
        if (err) resolve(false);
        
        if ( isMatch ) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    })
  }
}