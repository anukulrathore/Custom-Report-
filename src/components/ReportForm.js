import React, { useState, useEffect, useRef } from "react";

const metricsList = [
  { name: "Master-O ID", filters: ["Count", "Distinct Count"] },
  { name: "Content launch date", filters: ["Date range", "Specific date"] },
  { name: "Completion Status", filters: ["Status Count", "Status Percentage"] },
  { name: "Completed In Days", filters: ["Less than", "Greater than"] },
  { name: "Attempts", filters: ["Status"] },
  { name: "Score", filters: ["Average", "Percentage"] },
  { name: "Max Score", filters: [] },
  { name: "Time Spent", filters: ["Average"] },
  { name: "Microskill Name", filters: ["Distinct Count", "Distinct Value"] },
  { name: "Login Status", filters: ["Count"] },
  { name: "Last Login Date", filters: ["Date range", "Specific date"] },
];

const ReportForm = () => {
  const [selectedMetrics, setSelectedMetrics] = useState({});
  const [csvData, setCsvData] = useState("");
  const downloadLinkRef = useRef(null);

  const changeMetric = (metric) => {
    setSelectedMetrics((prev) => {
      const updated = { ...prev };
      if (prev[metric.name]) {
        delete updated[metric.name];
      } else {
        updated[metric.name] = metric.filters.reduce(
          (acc, filter) => ({ ...acc, [filter]: "N/A" }),
          {}
        );
      }
      return updated;
    });
  };

  const updateFilter = (metricName, filter, value) => {
    setSelectedMetrics((prev) => ({
      ...prev,
      [metricName]: { ...prev[metricName], [filter]: value || "N/A" },
    }));
  };

  const generateCSV = () => {
    const headings = Object.keys(selectedMetrics).join(",");
    const rows = Array(5)
      .fill(null)
      .map(() =>
        Object.keys(selectedMetrics)
          .map((metric) =>
            Object.values(selectedMetrics[metric]).join(",")
          )
          .join(",")
      );

    setCsvData([headings, ...rows].join("\n"));
  };

  useEffect(() => {
    generateCSV();
  }, [selectedMetrics]);

  const downloadCSV = () => {
    if (!csvData) {
      return;
    }
    try {
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      if (downloadLinkRef.current) {
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = "report.csv";
        downloadLinkRef.current.click();
      }
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Custom Report Generator</h2>
      {metricsList.map((metric) => (
        <div key={metric.name}>
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={() => changeMetric(metric)}
              checked={selectedMetrics[metric.name] !== undefined}
              className="border-gray-300"
            />
            <span className="font-medium">{metric.name}</span>
          </label>
          {selectedMetrics[metric.name] &&
            metric.filters.map((filter) => (
              <div key={filter}>
                <label>
                  {filter}:
                  <input
                    id={`${metric.name}+${filter}`}
                    type="text"
                    onChange={(e) =>
                      updateFilter(metric.name, filter, e.target.value)
                    }
                    className="p-2 m-2 border-2 border-blue-500"
                  />
                </label>
              </div>
            ))}
        </div>
      ))}

      <button
        onClick={downloadCSV}
        disabled={Object.keys(selectedMetrics).length === 0}
        className="m-4 p-4 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Download CSV
      </button>
      <a ref={downloadLinkRef} style={{ display: "none" }}>
      </a>
    </div>
  );
};

export default ReportForm;
