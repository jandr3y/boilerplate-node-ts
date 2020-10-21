export default class MongoError extends Error {

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "Error"; // (different names for different built-in error classes)
  }
}