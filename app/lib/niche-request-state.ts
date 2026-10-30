import { NICHE_REQUEST_STATUS } from "../constants/niche-request";
import type { NicheNormalization } from "./niche-normalization";

const { IDLE, LOADING, READY, ERROR } = NICHE_REQUEST_STATUS;

export type NicheRequestState =
  | { status: typeof IDLE }
  | { status: typeof LOADING }
  | { status: typeof READY; input: string; data: NicheNormalization }
  | { status: typeof ERROR; message: string };
