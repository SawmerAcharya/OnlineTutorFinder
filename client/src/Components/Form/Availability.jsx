
import { Clock } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function Availability({ availability = {}, onAvailabilityChange = () => {} }) {
  const [days, setDays] = useState({
    mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false,
  });

  const [dayTimeSlots, setDayTimeSlots] = useState({
    mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [],
  });

  const availableTimeSlots = ["02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"];

  // Sync dayTimeSlots with the parent component on every change
  useEffect(() => {
    onAvailabilityChange(dayTimeSlots);
  }, [dayTimeSlots, onAvailabilityChange]);

  // Toggle day availability
  const toggleDay = (day) => {
    setDays((prev) => {
      const newDays = { ...prev, [day]: !prev[day] };

      // If unchecked, clear selected time slots for that day
      setDayTimeSlots((prevSlots) => ({
        ...prevSlots,
        [day]: newDays[day] ? prevSlots[day] : [], // Reset if unselected
      }));

      return newDays;
    });
  };

  // Handle time slot selection
  const handleTimeSlotChange = (day, timeSlot, checked) => {
    setDayTimeSlots((prev) => ({
      ...prev,
      [day]: checked ? [...prev[day], timeSlot] : prev[day].filter((t) => t !== timeSlot),
    }));
  };

  return (
    <div className="Main">
      <div className="relative">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Teaching Schedule</h3>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-100">
          
          {/* Available Days */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Available Days</h4>
            <div className="grid grid-cols-7 gap-4">
              {Object.keys(days).map((day) => (
                <div
                  key={day}
                  className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
                    days[day] ? "bg-white shadow-sm border border-blue-200" : "hover:bg-white/50"
                  }`}
                  onClick={() => toggleDay(day)}
                >
                  <span className="text-sm font-medium text-gray-700 capitalize mb-2">{day}</span>
                  <div
                    className={`w-4 h-4 rounded border ${
                      days[day] ? "bg-blue-600 border-blue-600" : "border-gray-300"
                    }`}
                  >
                    {days[day] && (
                      <svg
                        className="w-4 h-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Time Slots</h4>
            <div className="space-y-4">
              {Object.entries(days).map(([day, checked]) =>
                checked ? (
                  <div key={day} className="bg-white rounded-lg p-4 border border-gray-200">
                    <h5 className="text-sm font-medium text-gray-700 capitalize mb-3">{day}</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {availableTimeSlots.map((slot) => (
                        <label
                          key={`${day}-${slot}`}
                          className={`relative flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-all ${
                            dayTimeSlots[day].includes(slot)
                              ? "bg-blue-50 border border-blue-200"
                              : "border border-gray-200"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={dayTimeSlots[day]?.includes(slot)}
                            onChange={(e) =>
                              handleTimeSlotChange(day, slot, e.target.checked)
                            }
                            className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            {slot}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
