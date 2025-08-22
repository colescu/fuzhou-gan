export function getIsMobile(): boolean {
  return /Mobi|Android/i.test(navigator.userAgent);
}
