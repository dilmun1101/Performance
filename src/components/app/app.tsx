import { useCallback, useState } from 'react';
import { useCo2Data } from '../../hooks/useCo2Data';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { SearchBar } from '../search-bar/search-bar';
import { YearSelector } from '../year-selector/year-selector';
import { CountryList } from '../country-list/country-list';
import { ColumnModal } from '../column-modal/column-modal';
import { getAvailableYears, getAvailableColumns } from '../../utils/data-transformers';

import styles from './app.module.css';

export const App = () => {
  const { data, isLoading, error } = useCo2Data();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState(2020);
  const [sortField, setSortField] = useState<'name' | 'population'>('population');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedColumns, setSelectedColumns] = useState([
    'year',
    'population',
    'co2',
    'co2_per_capita',
  ]);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  const years = data ? getAvailableYears(data) : [];
  const availableColumns = getAvailableColumns();

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const handleSortFieldChange = useCallback((field: 'name' | 'population') => {
    setSortField(field);
  }, []);

  const handleSortOrderToggle = useCallback(() => {
    setSortOrder((value) => (value === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleColumnToggle = useCallback((column: string) => {
    setSelectedColumns((prev) => {
      if (prev.includes(column)) {
        return prev.filter((c) => c !== column);
      } else {
        return [...prev, column];
      }
    });
  }, []);

  const handleModalToggle = useCallback(() => {
    setIsColumnModalOpen((prev) => !prev);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  if (!data) {
    return <div className={styles.noDataMessage}>No data available</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CO₂ Emissions Data Explorer</h1>

      {/* Controls */}
      <div className={styles.controls}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <YearSelector year={selectedYear} years={years} onChange={handleYearChange} />

        <div className={styles.sortContainer}>
          <label className={styles.sortLabel}>Sort by:</label>
          <select
            value={sortField}
            onChange={(e) => handleSortFieldChange(e.target.value as 'name' | 'population')}
            className={styles.sortSelect}
          >
            <option value="population">Population</option>
            <option value="name">Name</option>
          </select>

          <button onClick={handleSortOrderToggle} className={styles.sortButton}>
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

        <div className={styles.columnButtonContainer}>
          <button onClick={handleModalToggle} className={styles.columnButton}>
            Select columns ({selectedColumns.length} selected)
          </button>
        </div>
      </div>

      {/* Country List */}
      <CountryList
        countries={data}
        searchQuery={searchQuery}
        selectedColumns={selectedColumns}
        selectedYear={selectedYear}
        sortField={sortField}
        sortOrder={sortOrder}
      />

      {/* Column Modal */}
      <ColumnModal
        isOpen={isColumnModalOpen}
        availableColumns={availableColumns}
        selectedColumns={selectedColumns}
        onToggle={handleColumnToggle}
        onClose={handleModalToggle}
      />
    </div>
  );
};
