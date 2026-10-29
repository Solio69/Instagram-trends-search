import assert from "node:assert/strict";
import test from "node:test";
import { getVisiblePosts, limitNicheInput, normalizeResultLimit } from "../app/lib/results.ts";

const posts = [
  { id: "A", publishedAt: "2026-10-29T08:00:00Z", contentType: "reel", matchedTerms: ["fitness"], likeCount: 10, commentCount: 2, shareCount: 3 },
  { id: "B", publishedAt: "2026-10-28T08:00:00Z", contentType: "image", matchedTerms: ["фитнес"], likeCount: 20, commentCount: 1, shareCount: 5 },
  { id: "C", publishedAt: "2026-10-27T09:00:00Z", contentType: "carousel", matchedTerms: ["fitness"], likeCount: 20, commentCount: 3, shareCount: 1 },
  { id: "D", publishedAt: "2026-10-26T08:00:00Z", contentType: "reel", matchedTerms: ["фитнес"], likeCount: 0, commentCount: 5, shareCount: 0 },
];

const referenceTime = "2026-10-29T09:00:00Z";

test("по умолчанию фильтрует три дня и сортирует лайки по убыванию", () => {
  const visible = getVisiblePosts(posts, { periodDays: 3, limit: 50, sortBy: "likeCount" }, referenceTime);
  assert.deepEqual(visible.map((post) => post.id), ["B", "C", "A"]);
});

test("смена метрики меняет порядок без мутации исходного массива", () => {
  const byComments = getVisiblePosts(posts, { periodDays: 3, limit: 50, sortBy: "commentCount" }, referenceTime);
  const byShares = getVisiblePosts(posts, { periodDays: 3, limit: 50, sortBy: "shareCount" }, referenceTime);
  assert.deepEqual(byComments.map((post) => post.id), ["C", "A", "B"]);
  assert.deepEqual(byShares.map((post) => post.id), ["B", "A", "C"]);
  assert.deepEqual(posts.map((post) => post.id), ["A", "B", "C", "D"]);
});

test("период и лимит ограничивают итоговый список", () => {
  assert.deepEqual(
    getVisiblePosts(posts, { periodDays: 1, limit: 50, sortBy: "likeCount" }, referenceTime).map((post) => post.id),
    ["A"],
  );
  assert.deepEqual(
    getVisiblePosts(posts, { periodDays: 7, limit: 1, sortBy: "commentCount" }, referenceTime).map((post) => post.id),
    ["D"],
  );
});

test("дата сортирует новые публикации первыми", () => {
  const visible = getVisiblePosts(posts, { periodDays: 7, limit: 50, sortBy: "publishedAt" }, referenceTime);
  assert.deepEqual(visible.map((post) => post.id), ["A", "B", "C", "D"]);
});

test("пустой выбор показывает всё, несколько слов объединяются по ИЛИ до лимита", () => {
  const options = { periodDays: 3, limit: 50, sortBy: "likeCount" };
  assert.deepEqual(getVisiblePosts(posts, { ...options, keywords: [] }, referenceTime).map((post) => post.id), ["B", "C", "A"]);
  assert.deepEqual(getVisiblePosts(posts, { ...options, keywords: ["fitness"] }, referenceTime).map((post) => post.id), ["C", "A"]);
  assert.deepEqual(getVisiblePosts(posts, { ...options, keywords: ["фитнес"] }, referenceTime).map((post) => post.id), ["B"]);
  assert.deepEqual(getVisiblePosts(posts, { ...options, keywords: ["fitness", "фитнес"], limit: 2 }, referenceTime).map((post) => post.id), ["B", "C"]);
  assert.deepEqual(getVisiblePosts(posts, { ...options, keywords: ["nutrition", "fitness"], limit: 1 }, referenceTime).map((post) => post.id), ["C"]);
  assert.deepEqual(getVisiblePosts(posts, { ...options, keywords: ["nutrition"] }, referenceTime), []);
});

test("формат отделяет Reels от изображений и каруселей до ограничения списка", () => {
  const options = { periodDays: 3, limit: 1, sortBy: "likeCount" };
  assert.deepEqual(getVisiblePosts(posts, { ...options, contentFilter: "all" }, referenceTime).map((post) => post.id), ["B"]);
  assert.deepEqual(getVisiblePosts(posts, { ...options, contentFilter: "reel" }, referenceTime).map((post) => post.id), ["A"]);
  assert.deepEqual(getVisiblePosts(posts, { ...options, contentFilter: "post" }, referenceTime).map((post) => post.id), ["B"]);
  assert.deepEqual(getVisiblePosts(posts, { ...options, contentFilter: "post", limit: 50 }, referenceTime).map((post) => post.id), ["B", "C"]);
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
