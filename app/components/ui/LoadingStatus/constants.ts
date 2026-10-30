export const LOADING_STAGE = {
  BREAKDOWN: "breakdown",
  POSTS: "posts",
} as const;

export const LOADING_COPY = {
  [LOADING_STAGE.BREAKDOWN]: "Подбираем поисковые слова для вашей ниши…",
  [LOADING_STAGE.POSTS]: "Подготавливаем список из снимка Apify…",
} as const;
