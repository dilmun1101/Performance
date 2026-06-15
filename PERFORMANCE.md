# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: N/A
- **Render duration**: 214.1ms
- **Screenshot**: ![commit information](./public/scrin/sorting_countries.png)

### Interaction B: Search countries

- **Commit duration**: N/A
- **Render duration**: 99.8ms
- **Screenshot**: ![commit information](./public/scrin/searching_country.png)

### Interaction C: Change year

- **Commit duration**: N/A
- **Render duration**: 227.3ms
- **Screenshot**: ![commit information](./public/scrin/different_year.png)

### Interaction D: Toggle column

- **Commit duration**: N/A
- **Render duration**: 220.8ms
- **Screenshot**: ![commit information](./public/scrin/toggling_columns.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: N/A
- **Render duration**: 14.3ms
- **Screenshot**: ![commit information](./public/scrin/sorting_countries1.png)

### Interaction B: Search countries

- **Commit duration**: N/A
- **Render duration**: 14.9ms
- **Screenshot**: ![commit information](./public/scrin/searching_country1.png)

### Interaction C: Change year

- **Commit duration**: N/A
- **Render duration**: 12.9ms
- **Screenshot**: ![commit information](./public/scrin/different_year1.png)

### Interaction D: Toggle column

- **Commit duration**: N/A
- **Render duration**: 16ms
- **Screenshot**: ![commit information](./public/scrin/toggling_columns1.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 214.1         | 14.3           | 93.3%       |
| Search countries | 99.8          | 14.9           | 85.1%       |
| Change year      | 227.3         | 12.9           | 94.3%       |
| Toggle column    | 220.8         | 16.0           | 92.8%       |
| **Average**      | **190.5**     | **14.5**       | **91.4%**   |
