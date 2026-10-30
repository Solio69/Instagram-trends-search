export const JSON_REQUEST_HEADERS = { "Content-Type": "application/json" };
export const NO_STORE_RESPONSE_HEADERS = { "Cache-Control": "no-store" };
export const HTTP_METHOD = { POST: "POST" } as const;
export const AUTHORIZATION_HEADER = "Authorization";
export const BEARER_TOKEN_PREFIX = "Bearer ";
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;
