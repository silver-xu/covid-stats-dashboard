import { default as countries } from '../config/countries.json';

export const colorScale = (toll: number, countryCode?: string) => {
  const scaleFactor = countryCode ? Object.keys((countries as any)[countryCode].states).length : 1;
  const tollAfterScale = toll * scaleFactor;

  if (tollAfterScale === 0) {
    return '#eee';
  } else if (tollAfterScale > 0 && tollAfterScale <= 10) {
    return '#ffedea';
  } else if (tollAfterScale > 10 && tollAfterScale <= 100) {
    return '#ffcec5';
  } else if (tollAfterScale > 100 && tollAfterScale <= 1000) {
    return '#ffad9f';
  } else if (tollAfterScale > 1000 && tollAfterScale <= 5000) {
    return '#ff8a75';
  } else if (tollAfterScale > 5000 && tollAfterScale <= 10000) {
    return '#ff5533';
  } else if (tollAfterScale > 10000 && tollAfterScale <= 30000) {
    return '#e2492d';
  } else if (tollAfterScale > 30000 && tollAfterScale <= 50000) {
    return '#be3d26';
  } else if (tollAfterScale > 50000 && tollAfterScale <= 100000) {
    return '#9a311f';
  } else if (tollAfterScale > 100000) {
    return '#782618';
  }
};
