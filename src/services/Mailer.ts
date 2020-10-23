import Axios from "axios";
import winston from "winston";
import { GLOBAL_PATHS, SENDINBLUE_KEY } from "../settings";
import Logger from "../utils/Logger";

/**
 * This class connect with sendinblue
 */
class MailerClient {

  apiEndpoint: string = 'https://api.sendinblue.com/v3/smtp/email';

  apiKey: string = '';

  logger: any;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          level: 'info',
          filename: GLOBAL_PATHS.LOGS + '/mail.log',
          handleExceptions: true,
          maxsize: 5242880,
          maxFiles: 5
        })
      ]
    })
  }

  /**
   * Send transactional email with activation code
   * 
   * params in model
   *  - confirmCode
   * 
   * @param name 
   * @param email 
   * @param code 
   */
  activate(name: string, email: string, code: string) {
    return new Promise( async (resolve, reject) => {
      try {
        await this.call({
          params: {
            confirmCode: code,
          },
          templateId: 1,
          to: [ { name, email } ]
        });

        this.logger.info('[' + new Date().toString().slice(4,24) + '] Activate account to: ' + email);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Call sendin blue API
   * @param data 
   */
  call(data: any) {
    const headers = {
      'api-key': this.apiKey
    }

    return new Promise((resolve, reject) => {
      Axios.post(this.apiEndpoint, data, { headers })
        .then( result => resolve(result))
        .catch( error => {
          reject(error)
        });
    })
  }
}

export default class Mailer {
  static send() {
    return new MailerClient(SENDINBLUE_KEY);
  }
}