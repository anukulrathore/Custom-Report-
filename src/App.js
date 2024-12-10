import React, { useState } from 'react';
import { generateCSV } from './utils/csvGenerator';
import CheckboxList from './components/CheckboxList';
import FilterInputs from './components/FilterInputs';
import dummyData from './utils/data';

const dataPoints = [
  { key: 'masterOId', label: 'Master-O ID', filters: ['Count', 'Distinct Count', 'Distinct Value'] },
  { key: 'contentLaunchDate', label: 'Content Launch Date', filters: ['Date Range', 'Specific Date'] },
  { key: 'completionStatus', label: 'Completion Status', filters: ['Status Count', 'Status Percentage', 'Range'] },
  { key: 'completedInDays', label: 'Completed In Days', filters: ['Count', 'Less than', 'Greater than'] },
  { key: 'challenges', label: 'Challenges', filters: ['Status'] },
  { key: 'completionDate', label: 'Completion Date', filters: ['Date Range', 'Specific Date'] },
  { key: 'attempts', label: 'Attempts', filters: ['Status'] },
  { key: 'score', label: 'Score', filters: ['Count', 'Average', 'Percentage'] },
  { key: 'maxScore', label: 'Max Score', filters: ['Count'] },
  { key: 'timeSpent', label: 'Time Spent', filters: ['Time Value', 'Average'] },
  { key: 'microskillName', label: 'Microskill Name', filters: ['Count', 'Distinct Count', 'Distinct Value'] },
  { key: 'loginStatus', label: 'Login Status', filters: ['Status', 'Count'] },
  { key: 'lastLoginDate', label: 'Last Login Date', filters: ['Date Range', 'Specific Date'] },
];

function App() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [filters, setFilters] = useState({});

  const handleCheckboxChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleFilterChange = (field, filter) => {
    setFilters((prev) => ({ ...prev, [field]: filter }));
  };

  const handleGenerateCSV = () => {
    const filteredData = dummyData.filter((item) => {
      return selectedFields.every((field) => {
        if (filters[field]) {
          return item[field];
        }
        return true;
      });
    });

    generateCSV(filteredData, selectedFields);
  };

  return (
    <div className='m-2'>
      <h1 className="text-2xl font-bold">Report Generator</h1>
      <div className="p-2 grid grid-cols-1 md:grid-cols-2">
        <CheckboxList
          dataPoints={dataPoints}
          selectedFields={selectedFields}
          onChange={handleCheckboxChange}
        />
        <FilterInputs
          selectedFields={selectedFields}
          dataPoints={dataPoints}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2"
        onClick={handleGenerateCSV}
      >
        Generate CSV
      </button>
    </div>
  );
}

export default App;
