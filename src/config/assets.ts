const BASE = import.meta.env.BASE_URL;

export function publicAsset(path: string): string {
  return `${BASE}${path.replace(/^\/+/, '')}`;
}

export const ASSETS = {
  favicon: `${BASE}favicon.svg`,

  cv: {
    pdf: publicAsset('cv.pdf'),
    page1: publicAsset('images/cv/cv-1.webp'),
    page2: publicAsset('images/cv/cv-2.webp'),
  },
} as const;
