import Axios from "axios";
import { SENDINBLUE_KEY } from "../settings";

/**
 * This class connect with sendinblue
 */
class MailerClient {

  apiEndpoint: string = 'https://api.sendinblue.com/v3/smtp/email';

  apiKey: string = '';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
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
        })
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
        .catch( error => reject(error));
    })
  }
}

export default class Mailer {
  static send() {
    return new MailerClient(SENDINBLUE_KEY);
  }
}