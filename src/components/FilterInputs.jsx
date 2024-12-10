import React from 'react';

function FilterInputs({ selectedFields, dataPoints, filters, onFilterChange }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Apply Filters</h2>
      {selectedFields.map((field) => {
        const point = dataPoints.find((dp) => dp.key === field);
        return (
          <div key={field}>
            <h3 className="text-lg">{point.label}</h3>
            {point.filters.map((filter) => (
              <div key={filter} className="flex items-center">
                <input
                  type="text"
                  placeholder={filter}
                  value={filters[field]?.[filter] || ''}
                  onChange={(e) =>
                    onFilterChange(field, { ...filters[field], [filter]: e.target.value })
                  }
                  className='outline m-1'
                />
                <label>{filter}</label>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default FilterInputs;
