import { unparse } from 'papaparse';

export const generateCSV = (data, fields) => {
  const csv = unparse(data.map((item) => {
    const filteredItem = {};
    fields.forEach((field) => {
      filteredItem[field] = item[field];
    });
    return filteredItem;
  }));

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'report.csv';
  link.click();
};
