export type SortMetric = "likeCount" | "commentCount" | "shareCount" | "publishedAt";
export type PeriodDays = 1 | 3 | 7;
export type ContentFilter = "all" | "reel" | "post";

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

export const NICHE_MAX_LENGTH = 150;

export function limitNicheInput(value: string): string {
  return value.slice(0, NICHE_MAX_LENGTH);
}

export function normalizeResultLimit(value: number): number {
  if (!Number.isFinite(value)) return 50;
  return Math.min(50, Math.max(1, Math.trunc(value)));
}

export function getVisiblePosts<T extends SortablePost>(
  posts: readonly T[],
  options: ResultsOptions,
  referenceTime: string,
): T[] {
  const upperBound = Date.parse(referenceTime);
  const lowerBound = upperBound - options.periodDays * 24 * 60 * 60 * 1000;
  const keywords = new Set(options.keywords?.map((term) => term.toLocaleLowerCase().trim()).filter(Boolean) ?? []);

  return posts
    .filter((post) => {
      const publishedAt = Date.parse(post.publishedAt);
      const matchesPeriod = publishedAt >= lowerBound && publishedAt <= upperBound;
      const matchesKeyword = keywords.size === 0 || post.matchedTerms.some((term) => keywords.has(term.toLocaleLowerCase()));
      const matchesFormat = options.contentFilter === "reel"
        ? post.contentType === "reel"
        : options.contentFilter === "post"
          ? post.contentType === "image" || post.contentType === "carousel"
          : true;
      return matchesPeriod && matchesKeyword && matchesFormat;
    })
    .sort((first, second) => {
      const byDate = Date.parse(second.publishedAt) - Date.parse(first.publishedAt);
      return options.sortBy === "publishedAt"
        ? byDate
        : second[options.sortBy] - first[options.sortBy] || byDate;
    })
    .slice(0, normalizeResultLimit(options.limit));
}
