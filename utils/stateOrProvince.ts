export const stateOrProvince = (countryCode: string): string =>
  ['China', 'Canada'].includes(countryCode) ? 'Province' : 'State';
