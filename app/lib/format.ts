export const numberFormat = new Intl.NumberFormat("ru-RU");

export function formatDate(value: string): string {
  return `${value.slice(8, 10)}.${value.slice(5, 7)}.${value.slice(0, 4)} · ${value.slice(11, 16)} UTC`;
}
