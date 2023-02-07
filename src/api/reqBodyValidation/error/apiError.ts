export default class ApiError {
  message: string;
  code: number;
  constructor(code: number, message: string) {
    this.message = message;
    this.code = code;
  }

  static badRequest(msg: string) {
    return new ApiError(400, msg);
  }
}
