import assert from "node:assert/strict";
import test from "node:test";
import {
  NicheNormalizationError,
  normalizeNiche,
  parseModelResponse,
  validateNicheInput,
} from "../app/lib/niche-normalization.ts";
import { HEALTHY_NICHE, HEALTHY_NORMALIZATION as healthy, TEST_API_KEY, modelResponse } from "./fixtures/niche-normalization.mjs";

test("принимает описание до 150 символов и отклоняет пустое или длинное", () => {
  assert.equal(validateNicheInput("  healthy  "), "healthy");
  assert.throws(() => validateNicheInput("  "), (error) => error instanceof NicheNormalizationError && error.code === "INVALID_INPUT");
  assert.throws(() => validateNicheInput("а".repeat(151)), (error) => error instanceof NicheNormalizationError && error.code === "INVALID_INPUT");
});

test("проверяет группы слов и убирает дубли без генерации описаний", () => {
  const result = parseModelResponse(JSON.stringify({
    intent: "  Фитнес  ",
    topics: [{ name: " Тренировки ", terms: ["фитнес", " FITNESS ", "fitness"] }],
  }));
  assert.deepEqual(result, { intent: "Фитнес", topics: [{ name: "Тренировки", terms: ["фитнес", "FITNESS"] }] });
  assert.throws(() => parseModelResponse(JSON.stringify({ ...healthy, topics: [] })), (error) => error instanceof NicheNormalizationError && error.code === "INVALID_OUTPUT");
  assert.throws(() => parseModelResponse(JSON.stringify({ ...healthy, description: "придуманное описание" })), (error) => error instanceof NicheNormalizationError && error.code === "INVALID_OUTPUT");
});

test("отправляет нишу бесплатной модели и возвращает проверенный результат", async () => {
  let calls = 0;
  const fetcher = async (url, init) => {
    calls++;
    assert.equal(url, "https://openrouter.ai/api/v1/chat/completions");
    assert.equal(init.headers.Authorization, `Bearer ${TEST_API_KEY}`);
    const body = JSON.parse(init.body);
    assert.match(body.model, /:free$/);
    assert.equal(body.response_format.type, "json_schema");
    assert.equal(body.provider.require_parameters, true);
    assert.deepEqual(body.reasoning, { effort: "none" });
    assert.match(body.messages[0].content, /широк/i);
    assert.match(body.messages[0].content, /узк/i);
    assert.equal(body.messages[1].content, HEALTHY_NICHE);
    assert.ok(!init.body.includes(TEST_API_KEY));
    return modelResponse(JSON.stringify(healthy));
  };

  const result = await normalizeNiche(HEALTHY_NICHE, { apiKey: TEST_API_KEY, fetcher });
  assert.deepEqual(result, healthy);
  assert.equal(calls, 1);
});

test("без ключа не делает внешний запрос", async () => {
  await assert.rejects(
    normalizeNiche(HEALTHY_NICHE, { apiKey: undefined, fetcher: () => { throw new Error("не вызывать"); } }),
    (error) => error instanceof NicheNormalizationError && error.code === "NOT_CONFIGURED",
  );
});

test("ошибки провайдера и некорректный ответ не раскрывают сырой текст", async () => {
  await assert.rejects(
    normalizeNiche(HEALTHY_NICHE, { apiKey: TEST_API_KEY, fetcher: async () => new Response(`${TEST_API_KEY} provider error`, { status: 429 }) }),
    (error) => error instanceof NicheNormalizationError && error.code === "RATE_LIMIT" && !error.message.includes(TEST_API_KEY),
  );
  await assert.rejects(
    normalizeNiche(HEALTHY_NICHE, { apiKey: TEST_API_KEY, fetcher: async () => modelResponse("not json") }),
    (error) => error instanceof NicheNormalizationError && error.code === "INVALID_OUTPUT",
  );
});
