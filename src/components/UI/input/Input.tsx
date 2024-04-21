import React from "react";

interface InputProps {
  placeholder?: string;
  icon?: JSX.Element;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder = "Search",
  icon,
  onChange,
}) => {
  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder={placeholder}
            onChange={onChange}
          />
          {icon}
        </label>
      </div>
    </div>
  );
};

export default Input;
