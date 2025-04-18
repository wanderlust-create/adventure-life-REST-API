export default class ApiError {
  message: string | object;
  code: number;

  constructor(code: number, message: string | object) {
    this.message = message;
    this.code = code;
  }

  static badRequest(msg: string | object) {
    return new ApiError(400, msg);
  }
}
