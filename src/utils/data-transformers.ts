import type { YearData, Country } from '../types';

export const createYearDataMap = (data: YearData[]): Map<number, YearData> => {
  const map = new Map<number, YearData>();

  data.forEach((d) => {
    map.set(d.year, d);
  });

  return map;
};

export const getPopulationForYear = (
  yearMap: Map<number, YearData>,
  year: number
): number | undefined => {
  return yearMap.get(year)?.population;
};

export const getCo2ForYear = (yearMap: Map<number, YearData>, year: number): number | undefined => {
  return yearMap.get(year)?.co2;
};

export const getAvailableYears = (countries: Country[]): number[] => {
  const years = new Set<number>();

  countries.forEach((country) => {
    country.data.forEach((yearData) => {
      years.add(yearData.year);
    });
  });

  return Array.from(years).sort((a, b) => a - b);
};
