import { default as countries } from '../config/countries.json';

export const bgColor = [
  '#eee',
  '#ffedea',
  '#ffcec5',
  '#ffad9f',
  '#ff8a75',
  '#ff5533',
  '#e2492d',
  '#be3d26',
  '#9a311f',
  '#782618',
];

export const fgColor = ['#333', '#333', '#333', '#333', '#333', '#eee', '#eee', '#eee', '#eee', '#eee', '#eee'];

export type ColorType = 'bgColor' | 'fgColor';

export const colorScale = (toll: number, countryCode?: string, colorType: ColorType = 'bgColor') => {
  const scaleFactor = countryCode ? Object.keys((countries as any)[countryCode].states).length : 1;
  const tollAfterScale = toll * scaleFactor;
  let scale: number = 0;

  if (tollAfterScale === 0) {
    scale = 0;
  } else if (tollAfterScale > 0 && tollAfterScale <= 10) {
    scale = 1;
  } else if (tollAfterScale > 10 && tollAfterScale <= 100) {
    scale = 2;
  } else if (tollAfterScale > 100 && tollAfterScale <= 1000) {
    scale = 3;
  } else if (tollAfterScale > 1000 && tollAfterScale <= 5000) {
    scale = 4;
  } else if (tollAfterScale > 5000 && tollAfterScale <= 10000) {
    scale = 5;
  } else if (tollAfterScale > 10000 && tollAfterScale <= 30000) {
    scale = 6;
  } else if (tollAfterScale > 30000 && tollAfterScale <= 50000) {
    scale = 7;
  } else if (tollAfterScale > 50000 && tollAfterScale <= 100000) {
    scale = 8;
  } else {
    scale = 9;
  }

  return colorType === 'bgColor' ? bgColor[scale] : fgColor[scale];
};
