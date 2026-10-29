import posts from "../../Mox/apify-fitness-posts.json";
import formalization from "../../Mox/formalization.json";

export const DEMO_POSTS = posts;
export const DEMO_FORMALIZATION = formalization;

export type DemoPost = (typeof posts)[number];
export type FormalizationTopic = (typeof formalization.topics)[number];

export const DEMO_SOURCE = {
  snapshotAt: "2026-10-29T09:12:10.434213Z",
  runUrl: "https://console.apify.com/actors/eQTLcwfumExPUhrs1/runs/TzNCuqXiF0I7Dwgf7#output",
  query: "(фитнес OR fitness)",
  name: "Apify, Instagram Boolean Search Scraper | Posts & Reels",
  filename: "instagram-fitness-snapshot.json",
} as const;
