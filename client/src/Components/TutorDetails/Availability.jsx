// import React from 'react';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const Availability = () => {
  return (
    <div className="flex flex-col items-center p-4">

      <h1></h1>
      <div className="max-w-full overflow-x-auto shadow-md">
        <table className="min-w-max w-full text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Day</th>
              {times.map((time, index) => (
                <th key={index} className="py-3 px-6 text-left">{time}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs">
            {days.map((day, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{day}</td>
                {times.map((time, idx) => (
                  <td key={idx} className="py-3 px-6 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"/>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Availability;
