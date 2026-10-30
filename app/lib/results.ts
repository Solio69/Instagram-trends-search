import isFinite from "lodash/isFinite.js";
import { NICHE_MAX_LENGTH } from "../constants/niche-request.ts";
export { NICHE_MAX_LENGTH } from "../constants/niche-request.ts";

export const SORT_METRIC = {
  LIKES: "likeCount",
  COMMENTS: "commentCount",
  SHARES: "shareCount",
  DATE: "publishedAt",
} as const;
export type SortMetric = (typeof SORT_METRIC)[keyof typeof SORT_METRIC];
export type PeriodDays = 1 | 3 | 7;
export const POST_CONTENT_TYPE = {
  REEL: "reel",
  IMAGE: "image",
  CAROUSEL: "carousel",
} as const;
export const CONTENT_FILTER = {
  ALL: "all",
  REEL: POST_CONTENT_TYPE.REEL,
  POST: "post",
} as const;
export type ContentFilter =
  (typeof CONTENT_FILTER)[keyof typeof CONTENT_FILTER];
const CONTENT_TYPES_BY_FILTER: Record<ContentFilter, readonly string[] | null> =
  {
    [CONTENT_FILTER.ALL]: null,
    [CONTENT_FILTER.REEL]: [POST_CONTENT_TYPE.REEL],
    [CONTENT_FILTER.POST]: [
      POST_CONTENT_TYPE.IMAGE,
      POST_CONTENT_TYPE.CAROUSEL,
    ],
  };

export type SortablePost = {
  publishedAt: string;
  contentType: string;
  matchedTerms: readonly string[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
};

export type ResultsOptions = {
  periodDays: PeriodDays;
  limit: number;
  sortBy: SortMetric;
  keywords?: readonly string[];
  contentFilter?: ContentFilter;
};

export const RESULT_LIMITS = { MIN: 1, MAX: 50 } as const;
const { MIN: MIN_RESULT_LIMIT, MAX: MAX_RESULT_LIMIT } = RESULT_LIMITS;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function limitNicheInput(value: string): string {
  return value.slice(0, NICHE_MAX_LENGTH);
}

export function normalizeResultLimit(value: number): number {
  if (!isFinite(value)) return MAX_RESULT_LIMIT;
  return Math.min(
    MAX_RESULT_LIMIT,
    Math.max(MIN_RESULT_LIMIT, Math.trunc(value)),
  );
}

export function getVisiblePosts<T extends SortablePost>(
  posts: readonly T[],
  options: ResultsOptions,
  referenceTime: string,
): T[] {
  const {
    periodDays,
    keywords: selectedKeywords,
    contentFilter,
    sortBy,
    limit,
  } = options;
  const upperBound = Date.parse(referenceTime);
  const lowerBound = upperBound - periodDays * MILLISECONDS_PER_DAY;
  const keywords = new Set(
    selectedKeywords
      ?.map((term) => term.toLocaleLowerCase().trim())
      .filter(Boolean) ?? [],
  );

  return posts
    .filter((post) => {
      const publishedAt = Date.parse(post.publishedAt);
      const matchesPeriod =
        publishedAt >= lowerBound && publishedAt <= upperBound;
      const matchesKeyword =
        keywords.size === 0 ||
        post.matchedTerms.some((term) =>
          keywords.has(term.toLocaleLowerCase()),
        );
      const allowedContentTypes = contentFilter
        ? CONTENT_TYPES_BY_FILTER[contentFilter]
        : null;
      const matchesFormat =
        !allowedContentTypes || allowedContentTypes.includes(post.contentType);
      return matchesPeriod && matchesKeyword && matchesFormat;
    })
    .sort((first, second) => {
      const byDate =
        Date.parse(second.publishedAt) - Date.parse(first.publishedAt);
      return sortBy === SORT_METRIC.DATE
        ? byDate
        : second[sortBy] - first[sortBy] || byDate;
    })
    .slice(0, normalizeResultLimit(limit));
}
