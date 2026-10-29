export type DemoStage = "idle" | "loading-breakdown" | "loading-posts" | "complete";

export type DemoView = {
  breakdown: boolean;
  results: boolean;
  loader: null | "breakdown" | "posts";
};

export function canStartDemo(value: string): boolean {
  return value.trim().length > 0;
}

export function advanceDemoStage(stage: DemoStage): DemoStage {
  if (stage === "loading-breakdown") return "loading-posts";
  if (stage === "loading-posts") return "complete";
  return stage;
}

export function getDemoView(stage: DemoStage): DemoView {
  return {
    breakdown: stage === "loading-posts" || stage === "complete",
    results: stage === "complete",
    loader: stage === "loading-breakdown" ? "breakdown" : stage === "loading-posts" ? "posts" : null,
  };
}
