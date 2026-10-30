import assert from "node:assert/strict";
import test from "node:test";
import {
  getVisiblePosts,
  limitNicheInput,
  normalizeResultLimit,
} from "../app/lib/results.ts";
import {
  DEFAULT_RESULTS_OPTIONS,
  POSTS as posts,
  REFERENCE_TIME as referenceTime,
} from "./fixtures/results.mjs";

test("по умолчанию фильтрует три дня и сортирует лайки по убыванию", () => {
  const visible = getVisiblePosts(
    posts,
    DEFAULT_RESULTS_OPTIONS,
    referenceTime,
  );
  assert.deepEqual(
    visible.map((post) => post.id),
    ["B", "C", "A"],
  );
});

test("смена метрики меняет порядок без мутации исходного массива", () => {
  const byComments = getVisiblePosts(
    posts,
    { ...DEFAULT_RESULTS_OPTIONS, sortBy: "commentCount" },
    referenceTime,
  );
  const byShares = getVisiblePosts(
    posts,
    { ...DEFAULT_RESULTS_OPTIONS, sortBy: "shareCount" },
    referenceTime,
  );
  assert.deepEqual(
    byComments.map((post) => post.id),
    ["C", "A", "B"],
  );
  assert.deepEqual(
    byShares.map((post) => post.id),
    ["B", "A", "C"],
  );
  assert.deepEqual(
    posts.map((post) => post.id),
    ["A", "B", "C", "D"],
  );
});

test("период и лимит ограничивают итоговый список", () => {
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...DEFAULT_RESULTS_OPTIONS, periodDays: 1 },
      referenceTime,
    ).map((post) => post.id),
    ["A"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      {
        ...DEFAULT_RESULTS_OPTIONS,
        periodDays: 7,
        limit: 1,
        sortBy: "commentCount",
      },
      referenceTime,
    ).map((post) => post.id),
    ["D"],
  );
});

test("дата сортирует новые публикации первыми", () => {
  const visible = getVisiblePosts(
    posts,
    { ...DEFAULT_RESULTS_OPTIONS, periodDays: 7, sortBy: "publishedAt" },
    referenceTime,
  );
  assert.deepEqual(
    visible.map((post) => post.id),
    ["A", "B", "C", "D"],
  );
});

test("пустой выбор показывает всё, несколько слов объединяются по ИЛИ до лимита", () => {
  const options = DEFAULT_RESULTS_OPTIONS;
  assert.deepEqual(
    getVisiblePosts(posts, { ...options, keywords: [] }, referenceTime).map(
      (post) => post.id,
    ),
    ["B", "C", "A"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, keywords: ["fitness"] },
      referenceTime,
    ).map((post) => post.id),
    ["C", "A"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, keywords: ["фитнес"] },
      referenceTime,
    ).map((post) => post.id),
    ["B"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, keywords: ["fitness", "фитнес"], limit: 2 },
      referenceTime,
    ).map((post) => post.id),
    ["B", "C"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, keywords: ["nutrition", "fitness"], limit: 1 },
      referenceTime,
    ).map((post) => post.id),
    ["C"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, keywords: ["nutrition"] },
      referenceTime,
    ),
    [],
  );
});

test("формат отделяет Reels от изображений и каруселей до ограничения списка", () => {
  const options = { ...DEFAULT_RESULTS_OPTIONS, limit: 1 };
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, contentFilter: "all" },
      referenceTime,
    ).map((post) => post.id),
    ["B"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, contentFilter: "reel" },
      referenceTime,
    ).map((post) => post.id),
    ["A"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, contentFilter: "post" },
      referenceTime,
    ).map((post) => post.id),
    ["B"],
  );
  assert.deepEqual(
    getVisiblePosts(
      posts,
      { ...options, contentFilter: "post", limit: 50 },
      referenceTime,
    ).map((post) => post.id),
    ["B", "C"],
  );
});

test("лимит приводится к диапазону 1–50", () => {
  assert.equal(normalizeResultLimit(0), 1);
  assert.equal(normalizeResultLimit(500), 50);
  assert.equal(normalizeResultLimit(12), 12);
});

test("описание ниши ограничено 150 символами даже при вставке", () => {
  assert.equal(limitNicheInput("а".repeat(151)).length, 150);
  assert.equal(limitNicheInput("фитнес"), "фитнес");
});
