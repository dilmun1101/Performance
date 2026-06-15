import type { Country, YearData } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { useMemo, memo } from 'react';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
};

type CountryProps = {
  country: Country;
  data: YearData | undefined;
  population: number;
};

export const CountryList = memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedYear,
    sortField,
    sortOrder,
  }: CountryListProps) => {
    const filteredCountries = useMemo((): CountryProps[] => {
      return countries
        .map((country): CountryProps => {
          const data = country.data.find((d) => d.year === selectedYear);
          return {
            country,
            data,
            population: data?.population ?? 0,
          };
        })
        .filter(({ country }) => {
          const matchesSearch = country.id.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesSearch;
        })
        .sort((a, b) => {
          if (sortField === 'name') {
            return sortOrder === 'asc'
              ? a.country.id.localeCompare(b.country.id)
              : b.country.id.localeCompare(a.country.id);
          }
          return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
        });
    }, [countries, searchQuery, sortField, sortOrder, selectedYear]);

    return (
      <div className={styles.countryList}>
        {filteredCountries.map(({ country, data }) => (
          <CountryCard
            key={country.id}
            country={country}
            selectedYear={selectedYear}
            selectedColumns={selectedColumns}
            data={data}
          />
        ))}
      </div>
    );
  }
);
