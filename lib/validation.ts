export function cleanText(value: unknown, max = 2000): string { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
export function isValidObjectId(value: string): boolean { return /^[a-f\d]{24}$/i.test(value); }
