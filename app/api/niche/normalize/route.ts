import {
  HTTP_STATUS,
  NO_STORE_RESPONSE_HEADERS,
} from "../../../constants/http";
import {
  NICHE_API_ERROR_MESSAGES,
  NICHE_API_FIELD,
  NORMALIZATION_FAILED_MESSAGE,
} from "../../../constants/niche-request";
import {
  NICHE_NORMALIZATION_ERROR_CODE,
  NicheNormalizationError,
  normalizeNiche,
  type NicheNormalizationErrorCode,
} from "../../../lib/niche-normalization";
import { isObjectLikeRecord } from "../../../lib/type-guards";

export const runtime = "nodejs";

const {
  INVALID_INPUT,
  INVALID_OUTPUT,
  NOT_CONFIGURED,
  PROVIDER_ERROR,
  RATE_LIMIT,
} = NICHE_NORMALIZATION_ERROR_CODE;
const {
  BAD_REQUEST,
  TOO_MANY_REQUESTS,
  INTERNAL_SERVER_ERROR,
  BAD_GATEWAY,
  SERVICE_UNAVAILABLE,
} = HTTP_STATUS;
const STATUS_BY_ERROR_CODE: Record<NicheNormalizationErrorCode, number> = {
  [INVALID_INPUT]: BAD_REQUEST,
  [INVALID_OUTPUT]: BAD_GATEWAY,
  [NOT_CONFIGURED]: SERVICE_UNAVAILABLE,
  [PROVIDER_ERROR]: BAD_GATEWAY,
  [RATE_LIMIT]: TOO_MANY_REQUESTS,
};
const { INVALID_JSON: INVALID_JSON_MESSAGE } = NICHE_API_ERROR_MESSAGES;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { [NICHE_API_FIELD.ERROR]: INVALID_JSON_MESSAGE },
      { status: BAD_REQUEST },
    );
  }

  try {
    const niche =
      isObjectLikeRecord(body) && NICHE_API_FIELD.NICHE in body
        ? body[NICHE_API_FIELD.NICHE]
        : undefined;
    const result = await normalizeNiche(niche, {
      apiKey: process.env.OPENROUTER_API_KEY,
    });
    return Response.json(result, { headers: NO_STORE_RESPONSE_HEADERS });
  } catch (error) {
    if (error instanceof NicheNormalizationError) {
      return Response.json(
        { [NICHE_API_FIELD.ERROR]: error.message },
        {
          status: STATUS_BY_ERROR_CODE[error.code],
          headers: NO_STORE_RESPONSE_HEADERS,
        },
      );
    }
    return Response.json(
      { [NICHE_API_FIELD.ERROR]: NORMALIZATION_FAILED_MESSAGE },
      { status: INTERNAL_SERVER_ERROR },
    );
  }
}
