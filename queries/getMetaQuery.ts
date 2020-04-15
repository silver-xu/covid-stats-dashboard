import gql from 'graphql-tag';

export const getMetaQuery = (countryCode: string, stateCode?: string) => {
  const fields = `        
    totalConfirmedCases
    currentConfirmedCases
    newlyConfirmedCases
    netNewlyConfirmedCases
    totalDeaths
    newDeaths
    totalRecoveredCases
    newlyRecoveredCases
    lastUpdatedDate
  `;

  if (countryCode === 'Global') {
    return gql`query global {
      global {
        ${fields}
      }
    }
  `;
  } else if (!stateCode) {
    return gql`query global {
      global {
        ${countryCode} {
          ${fields}
        }
      }
    }
  `;
  } else {
    return gql`query global {
      global {
        ${countryCode} {
          ${stateCode} {
            ${fields}
          }
        }
      }
    }  
`;
  }
};
