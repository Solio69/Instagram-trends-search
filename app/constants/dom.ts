export const BUTTON_TYPE = { BUTTON: "button", SUBMIT: "submit" } as const;
export const INPUT_TYPE = { TEXT: "text", CHECKBOX: "checkbox" } as const;
export const ARIA_HIDDEN_PROPS = { "aria-hidden": "true" } as const;
export const ARIA_LIVE_POLITE_PROPS = { "aria-live": "polite" } as const;
export const ROLE_PROPS = {
  NOTE: { role: "note" },
  REGION: { role: "region" },
  ALERT: { role: "alert" },
  STATUS: { role: "status" },
} as const;
