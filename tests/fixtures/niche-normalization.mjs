export const HEALTHY_NICHE = "healthy";
export const TEST_API_KEY = "private-test-key";

export const HEALTHY_NORMALIZATION = {
  intent: "Здоровый образ жизни",
  topics: [
    { name: "Фитнес", terms: ["фитнес", "fitness", "workout"] },
    { name: "Питание", terms: ["правильное питание", "healthy eating"] },
    { name: "ЗОЖ", terms: ["зож", "wellness"] },
  ],
};

export function modelResponse(content) {
  return Response.json({ choices: [{ message: { content } }] });
}
