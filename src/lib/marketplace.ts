export function getImageIdFromUrl(url: string): string {
  const match = url.match(/\/d\/(.+?)\/view/);
  return match ? match[1] : '';
}

export function formatGoogleDriveUrl(url: string): string {
  const fileId = getImageIdFromUrl(url);
  return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
}