import { StatusCode } from '@enums/app.enum';

export type Any = any;

export interface IBaseResponse {
  statusCode: StatusCode;
  message?: string | string[];
}
