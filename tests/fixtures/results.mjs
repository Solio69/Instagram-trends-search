export const POSTS = [
  {
    id: "A",
    publishedAt: "2026-10-29T08:00:00Z",
    contentType: "reel",
    matchedTerms: ["fitness"],
    likeCount: 10,
    commentCount: 2,
    shareCount: 3,
  },
  {
    id: "B",
    publishedAt: "2026-10-28T08:00:00Z",
    contentType: "image",
    matchedTerms: ["фитнес"],
    likeCount: 20,
    commentCount: 1,
    shareCount: 5,
  },
  {
    id: "C",
    publishedAt: "2026-10-27T09:00:00Z",
    contentType: "carousel",
    matchedTerms: ["fitness"],
    likeCount: 20,
    commentCount: 3,
    shareCount: 1,
  },
  {
    id: "D",
    publishedAt: "2026-10-26T08:00:00Z",
    contentType: "reel",
    matchedTerms: ["фитнес"],
    likeCount: 0,
    commentCount: 5,
    shareCount: 0,
  },
];

export const REFERENCE_TIME = "2026-10-29T09:00:00Z";
export const DEFAULT_RESULTS_OPTIONS = {
  periodDays: 3,
  limit: 50,
  sortBy: "likeCount",
};
