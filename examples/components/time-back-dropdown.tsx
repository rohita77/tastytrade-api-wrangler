

import React, { useState } from 'react';


interface Option {
  label: string;
  value: string;
}

interface TimeBackDropdownProps {
  options: Option[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimeBackDropdown: React.FC<TimeBackDropdownProps> = ({ options, onChange }) => {
  return (
    <select onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
// Default export
export default TimeBackDropdown;


