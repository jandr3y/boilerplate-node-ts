export default class MongoError extends Error {

  code: string = '';

  constructor(error: any) {
    super(error);
    if ( error.code ) {
      this.code = error.code;
      switch ( error.code ) {
        case 11000:
          this.message = "Campo duplicado"
        break;
      }
    }

    this.name = "Error"; 
  }
}