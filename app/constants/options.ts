import {
  CONTENT_FILTER,
  POST_CONTENT_TYPE,
  SORT_METRIC,
  type ContentFilter,
  type PeriodDays,
  type SortMetric,
} from "../lib/results";

export const REELS_LABEL = "Reels";

export const PERIOD_OPTIONS: ReadonlyArray<{
  value: PeriodDays;
  label: string;
}> = [
  { value: 1, label: "Сутки" },
  { value: 3, label: "3 дня" },
  { value: 7, label: "Неделя" },
];

export const FORMAT_OPTIONS: ReadonlyArray<{
  value: ContentFilter;
  label: string;
}> = [
  { value: CONTENT_FILTER.ALL, label: "Все" },
  { value: CONTENT_FILTER.REEL, label: REELS_LABEL },
  { value: CONTENT_FILTER.POST, label: "Посты" },
];

export const METRIC_LABELS = {
  likeCount: "Лайки",
  commentCount: "Комментарии",
  shareCount: "Поделились",
} as const;

export const NUMERIC_METRICS = [
  SORT_METRIC.LIKES,
  SORT_METRIC.COMMENTS,
  SORT_METRIC.SHARES,
] as const;

export const SORT_LABELS: Record<SortMetric, string> = {
  likeCount: "лайкам",
  commentCount: "комментариям",
  shareCount: "числу поделившихся",
  publishedAt: "дате",
};

export const POST_FORMAT_LABELS: Record<string, string> = {
  [POST_CONTENT_TYPE.REEL]: REELS_LABEL,
  [POST_CONTENT_TYPE.CAROUSEL]: "Карусель",
  [POST_CONTENT_TYPE.IMAGE]: "Пост",
};

export const PERIOD_DESCRIPTIONS: Record<PeriodDays, string> = {
  1: "за сутки",
  3: "за 3 дня",
  7: "за неделю",
};
