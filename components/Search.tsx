import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { useRouter } from 'next/router';

import { search } from '../services/searchServices';
import { getCountryByStateCode, isCountry } from '../services/countryServices';
import './Search.module.css';

const renderTitle = (title: string, noResult = false) => (
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
  const router = useRouter();

  const handleSearch = (keyword: string) => {
    const searchResult = search(keyword);
    const { countriesResults, statesResults } = searchResult;
    const results = [
      {
        label: renderTitle('Countries', countriesResults.length === 0),
        options: countriesResults.map((country) => renderItem(country.code, country.name)),
      },
      {
        label: renderTitle('States or Provinces', statesResults.length === 0),
        options: statesResults.map((state) => renderItem(state.code, state.name)),
      },
    ];

    setOptions(results);
  };

  const handleSelect = (code: string) => {
    if (isCountry(code)) {
      router.push(`/Dashboard/${code}`);
    } else {
      const country = getCountryByStateCode(code);
      router.push(`/Dashboard/${country.code}/${code}`);
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
