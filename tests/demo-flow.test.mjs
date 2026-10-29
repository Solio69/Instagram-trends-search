import assert from "node:assert/strict";
import test from "node:test";
import { advanceDemoStage, canStartDemo, getDemoView } from "../app/lib/demo-flow.ts";

test("демо запускается только для непустого описания", () => {
  assert.equal(canStartDemo("  \n"), false);
  assert.equal(canStartDemo("фитнес"), true);
});

test("этапы загрузки идут в нужном порядке", () => {
  assert.equal(advanceDemoStage("loading-breakdown"), "loading-posts");
  assert.equal(advanceDemoStage("loading-posts"), "complete");
  assert.equal(advanceDemoStage("complete"), "complete");
});

test("разбор и список появляются только на своих этапах", () => {
  assert.deepEqual(getDemoView("idle"), { breakdown: false, results: false, loader: null });
  assert.deepEqual(getDemoView("loading-breakdown"), { breakdown: false, results: false, loader: "breakdown" });
  assert.deepEqual(getDemoView("loading-posts"), { breakdown: true, results: false, loader: "posts" });
  assert.deepEqual(getDemoView("complete"), { breakdown: true, results: true, loader: null });
});
