import React, { useState, useEffect } from 'react';
import '../style.scss';

const podsTable = (props) => {
  let count = 1;
  const { podsData } = props;

  const [table, setTable] = useState(podsData);
  const [activeButton, setActiveButton] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({
    field: null,
    ascending: true,
  });

  useEffect(() => {
    sortData(podsData, sortCriteria.field, sortCriteria.ascending);
  }, [podsData]);

  const handleButtonClick = (field) => {
    const isAscending =
      sortCriteria.field === field ? !sortCriteria.ascending : true;
    setSortCriteria({ field, ascending: isAscending });
    sortData(table, field, isAscending);
  };

  const sortData = (data, field, ascending) => {
    if (!field) return;

    const sortedData = [...data].sort((a, b) => {
      if (ascending) {
        return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      } else {
        return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
      }
    });
    setTable(sortedData);
    setActiveButton(field);
  };

  return (
    <div className="flex w-screen justify-center">
      <table className="mt-5 border-separate border-spacing-2 overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-900 text-nemo-blue-200">
        <thead>
          <tr>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              #
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 'POD_NAME'
                  ? 'text-nemo-orange-700'
                  : 'text-nemo-blue-200'
              }`}
            >
              <div className="flex items-center">
                Pod Name
                <button
                  onClick={() => {
                    handleButtonClick('POD_NAME');
                    //tableSort("POD_NAME");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 'NODE_NAME'
                  ? 'text-nemo-orange-700'
                  : 'text-nemo-blue-200'
              }`}
            >
              <div className="flex items-center">
                Node Name
                <button
                  onClick={() => {
                    handleButtonClick('NODE_NAME');
                    //tableSort("NODE_NAME");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th className="overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2">
              Pod ID
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 'CONTAINER_COUNT'
                  ? 'text-nemo-orange-700'
                  : 'text-nemo-blue-200'
              }`}
            >
              <div className="flex items-center">
                Container(s)
                <button
                  onClick={() => {
                    handleButtonClick('CONTAINER_COUNT');
                    //tableSort("CONTAINER_COUNT");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 'CPU_USAGE_CORES'
                  ? 'text-nemo-orange-700'
                  : 'text-nemo-blue-200'
              }`}
            >
              <div className="flex items-center">
                CPU Usage
                <button
                  onClick={() => {
                    handleButtonClick('CPU_USAGE_CORES');
                    //tableSort("CPU_USAGE_CORES");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 'CPU_PERCENTAGE'
                  ? 'text-nemo-orange-700'
                  : 'text-nemo-blue-200'
              }`}
            >
              <div className="flex items-center">
                CPU Usage %
                <button
                  onClick={() => {
                    handleButtonClick('CPU_PERCENTAGE');
                    //tableSort("CPU_USAGE_CORES");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 'MEMORY_USAGE_BYTES'
                  ? 'text-nemo-orange-700'
                  : 'text-nemo-blue-200'
              }`}
            >
              <div className="flex items-center">
                Memory Usage
                <button
                  onClick={() => {
                    handleButtonClick('MEMORY_USAGE_BYTES');
                    //tableSort("MEMORY_USAGE_BYTES");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
            <th
              className={`overflow-hidden rounded-xl border-2 border-nemo-blue-200 bg-nemo-blue-800 p-2 ${
                activeButton === 'MEMORY_PERCENTAGE'
                  ? 'text-nemo-orange-700'
                  : 'text-nemo-blue-200'
              }`}
            >
              <div className="flex items-center">
                Memory Usage %
                <button
                  onClick={() => {
                    handleButtonClick('MEMORY_PERCENTAGE');
                    //tableSort("MEMORY_USAGE_BYTES");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.map((pod) => (
            <tr key={pod.UID}>
              <td className="p-2">{count++}</td>
              <td className="p-2">{pod.POD_NAME}</td>
              <td className="p-2">{pod.NODE_NAME}</td>
              <td className="p-2">{pod.UID}</td>
              <td className="p-2">{pod.CONTAINER_COUNT}</td>
              <td className="p-2">
                {pod.CPU_USAGE_CORES.toFixed(3) + ' Core(s)'}
              </td>
              <td className="p-2">{pod.CPU_PERCENTAGE}%</td>
              <td className="p-2">
                {(pod.MEMORY_USAGE_BYTES / 1000000).toFixed(2) + 'MB'}
              </td>
              <td className="p-2">{pod.MEMORY_PERCENTAGE}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default podsTable;
