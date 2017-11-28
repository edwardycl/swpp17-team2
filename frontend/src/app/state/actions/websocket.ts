import { Action } from '@ngrx/store';

import {
  Request as WebSocketRequest,
  Response as WebSocketResponse,
  Event as WebSocketEvent,
  SuccessResponse,
  RequestWithNonce,
  ResponseWithNonce
} from '../../websocket';

export const CONNECT = 'WebSocket: Connect';
export const CONNECTED = 'WebSocket: Connected';
export const DISCONNECT = 'WebSocket: Disconnect';
export const DISCONNECTED = 'WebSocket: Disconnected';
export const WS_ERROR = 'WebSocket: WebSocket error';
export const REQUEST = 'WebSocket: Request';
export const RESPONSE = 'WebSocket: Response';
export const EVENT = 'WebSocket: Event';

export class Connect implements Action {
  readonly type = CONNECT;

  constructor(public force: boolean = false) {}
}

export class Connected implements Action {
  readonly type = CONNECTED;
}

export class Disconnect implements Action {
  readonly type = DISCONNECT;
}

export class Disconnected implements Action {
  readonly type = DISCONNECTED;
}

export class WebSocketError implements Action {
  readonly type = WS_ERROR;

  constructor(public error: any) {}
}

export class Request implements Action {
  readonly type = REQUEST;
  readonly payload: RequestWithNonce;

  constructor(request: WebSocketRequest) {
    this.payload = new RequestWithNonce(request);
  }
}

export class Response implements Action {
  readonly type = RESPONSE;
  readonly nonce: string;
  readonly response: WebSocketResponse;

  constructor(payload: ResponseWithNonce) {
    this.nonce = payload.nonce;
    if (payload.success === true) {
      this.response = {
        success: true,
        result: payload.result,
      };
    } else {
      this.response = {
        success: false,
        error: payload.error,
      };
    }
  }

  downcast<T>(): SuccessResponse<T> | string {
    if (this.response.success === true) {
      return this.response as SuccessResponse<T>;
    } else {
      return this.response.error.reason;
    }
  }
}

export class Event implements Action {
  readonly type = EVENT;

  constructor(public payload: WebSocketEvent) {}
}

export type Actions
  = Connect
  | Connected
  | Disconnect
  | Disconnected
  | WebSocketError
  | Request
  | Response
  | Event
;