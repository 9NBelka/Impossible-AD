import { useState } from 'react';
import scss from './ClientsCustomSelect.module.scss';
import { BsChevronDown } from 'react-icons/bs';
import clsx from 'clsx';

export default function ClientsCustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  clientAddOrEdit,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={clsx(scss.customSelect, clientAddOrEdit && scss.customSelectAddOrEdit)}>
      <div className={scss.customSelectTrigger} onClick={() => setIsOpen(!isOpen)}>
        <span>{value || placeholder}</span>
        <BsChevronDown className={scss.customSelectArrow} />
      </div>
      {isOpen && (
        <div className={scss.customSelectOptions}>
          {options.map((option, index) => (
            <div
              key={`${option}-${index}`} // Use option and index to ensure uniqueness
              className={scss.customSelectOption}
              onClick={() => handleSelect(option)}>
              {option || placeholder} {/* Display placeholder for empty option */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
