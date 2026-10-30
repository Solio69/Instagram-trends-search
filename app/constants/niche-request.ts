export const NICHE_REQUEST_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  READY: "ready",
  ERROR: "error",
} as const;

export const NICHE_API_ERROR_MESSAGES = {
  INVALID_JSON: "Неверный формат запроса.",
  NORMALIZATION_FAILED: "Не удалось разобрать нишу. Попробуйте ещё раз.",
} as const;
export const NORMALIZATION_FAILED_MESSAGE =
  NICHE_API_ERROR_MESSAGES.NORMALIZATION_FAILED;
export const NICHE_API_FIELD = { NICHE: "niche", ERROR: "error" } as const;
export const NICHE_NORMALIZE_ENDPOINT = "/api/niche/normalize";
export const NICHE_MAX_LENGTH = 150;
