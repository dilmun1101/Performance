import type { Country, YearData } from '../../types';
import { DataTable } from '../data-table/data-table';
import { formatNumber } from '../../utils/format-utils';

import styles from './country-card.module.css';

type CountryCardProps = {
  country: Country;
  selectedYear: number;
  selectedColumns: string[];
  data?: YearData;
};

export const CountryCard = ({ country, selectedYear, selectedColumns, data }: CountryCardProps) => {
  const population = data?.population;
  const co2 = data?.co2;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{country.id}</h3>
        {country.iso_code && <span className={styles.isoCode}>{country.iso_code}</span>}
      </div>

      <div className={styles.stats}>
        <div>
          Population ({selectedYear}): {formatNumber(population)}
        </div>
        <div>
          CO₂ Emissions ({selectedYear}): {formatNumber(co2)} tonnes
        </div>
      </div>

      <DataTable data={data} year={selectedYear} columns={selectedColumns} />
    </div>
  );
};
