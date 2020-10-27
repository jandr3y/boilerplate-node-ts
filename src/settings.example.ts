import path from "path";

/**
 * Remove example from filename and fill constants
 */
export const DEV_MODE = 1;
export const MONGO_DNS = '';
export const SENDINBLUE_KEY = '';
export const JWT_SECRET = '';

export const GLOBAL_PATHS = {
  LOGS: path.join(__dirname, '/logs'),
  ROUTES: path.join(__dirname, '/routes'),
  UTILS: path.join(__dirname, '/utils'),
  MODELS: path.join(__dirname, '/models'),
}