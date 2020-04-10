import { useLocation } from 'react-router';

export const usePath = (): { countryCode?: string; stateCode?: string } => {
  const location = useLocation();
  const [countryCode, stateCode] = location.pathname.split('/').filter((token: string) => token.length > 0);
  return { countryCode, stateCode };
};
