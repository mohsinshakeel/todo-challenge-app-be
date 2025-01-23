export enum Status {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
}

export interface ITask {
  id: string;
  title: string;
  status: Status;
  color: string;
}

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}
