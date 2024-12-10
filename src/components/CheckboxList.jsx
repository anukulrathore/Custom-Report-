import React from 'react';

function CheckboxList({ dataPoints, selectedFields, onChange }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Select Data Points</h2>
      {dataPoints.map((point) => (
        <div key={point.key} className="flex items-center">
          <input
            type="checkbox"
            checked={selectedFields.includes(point.key)}
            onChange={() => onChange(point.key)}
            id={point.key}
          />
          <label htmlFor={point.key}>{point.label}</label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxList;
