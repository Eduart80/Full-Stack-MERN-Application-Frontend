
export class NetworkError extends Error {
  constructor(message = "Network error occurred") {
    super(message);
    this.name = "NetworkError";
  }
}

export class DataError extends Error {
  constructor(message = "Data error occurred") {
    super(message);
    this.name = "DataError";
  }
}
