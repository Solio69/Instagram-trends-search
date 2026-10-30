"use client";

import { useRef, useState } from "react";
import { HTTP_METHOD, JSON_REQUEST_HEADERS } from "../../constants/http";
import {
  NICHE_API_FIELD,
  NICHE_NORMALIZE_ENDPOINT,
  NICHE_REQUEST_STATUS,
  NORMALIZATION_FAILED_MESSAGE,
} from "../../constants/niche-request";
import { EMPTY_STRING } from "../../constants/text";
import type { NicheNormalization } from "../../lib/niche-normalization";
import type { NicheRequestState } from "../../lib/niche-request-state";
import {
  CONTENT_FILTER,
  normalizeResultLimit,
  RESULT_LIMITS,
  type ContentFilter,
  type PeriodDays,
} from "../../lib/results";
import { isObjectLikeRecord, isPrimitiveString } from "../../lib/type-guards";
import { SearchPanel } from "../search/SearchPanel";

const { IDLE, LOADING, READY, ERROR } = NICHE_REQUEST_STATUS;

export function TrendExplorer() {
  const [niche, setNiche] = useState(EMPTY_STRING);
  const [periodDays, setPeriodDays] = useState<PeriodDays>(3);
  const [contentFilter, setContentFilter] = useState<ContentFilter>(
    CONTENT_FILTER.ALL,
  );
  const [limitInput, setLimitInput] = useState(String(RESULT_LIMITS.MAX));
  const [request, setRequest] = useState<NicheRequestState>({ status: IDLE });
  const requestVersion = useRef(0);
  const limit = normalizeResultLimit(Number(limitInput || RESULT_LIMITS.MAX));

  function changeNiche(value: string) {
    requestVersion.current++;
    setNiche(value);
    setRequest({ status: IDLE });
  }

  async function normalize() {
    const submittedNiche = niche.trim();
    if (!submittedNiche || request.status === LOADING) return;
    const currentVersion = ++requestVersion.current;
    setRequest({ status: LOADING });

    try {
      const response = await fetch(NICHE_NORMALIZE_ENDPOINT, {
        method: HTTP_METHOD.POST,
        headers: JSON_REQUEST_HEADERS,
        body: JSON.stringify({ [NICHE_API_FIELD.NICHE]: submittedNiche }),
      });
      const payload: unknown = await response.json();
      if (currentVersion !== requestVersion.current) return;
      if (!response.ok) {
        const errorMessage =
          isObjectLikeRecord(payload) &&
          NICHE_API_FIELD.ERROR in payload
            ? payload[NICHE_API_FIELD.ERROR]
            : undefined;
        throw new Error(
          isPrimitiveString(errorMessage)
            ? errorMessage
            : NORMALIZATION_FAILED_MESSAGE,
        );
      }
      setRequest({
        status: READY,
        input: submittedNiche,
        data: payload as NicheNormalization,
      });
    } catch (cause) {
      if (currentVersion !== requestVersion.current) return;
      setRequest({
        status: ERROR,
        message:
          cause instanceof Error ? cause.message : NORMALIZATION_FAILED_MESSAGE,
      });
    }
  }

  return (
    <SearchPanel
      niche={niche}
      periodDays={periodDays}
      contentFilter={contentFilter}
      limitInput={limitInput}
      request={request}
      onNicheChange={changeNiche}
      onPeriodChange={setPeriodDays}
      onContentFilterChange={setContentFilter}
      onLimitChange={setLimitInput}
      onLimitCommit={() => setLimitInput(String(limit))}
      onSubmit={normalize}
    />
  );
}
