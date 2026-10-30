import isObjectLike from "lodash/isObjectLike.js";
import isString from "lodash/isString.js";

export function isPrimitiveString(value: unknown): value is string {
  return isString(value) && !isObjectLike(value);
}

export function isObjectLikeRecord(
  value: unknown,
): value is Record<string, unknown> {
  return isObjectLike(value);
}
