import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, AutoComplete } from 'antd';
import { useHistory } from 'react-router';

import { search } from '../services/searchServices';
import { getCountryByStateCode, isCountry } from '../services/countryServices';
import './Search.css';

const renderTitle = (title: string, noResult: boolean = false) => (
  <span>
    {title}
    {noResult && <span style={{ float: 'right' }}>no result</span>}
  </span>
);

const renderItem = (code: string, name: string) => ({
  value: code,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {name}
    </div>
  ),
});

export const Search = () => {
  const [options, setOptions] = useState<any>([]);
  const history = useHistory();

  const handleSearch = (keyword: string) => {
    const searchResult = search(keyword);
    const { countriesResults, statesResults } = searchResult;
    const results = [
      {
        label: renderTitle('Countries', countriesResults.length === 0),
        options: countriesResults.map((country) => renderItem(country.code, country.name)),
      },
      {
        label: renderTitle('States', statesResults.length === 0),
        options: statesResults.map((state) => renderItem(state.code, state.name)),
      },
    ];

    setOptions(results);
  };

  const handleSelect = (code: string) => {
    if (isCountry(code)) {
      history.push(`/${code}`);
    } else {
      const country = getCountryByStateCode(code);
      history.push(`/${country.code}/${code}`);
    }
  };

  return (
    <AutoComplete
      dropdownMatchSelectWidth={500}
      dropdownClassName="certain-category-search-dropdown"
      style={{
        width: '100%',
        boxSizing: 'border-box',
      }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      options={options}
    >
      <Input.Search size="large" placeholder="Search country or region" />
    </AutoComplete>
  );
};
