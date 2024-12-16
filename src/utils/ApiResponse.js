class ApiResponse {
  constructor(statuCode, data, message = "Success") {
    this.statuCode = statuCode;
    this.data = data;
    this.msg = msg;
    this.success = statuCode < 400;
  }
}

export { ApiResponse };
