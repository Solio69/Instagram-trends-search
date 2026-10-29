import type { ContentFilter, PeriodDays, SortMetric } from "../lib/results";

export const PERIOD_OPTIONS: ReadonlyArray<{ value: PeriodDays; label: string }> = [
  { value: 1, label: "Сутки" },
  { value: 3, label: "3 дня" },
  { value: 7, label: "Неделя" },
];

export const FORMAT_OPTIONS: ReadonlyArray<{ value: ContentFilter; label: string }> = [
  { value: "all", label: "Все" },
  { value: "reel", label: "Reels" },
  { value: "post", label: "Посты" },
];

export const METRIC_LABELS = {
  likeCount: "Лайки",
  commentCount: "Комментарии",
  shareCount: "Поделились",
} as const;

export const NUMERIC_METRICS = ["likeCount", "commentCount", "shareCount"] as const;

export const SORT_LABELS: Record<SortMetric, string> = {
  likeCount: "лайкам",
  commentCount: "комментариям",
  shareCount: "числу поделившихся",
  publishedAt: "дате",
};

export const POST_FORMAT_LABELS: Record<string, string> = {
  reel: "Reels",
  carousel: "Карусель",
  image: "Пост",
};

export const PERIOD_DESCRIPTIONS: Record<PeriodDays, string> = {
  1: "за сутки",
  3: "за 3 дня",
  7: "за неделю",
};
